import type { Category, Todo, TodoStore } from "../types/todo";
import { DEFAULT_CATEGORIES, SEED_TODOS } from "../types/todo";

const STORAGE_KEY = "taskflow-store";
const MIGRATION_KEY = "taskflow-migrated";

export class PersistenceError extends Error {
	constructor(
		message: string,
		public readonly code:
			| "QUOTA_EXCEEDED"
			| "PARSE_ERROR"
			| "STORAGE_UNAVAILABLE",
	) {
		super(message);
		this.name = "PersistenceError";
	}
}

function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getStorage(): Storage | null {
	if (typeof window === "undefined") return null;
	try {
		const testKey = "__storage_test__";
		window.localStorage.setItem(testKey, testKey);
		window.localStorage.removeItem(testKey);
		return window.localStorage;
	} catch {
		return null;
	}
}

function migrateLegacyData(storage: Storage): TodoStore | null {
	try {
		const legacyTodos = storage.getItem("taskflow-todos");
		const legacyCategories = storage.getItem("taskflow-categories");
		if (legacyTodos || legacyCategories) {
			const todos = legacyTodos ? JSON.parse(legacyTodos) : SEED_TODOS;
			const categories = legacyCategories
				? JSON.parse(legacyCategories)
				: DEFAULT_CATEGORIES;
			storage.removeItem("taskflow-todos");
			storage.removeItem("taskflow-categories");
			return { todos, categories };
		}
		return null;
	} catch {
		return null;
	}
}

export function loadStore(): TodoStore {
	const storage = getStorage();
	if (!storage) {
		return { todos: SEED_TODOS, categories: DEFAULT_CATEGORIES };
	}

	try {
		const migrated = storage.getItem(MIGRATION_KEY);
		if (!migrated) {
			const legacyData = migrateLegacyData(storage);
			if (legacyData) {
				saveStore(legacyData);
				storage.setItem(MIGRATION_KEY, "true");
				return legacyData;
			}
			storage.setItem(MIGRATION_KEY, "true");
		}

		const data = storage.getItem(STORAGE_KEY);
		if (!data) {
			return { todos: SEED_TODOS, categories: DEFAULT_CATEGORIES };
		}

		const parsed = JSON.parse(data) as TodoStore;
		if (!Array.isArray(parsed.todos) || !Array.isArray(parsed.categories)) {
			return { todos: SEED_TODOS, categories: DEFAULT_CATEGORIES };
		}

		return parsed;
	} catch (error) {
		console.error("Failed to load store:", error);
		return { todos: SEED_TODOS, categories: DEFAULT_CATEGORIES };
	}
}

export function saveStore(store: TodoStore): void {
	const storage = getStorage();
	if (!storage) {
		throw new PersistenceError("Storage unavailable", "STORAGE_UNAVAILABLE");
	}

	try {
		storage.setItem(STORAGE_KEY, JSON.stringify(store));
	} catch (error) {
		if (
			error instanceof DOMException &&
			error.code === DOMException.QUOTA_EXCEEDED_ERR
		) {
			throw new PersistenceError("Storage quota exceeded", "QUOTA_EXCEEDED");
		}
		throw new PersistenceError(
			"Failed to save to storage",
			"STORAGE_UNAVAILABLE",
		);
	}
}

export function createTodo(
	store: TodoStore,
	data: Omit<Todo, "id" | "createdAt" | "updatedAt">,
): Todo {
	const now = new Date().toISOString();
	const todo: Todo = {
		...data,
		id: generateId(),
		createdAt: now,
		updatedAt: now,
	};
	const newStore = { ...store, todos: [...store.todos, todo] };
	saveStore(newStore);
	return todo;
}

export function updateTodo(
	store: TodoStore,
	id: string,
	data: Partial<Omit<Todo, "id" | "createdAt">>,
): Todo | null {
	const index = store.todos.findIndex((t) => t.id === id);
	if (index === -1) return null;

	const updated = {
		...store.todos[index],
		...data,
		updatedAt: new Date().toISOString(),
	};

	const newTodos = [...store.todos];
	newTodos[index] = updated;

	saveStore({ ...store, todos: newTodos });
	return updated;
}

export function deleteTodo(store: TodoStore, id: string): boolean {
	const index = store.todos.findIndex((t) => t.id === id);
	if (index === -1) return false;

	const newTodos = store.todos.filter((t) => t.id !== id);
	saveStore({ ...store, todos: newTodos });
	return true;
}

export function toggleTodoCompletion(
	store: TodoStore,
	id: string,
): Todo | null {
	const todo = store.todos.find((t) => t.id === id);
	if (!todo) return null;

	return updateTodo(store, id, { completed: !todo.completed });
}

export function createCategory(
	store: TodoStore,
	data: Omit<Category, "id" | "createdAt">,
): Category {
	const now = new Date().toISOString();
	const category: Category = {
		...data,
		id: generateId(),
		createdAt: now,
	};
	const newStore = { ...store, categories: [...store.categories, category] };
	saveStore(newStore);
	return category;
}

export function updateCategory(
	store: TodoStore,
	id: string,
	data: Partial<Omit<Category, "id" | "createdAt">>,
): Category | null {
	const index = store.categories.findIndex((c) => c.id === id);
	if (index === -1) return null;

	const updated = { ...store.categories[index], ...data };

	const newCategories = [...store.categories];
	newCategories[index] = updated;

	saveStore({ ...store, categories: newCategories });
	return updated;
}

export function deleteCategory(store: TodoStore, id: string): boolean {
	const index = store.categories.findIndex((c) => c.id === id);
	if (index === -1) return false;

	const newCategories = store.categories.filter((c) => c.id !== id);
	const newTodos = store.todos.map((t) =>
		t.categoryId === id ? { ...t, categoryId: null } : t,
	);

	saveStore({ ...store, categories: newCategories, todos: newTodos });
	return true;
}

export function clearAllData(): void {
	const storage = getStorage();
	if (storage) {
		storage.removeItem(STORAGE_KEY);
	}
}
