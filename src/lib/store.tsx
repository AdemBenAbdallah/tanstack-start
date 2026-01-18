import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { Category, Todo, TodoStore } from "../types/todo";
import {
	createCategory,
	createTodo,
	deleteCategory,
	deleteTodo,
	loadStore,
	saveStore,
	toggleTodoCompletion,
	updateCategory,
	updateTodo,
} from "./persistence";

interface StoreContextType extends TodoStore {
	toggleTodoCompletion: (id: string) => void;
	addTodo: (data: Omit<Todo, "id" | "createdAt" | "updatedAt">) => Todo;
	updateTodo: (
		id: string,
		data: Partial<Omit<Todo, "id" | "createdAt">>,
	) => void;
	removeTodo: (id: string) => void;
	addCategory: (data: Omit<Category, "id" | "createdAt">) => Category;
	updateCategory: (
		id: string,
		data: Partial<Omit<Category, "id" | "createdAt">>,
	) => void;
	removeCategory: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function useStore() {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error("useStore must be used within a StoreProvider");
	}
	return context;
}

export function StoreProvider({ children }: { children: ReactNode }) {
	const [store, setStore] = useState<TodoStore>(() => loadStore());

	useEffect(() => {
		saveStore(store);
	}, [store]);

	const value: StoreContextType = {
		...store,
		toggleTodoCompletion: (id: string) => {
			const result = toggleTodoCompletion(store, id);
			if (result) {
				setStore((prev) => ({
					...prev,
					todos: prev.todos.map((t) => (t.id === id ? result : t)),
				}));
			}
		},
		addTodo: (data) => {
			const todo = createTodo(store, data);
			setStore((prev) => ({ ...prev, todos: [...prev.todos, todo] }));
			return todo;
		},
		updateTodo: (id: string, data) => {
			const result = updateTodo(store, id, data);
			if (result) {
				setStore((prev) => ({
					...prev,
					todos: prev.todos.map((t) => (t.id === id ? result : t)),
				}));
			}
		},
		removeTodo: (id: string) => {
			deleteTodo(store, id);
			setStore((prev) => ({
				...prev,
				todos: prev.todos.filter((t) => t.id !== id),
			}));
		},
		addCategory: (data) => {
			const category = createCategory(store, data);
			setStore((prev) => ({
				...prev,
				categories: [...prev.categories, category],
			}));
			return category;
		},
		updateCategory: (id: string, data) => {
			const result = updateCategory(store, id, data);
			if (result) {
				setStore((prev) => ({
					...prev,
					categories: prev.categories.map((c) => (c.id === id ? result : c)),
				}));
			}
		},
		removeCategory: (id: string) => {
			deleteCategory(store, id);
			setStore((prev) => ({
				...prev,
				categories: prev.categories.filter((c) => c.id !== id),
				todos: prev.todos.map((t) =>
					t.categoryId === id ? { ...t, categoryId: null } : t,
				),
			}));
		},
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}
