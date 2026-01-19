import { createFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	ChartBar,
	Filter,
	Plus,
	Search,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TodoList } from "../components/TodoList";
import { TodoModal } from "../components/TodoModal";
import { useStore } from "../lib/store";
import type { Todo } from "../types/todo";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const {
		todos,
		categories,
		addTodo,
		updateTodo,
		toggleTodoCompletion,
		removeTodo,
	} = useStore();
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const completedCount = todos.filter((t) => t.completed).length;
	const pendingCount = todos.filter((t) => !t.completed).length;
	const overdueCount = todos.filter(
		(t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date(),
	).length;

	const handleSave = (
		data: Omit<Todo, "id" | "createdAt" | "updatedAt" | "completed">,
	) => {
		if (editingTodo) {
			updateTodo(editingTodo.id, { ...data, completed: editingTodo.completed });
		} else {
			addTodo({ ...data, completed: false });
		}
		setIsModalOpen(false);
		setEditingTodo(null);
	};

	const handleOpenAddModal = () => {
		setEditingTodo(null);
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (todo: Todo) => {
		setEditingTodo(todo);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingTodo(null);
	};

	return (
		<div className="min-h-screen grain-texture">
			{/* Header */}
			<header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
				<div className="max-w-5xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<Sparkles className="w-5 h-5 text-primary" />
							</div>
							<div>
								<h1 className="text-xl font-display font-bold text-foreground">
									TaskFlow
								</h1>
								<p className="text-xs text-muted-foreground">
									Organize your life beautifully
								</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							{/* Quick Stats */}
							<div className="hidden md:flex items-center gap-3 text-sm">
								<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400">
									<ChartBar className="w-4 h-4" />
									<span>{completedCount} done</span>
								</div>
								<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400">
									<Calendar className="w-4 h-4" />
									<span>{pendingCount} pending</span>
								</div>
								{overdueCount > 0 && (
									<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400">
										<span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
										<span>{overdueCount} overdue</span>
									</div>
								)}
							</div>

							<Button onClick={handleOpenAddModal} className="glow-copper">
								<Plus className="w-4 h-4" />
								<span>Add Task</span>
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-5xl mx-auto px-6 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h2 className="text-3xl font-display font-bold text-foreground mb-2">
						Good{" "}
						{new Date().getHours() < 12
							? "morning"
							: new Date().getHours() < 18
								? "afternoon"
								: "evening"}{" "}
						👋
					</h2>
					<p className="text-muted-foreground">
						{pendingCount > 0
							? `You have ${pendingCount} task${pendingCount > 1 ? "s" : ""} waiting for you.`
							: "All caught up! Enjoy your day."}
					</p>
				</div>

				{/* Search and Filter */}
				<div className="flex gap-3 mb-8">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search your tasks..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-11"
						/>
					</div>
					<Button variant="outline">
						<Filter className="w-4 h-4" />
						<span>Filter</span>
					</Button>
				</div>

				{/* Tasks Section */}
				<section>
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-foreground">
							{searchQuery
								? `Search Results (${filteredTodos.length})`
								: "All Tasks"}
						</h3>
						{!searchQuery && todos.length > 0 && (
							<Badge variant="secondary">{todos.length} total</Badge>
						)}
					</div>

					{filteredTodos.length === 0 ? (
						<Card className="p-12 text-center border-dashed">
							<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
								{searchQuery ? (
									<Search className="w-10 h-10 text-accent" />
								) : (
									<Plus className="w-10 h-10 text-accent" />
								)}
							</div>
							<h3 className="text-xl font-semibold mb-2 text-foreground">
								{searchQuery ? "No tasks found" : "No tasks yet"}
							</h3>
							<p className="text-muted-foreground mb-6">
								{searchQuery
									? `No tasks match "${searchQuery}"`
									: "Create your first task to get started"}
							</p>
							{!searchQuery && (
								<Button onClick={handleOpenAddModal}>
									<Plus className="w-4 h-4" />
									<span>Create Your First Task</span>
								</Button>
							)}
							{searchQuery && (
								<Button variant="outline" onClick={() => setSearchQuery("")}>
									Clear Search
								</Button>
							)}
						</Card>
					) : (
						<TodoList
							todos={filteredTodos}
							onToggle={toggleTodoCompletion}
							onDelete={removeTodo}
							onEdit={handleOpenEditModal}
						/>
					)}
				</section>

				{/* Categories Quick Access */}
				{categories.length > 0 && (
					<section className="mt-12">
						<h3 className="text-lg font-semibold text-foreground mb-4">
							Categories
						</h3>
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<Badge
									key={category.id}
									variant="outline"
									style={{
										borderColor: `${category.color}40`,
										backgroundColor: `${category.color}15`,
										color: category.color,
									}}
									className="px-3 py-1.5 cursor-pointer hover:opacity-80 transition-opacity"
								>
									{category.name}
								</Badge>
							))}
						</div>
					</section>
				)}
			</main>

			{/* Task Modal */}
			<TodoModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSave={handleSave}
				todo={editingTodo}
				categories={categories}
			/>
		</div>
	);
}
