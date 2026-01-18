import { createFileRoute, Link } from "@tanstack/react-router";
import { Folder, Plus, Tag } from "lucide-react";

const categories = [
	{ id: "work", name: "Work", color: "oklch(0.6 0.15 200)", taskCount: 5 },
	{
		id: "personal",
		name: "Personal",
		color: "oklch(0.65 0.15 320)",
		taskCount: 3,
	},
	{
		id: "shopping",
		name: "Shopping",
		color: "oklch(0.55 0.15 120)",
		taskCount: 8,
	},
	{ id: "health", name: "Health", color: "oklch(0.6 0.15 140)", taskCount: 2 },
	{
		id: "projects",
		name: "Projects",
		color: "oklch(0.7 0.15 60)",
		taskCount: 4,
	},
];

export const Route = createFileRoute("/categories")({
	component: Categories,
});

function Categories() {
	return (
		<div className="max-w-5xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-4xl font-display font-bold text-foreground">
						Categories
					</h1>
					<p className="text-muted-foreground mt-2">
						Organize your tasks by category
					</p>
				</div>
				<button
					type="button"
					className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 glow-copper card-hover cursor-pointer"
				>
					<Plus className="w-5 h-5" />
					<span className="font-medium">New Category</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{categories.map((category) => (
					<Link
						key={category.id}
						to="/categories/$categoryId"
						params={{ categoryId: category.id }}
						className="bg-card/50 border border-border rounded-xl p-6 hover:bg-card hover:border-primary/50 transition-all duration-200 card-hover group"
					>
						<div className="flex items-start gap-4">
							<div
								className="w-12 h-12 rounded-lg flex items-center justify-center"
								style={{ backgroundColor: `${category.color}30` }}
							>
								<Folder className="w-6 h-6" style={{ color: category.color }} />
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
									{category.name}
								</h3>
								<p className="text-muted-foreground text-sm">
									{category.taskCount} task{category.taskCount !== 1 ? "s" : ""}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className="mt-8 bg-card/30 border border-border/50 rounded-xl p-6">
				<div className="flex items-center gap-2 mb-4">
					<Tag className="w-5 h-5 text-muted-foreground" />
					<h2 className="font-semibold">Uncategorized</h2>
				</div>
				<p className="text-muted-foreground text-sm">
					Tasks without a category will appear here. Consider organizing them
					into categories for better management.
				</p>
			</div>
		</div>
	);
}
