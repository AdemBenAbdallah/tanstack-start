import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/categories/$categoryId")({
	component: CategoryDetail,
});

const categoryColors: Record<string, string> = {
	work: "oklch(0.6 0.15 200)",
	personal: "oklch(0.65 0.15 320)",
	shopping: "oklch(0.55 0.15 120)",
	health: "oklch(0.6 0.15 140)",
	projects: "oklch(0.7 0.15 60)",
};

function CategoryDetail() {
	const { categoryId } = Route.useParams();
	const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
	const categoryColor = categoryColors[categoryId] || "oklch(0.65 0.14 55)";

	return (
		<div className="max-w-5xl mx-auto">
			<div className="flex items-center gap-4 mb-8">
				<a
					href="/categories"
					className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Back to Categories</span>
				</a>
			</div>

			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<div
						className="w-14 h-14 rounded-xl flex items-center justify-center"
						style={{ backgroundColor: `${categoryColor}30` }}
					>
						<span
							className="text-2xl font-bold"
							style={{ color: categoryColor }}
						>
							{categoryName.charAt(0)}
						</span>
					</div>
					<div>
						<h1 className="text-4xl font-display font-bold text-foreground">
							{categoryName}
						</h1>
						<p className="text-muted-foreground mt-1">
							3 tasks in this category
						</p>
					</div>
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

			<div className="bg-card/50 border border-border rounded-xl p-8 text-center">
				<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
					<Plus className="w-8 h-8 text-accent" />
				</div>
				<h3 className="text-xl font-semibold mb-2">
					No tasks in this category
				</h3>
				<p className="text-muted-foreground mb-6">
					Add tasks to the {categoryName} category to see them here
				</p>
				<button
					type="button"
					className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 glow-copper cursor-pointer"
				>
					Add Task to {categoryName}
				</button>
			</div>
		</div>
	);
}
