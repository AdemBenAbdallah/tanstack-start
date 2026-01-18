import { createFileRoute } from "@tanstack/react-router";
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { TodoList } from "../components/TodoList";
import { useStore } from "../lib/store";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { todos, toggleTodoCompletion, removeTodo } = useStore();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="max-w-5xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-4xl font-display font-bold text-foreground">
						All Tasks
					</h1>
					<p className="text-muted-foreground mt-2">
						Manage and organize your tasks
					</p>
				</div>
				<button
					type="button"
					className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 glow-copper card-hover cursor-pointer"
				>
					<Plus className="w-5 h-5" />
					<span className="font-medium">Add Task</span>
				</button>
			</div>

			<div className="flex gap-4 mb-8">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search tasks..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
					/>
				</div>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent/50 transition-all cursor-pointer"
				>
					<Filter className="w-5 h-5 text-muted-foreground" />
					<span className="text-muted-foreground">Filter</span>
				</button>
			</div>

			{filteredTodos.length === 0 ? (
				<div className="bg-card/50 border border-border rounded-xl p-8 text-center">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
						<Plus className="w-8 h-8 text-accent" />
					</div>
					<h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
					<p className="text-muted-foreground mb-6">
						{todos.length === 0
							? "Create your first task to get started"
							: "No tasks match your search"}
					</p>
					<button
						type="button"
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 glow-copper cursor-pointer"
					>
						Create Your First Task
					</button>
				</div>
			) : (
				<TodoList
					todos={filteredTodos}
					onToggle={toggleTodoCompletion}
					onDelete={removeTodo}
				/>
			)}
		</div>
	);
}
