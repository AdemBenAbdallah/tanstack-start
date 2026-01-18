export type Priority = "low" | "medium" | "high";

export interface Todo {
	id: string;
	title: string;
	description: string;
	priority: Priority;
	categoryId: string | null;
	dueDate: string | null;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: string;
	name: string;
	color: string;
	createdAt: string;
}

export interface TodoStore {
	todos: Todo[];
	categories: Category[];
}

export const PRIORITY_COLORS: Record<Priority, string> = {
	low: "oklch(0.6 0.15 150)",
	medium: "oklch(0.7 0.15 45)",
	high: "oklch(0.65 0.15 25)",
};

export const DEFAULT_CATEGORIES: Category[] = [
	{
		id: "work",
		name: "Work",
		color: "oklch(0.6 0.15 200)",
		createdAt: new Date().toISOString(),
	},
	{
		id: "personal",
		name: "Personal",
		color: "oklch(0.65 0.15 320)",
		createdAt: new Date().toISOString(),
	},
	{
		id: "shopping",
		name: "Shopping",
		color: "oklch(0.55 0.15 120)",
		createdAt: new Date().toISOString(),
	},
	{
		id: "health",
		name: "Health",
		color: "oklch(0.6 0.15 140)",
		createdAt: new Date().toISOString(),
	},
	{
		id: "projects",
		name: "Projects",
		color: "oklch(0.7 0.15 60)",
		createdAt: new Date().toISOString(),
	},
];

export const SEED_TODOS: Todo[] = [
	{
		id: "todo-1",
		title: "Welcome to TaskFlow!",
		description: "This is your first task. Feel free to edit or delete it.",
		priority: "medium",
		categoryId: null,
		dueDate: new Date(Date.now() + 86400000).toISOString(),
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "todo-2",
		title: "Try creating a new task",
		description: "Click the 'Add Task' button to create your first task.",
		priority: "low",
		categoryId: null,
		dueDate: null,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "todo-3",
		title: "Explore categories",
		description: "Organize your tasks by categories for better management.",
		priority: "medium",
		categoryId: null,
		dueDate: null,
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];
