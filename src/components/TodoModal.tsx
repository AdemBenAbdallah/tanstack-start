import { X } from "lucide-react";
import { useId } from "react";
import type { Category, Priority, Todo } from "../types/todo";

interface TodoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (
		data: Omit<Todo, "id" | "createdAt" | "updatedAt" | "completed">,
	) => void;
	todo?: Todo | null;
	categories: Category[];
}

export function TodoModal({
	isOpen,
	onClose,
	onSave,
	todo,
	categories,
}: TodoModalProps) {
	const titleId = useId();
	const descriptionId = useId();
	const priorityId = useId();
	const categoryIdId = useId();
	const dueDateId = useId();

	if (!isOpen) return null;

	const isEditing = !!todo;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const priority = formData.get("priority") as Priority;
		const categoryIdValue = formData.get("categoryId") as string;
		const dueDate = formData.get("dueDate") as string;

		onSave({
			title: title.trim(),
			description: description.trim(),
			priority,
			categoryId: categoryIdValue || null,
			dueDate: dueDate || null,
		});
	};

	const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onKeyDown={handleOverlayKeyDown}
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			<button
				type="button"
				className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm cursor-default"
				onClick={onClose}
				onKeyUp={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						onClose();
					}
				}}
				aria-label="Close modal"
			/>
			<div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200">
				<div className="flex items-center justify-between p-6 border-b border-border">
					<h2 className="text-xl font-semibold">
						{isEditing ? "Edit Task" : "Add New Task"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors cursor-pointer"
						aria-label="Close"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-5">
					<div className="space-y-2">
						<label
							htmlFor={titleId}
							className="block text-sm font-medium text-foreground"
						>
							Title <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id={titleId}
							name="title"
							required
							defaultValue={todo?.title ?? ""}
							placeholder="What needs to be done?"
							className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor={descriptionId}
							className="block text-sm font-medium text-foreground"
						>
							Description
						</label>
						<textarea
							id={descriptionId}
							name="description"
							rows={3}
							defaultValue={todo?.description ?? ""}
							placeholder="Add details about this task..."
							className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label
								htmlFor={priorityId}
								className="block text-sm font-medium text-foreground"
							>
								Priority
							</label>
							<select
								id={priorityId}
								name="priority"
								defaultValue={todo?.priority ?? "medium"}
								className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>

						<div className="space-y-2">
							<label
								htmlFor={categoryIdId}
								className="block text-sm font-medium text-foreground"
							>
								Category
							</label>
							<select
								id={categoryIdId}
								name="categoryId"
								defaultValue={todo?.categoryId ?? ""}
								className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
							>
								<option value="">No category</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="space-y-2">
						<label
							htmlFor={dueDateId}
							className="block text-sm font-medium text-foreground"
						>
							Due Date
						</label>
						<input
							type="date"
							id={dueDateId}
							name="dueDate"
							defaultValue={
								todo?.dueDate
									? new Date(todo.dueDate).toISOString().split("T")[0]
									: ""
							}
							className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
						/>
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-all cursor-pointer"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all glow-copper cursor-pointer"
						>
							{isEditing ? "Save Changes" : "Add Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
