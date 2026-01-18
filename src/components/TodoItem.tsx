import { Check, Clock, Flag } from "lucide-react";
import type { Todo } from "../types/todo";
import { PRIORITY_COLORS } from "../types/todo";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
	const formattedDate = todo.dueDate
		? new Date(todo.dueDate).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			})
		: null;

	const isOverdue =
		todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

	return (
		<div className="group flex items-start gap-4 p-4 bg-card/50 border border-border rounded-xl hover:bg-card hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
			<button
				type="button"
				onClick={() => onToggle(todo.id)}
				className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
					todo.completed
						? "bg-primary border-primary text-primary-foreground"
						: "border-border hover:border-primary/50 bg-background"
				}`}
			>
				{todo.completed && <Check className="w-4 h-4" />}
			</button>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-3 mb-1">
					<h3
						className={`font-medium truncate transition-all ${
							todo.completed
								? "text-muted-foreground line-through"
								: "text-foreground"
						}`}
					>
						{todo.title}
					</h3>
					<span
						className="px-2 py-0.5 text-xs font-medium rounded-full shrink-0"
						style={{
							backgroundColor: `${PRIORITY_COLORS[todo.priority]}20`,
							color: PRIORITY_COLORS[todo.priority],
						}}
					>
						{todo.priority}
					</span>
				</div>

				{todo.description && (
					<p
						className={`text-sm text-muted-foreground line-clamp-2 mb-2 ${
							todo.completed ? "text-muted-foreground/60" : ""
						}`}
					>
						{todo.description}
					</p>
				)}

				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					{todo.dueDate && (
						<span
							className={`flex items-center gap-1 ${
								isOverdue ? "text-red-500" : ""
							}`}
						>
							<Clock className="w-3 h-3" />
							{formattedDate}
						</span>
					)}
					<span className="flex items-center gap-1">
						<Flag className="w-3 h-3" />
						{new Date(todo.createdAt).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						})}
					</span>
				</div>
			</div>

			<button
				type="button"
				onClick={() => onDelete(todo.id)}
				className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 cursor-pointer"
			>
				Delete
			</button>
		</div>
	);
}
