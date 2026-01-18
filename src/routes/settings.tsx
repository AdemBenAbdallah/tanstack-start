import { createFileRoute } from "@tanstack/react-router";
import { Bell, Download, Palette, Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/settings")({
	component: Settings,
});

function Settings() {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-4xl font-display font-bold text-foreground mb-8">
				Settings
			</h1>

			<div className="space-y-6">
				<section className="bg-card/50 border border-border rounded-xl p-6">
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
						<Palette className="w-5 h-5 text-primary" />
						Appearance
					</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Dark Mode</p>
								<p className="text-sm text-muted-foreground">
									Use dark theme across the application
								</p>
							</div>
							<button
								type="button"
								className="relative w-14 h-8 bg-primary rounded-full transition-colors cursor-pointer"
							>
								<span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform" />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">System Preference</p>
								<p className="text-sm text-muted-foreground">
									Follow system color scheme
								</p>
							</div>
							<button
								type="button"
								className="relative w-14 h-8 bg-muted rounded-full transition-colors cursor-pointer"
							>
								<span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform translate-x-6" />
							</button>
						</div>
					</div>
				</section>

				<section className="bg-card/50 border border-border rounded-xl p-6">
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
						<Bell className="w-5 h-5 text-primary" />
						Notifications
					</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Task Reminders</p>
								<p className="text-sm text-muted-foreground">
									Receive notifications for due tasks
								</p>
							</div>
							<button
								type="button"
								className="relative w-14 h-8 bg-primary rounded-full transition-colors cursor-pointer"
							>
								<span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform" />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Daily Summary</p>
								<p className="text-sm text-muted-foreground">
									Get a daily summary of your tasks
								</p>
							</div>
							<button
								type="button"
								className="relative w-14 h-8 bg-muted rounded-full transition-colors cursor-pointer"
							>
								<span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform translate-x-6" />
							</button>
						</div>
					</div>
				</section>

				<section className="bg-card/50 border border-border rounded-xl p-6">
					<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
						<Download className="w-5 h-5 text-primary" />
						Data Management
					</h2>
					<div className="space-y-4">
						<button
							type="button"
							className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-all cursor-pointer"
						>
							<div className="flex items-center gap-3">
								<Download className="w-5 h-5 text-muted-foreground" />
								<div className="text-left">
									<p className="font-medium">Export Data</p>
									<p className="text-sm text-muted-foreground">
										Download all your tasks as JSON
									</p>
								</div>
							</div>
						</button>
						<button
							type="button"
							className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-all cursor-pointer"
						>
							<div className="flex items-center gap-3">
								<Upload className="w-5 h-5 text-muted-foreground" />
								<div className="text-left">
									<p className="font-medium">Import Data</p>
									<p className="text-sm text-muted-foreground">
										Restore tasks from a backup
									</p>
								</div>
							</div>
						</button>
						<button
							type="button"
							className="w-full flex items-center justify-between p-4 bg-card border border-destructive/50 rounded-lg hover:bg-destructive/10 transition-all cursor-pointer"
						>
							<div className="flex items-center gap-3">
								<Trash2 className="w-5 h-5 text-destructive" />
								<div className="text-left">
									<p className="font-medium text-destructive">Clear All Data</p>
									<p className="text-sm text-muted-foreground">
										Permanently delete all tasks and categories
									</p>
								</div>
							</div>
						</button>
					</div>
				</section>

				<section className="bg-card/50 border border-border rounded-xl p-6">
					<h2 className="text-xl font-semibold mb-4">About</h2>
					<div className="space-y-2 text-sm">
						<p>
							<strong>TaskFlow</strong> - Modern Todo App
						</p>
						<p>Version 1.0.0</p>
						<p className="text-muted-foreground">
							Built with TanStack Start, React, and Tailwind CSS
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
