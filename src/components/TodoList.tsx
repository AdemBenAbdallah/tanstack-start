import { ClipboardList } from "lucide-react";
import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";
import { Card } from "./ui/card";

interface TodoListProps {
	todos: Todo[];
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (todo: Todo) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
	if (todos.length === 0) {
		return (
			<Card className="p-12 text-center border-dashed">
				<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
					<ClipboardList className="w-10 h-10 text-accent" />
				</div>
				<h3 className="text-xl font-semibold mb-2 text-foreground">
					No tasks yet
				</h3>
				<p className="text-muted-foreground mb-6">
					Create your first task to get started
				</p>
			</Card>
		);
	}

	return (
		<div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	);
}
