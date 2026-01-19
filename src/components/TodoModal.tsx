import { useId } from "react";
import type { Category, Priority, Todo } from "../types/todo";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

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

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent onClose={onClose}>
				<DialogHeader>
					<DialogTitle>{isEditing ? "Edit Task" : "Add New Task"}</DialogTitle>
					<DialogDescription>
						{isEditing
							? "Update your task details below."
							: "Fill in the details to create a new task."}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<DialogBody>
						<div className="space-y-4">
							{/* Title */}
							<div className="space-y-2">
								<Label htmlFor={titleId}>
									Title <span className="text-red-400">*</span>
								</Label>
								<Input
									type="text"
									id={titleId}
									name="title"
									required
									defaultValue={todo?.title ?? ""}
									placeholder="What needs to be done?"
								/>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label htmlFor={descriptionId}>Description</Label>
								<Textarea
									id={descriptionId}
									name="description"
									rows={3}
									defaultValue={todo?.description ?? ""}
									placeholder="Add details about this task..."
								/>
							</div>

							{/* Priority and Category */}
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor={priorityId}>Priority</Label>
									<select
										id={priorityId}
										name="priority"
										defaultValue={todo?.priority ?? "medium"}
										className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer text-foreground"
									>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label htmlFor={categoryIdId}>Category</Label>
									<select
										id={categoryIdId}
										name="categoryId"
										defaultValue={todo?.categoryId ?? ""}
										className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer text-foreground"
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

							{/* Due Date */}
							<div className="space-y-2">
								<Label htmlFor={dueDateId}>Due Date</Label>
								<Input
									type="date"
									id={dueDateId}
									name="dueDate"
									defaultValue={
										todo?.dueDate
											? new Date(todo.dueDate).toISOString().split("T")[0]
											: ""
									}
								/>
							</div>
						</div>
					</DialogBody>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">
							{isEditing ? "Save Changes" : "Add Task"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
