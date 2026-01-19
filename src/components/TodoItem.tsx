import { Clock, Edit, Flag, Trash2 } from "lucide-react";
import type { Todo } from "../types/todo";
import { PRIORITY_COLORS } from "../types/todo";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
	const formattedDate = todo.dueDate
		? new Date(todo.dueDate).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			})
		: null;

	const isOverdue =
		todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

	return (
		<Card className="group relative overflow-hidden p-0">
			{/* Hover gradient effect */}
			<div className="absolute inset-0 bg-linear-0-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="relative flex items-start gap-4 p-4">
				{/* Custom Checkbox */}
				<label className="relative flex items-center cursor-pointer mt-0.5">
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => onToggle(todo.id)}
						className="peer appearance-none w-5 h-5 rounded-lg border-2 border-border bg-background checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-0 transition-all duration-200 cursor-pointer shrink-0"
					/>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="absolute left-0.5 top-0.5 w-3.5 h-3.5 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
						aria-hidden="true"
						role="presentation"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</label>

				<div className="flex-1 min-w-0">
					{/* Title and Priority Badge */}
					<div className="flex items-center gap-3 mb-2 flex-wrap">
						<h3
							className={`font-medium text-lg transition-all ${
								todo.completed
									? "text-muted-foreground line-through"
									: "text-foreground"
							}`}
						>
							{todo.title}
						</h3>
						<Badge
							variant="outline"
							style={{
								borderColor: `${PRIORITY_COLORS[todo.priority]}40`,
								backgroundColor: `${PRIORITY_COLORS[todo.priority]}15`,
								color: PRIORITY_COLORS[todo.priority],
							}}
							className="capitalize"
						>
							{todo.priority}
						</Badge>
					</div>

					{/* Description */}
					{todo.description && (
						<p
							className={`text-sm text-muted-foreground line-clamp-2 mb-3 ${
								todo.completed ? "text-muted-foreground/60" : ""
							}`}
						>
							{todo.description}
						</p>
					)}

					{/* Meta Info */}
					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						{todo.dueDate && (
							<span
								className={`flex items-center gap-1.5 ${
									isOverdue ? "text-red-400" : ""
								}`}
							>
								<Clock className="w-3.5 h-3.5" />
								{formattedDate}
								{isOverdue && (
									<span className="text-red-400 font-medium">(Overdue)</span>
								)}
							</span>
						)}
						<span className="flex items-center gap-1.5">
							<Flag className="w-3.5 h-3.5" />
							Created{" "}
							{new Date(todo.createdAt).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							})}
						</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => onEdit(todo)}
						className="text-muted-foreground hover:text-foreground hover:bg-accent"
					>
						<Edit className="w-4 h-4" />
						<span className="sr-only">Edit task</span>
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => onDelete(todo.id)}
						className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
					>
						<Trash2 className="w-4 h-4" />
						<span className="sr-only">Delete task</span>
					</Button>
				</div>
			</div>

			{/* Progress indicator */}
			<div
				className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ${
					todo.completed ? "w-full" : "w-0"
				}`}
			/>
		</Card>
	);
}
