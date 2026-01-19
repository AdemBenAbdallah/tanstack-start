import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import {
	CheckSquare,
	FolderKanban,
	LayoutDashboard,
	Settings,
} from "lucide-react";
import "../styles.css";
import { StoreProvider } from "../lib/store";
import { ThemeProvider } from "../lib/theme";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "TaskFlow - Modern Todo App" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<ThemeProvider>
			<html lang="en" className="dark">
				<head>
					<HeadContent />
				</head>
				<body className="min-h-screen bg-background text-foreground grain-texture">
					<StoreProvider>
						<div className="flex min-h-screen">
							<aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
								<div className="p-6 border-b border-border">
									<Link
										to="/"
										className="flex items-center gap-3 text-xl font-display font-bold text-primary glow-copper"
									>
										<CheckSquare className="w-8 h-8" />
										<span>TaskFlow</span>
									</Link>
								</div>
								<nav className="flex-1 p-4 space-y-2">
									<NavLink
										to="/"
										icon={<LayoutDashboard />}
										label="All Tasks"
									/>
									<NavLink
										to="/categories"
										icon={<FolderKanban />}
										label="Categories"
									/>
									<NavLink
										to="/settings"
										icon={<Settings />}
										label="Settings"
									/>
								</nav>
								<div className="p-4 border-t border-border">
									<div className="text-xs text-muted-foreground text-center">
										TaskFlow v1.0.0
									</div>
								</div>
							</aside>
							<main className="flex-1 p-8 overflow-auto">
								<Outlet />
							</main>
						</div>
					</StoreProvider>
					<Scripts />
				</body>
			</html>
		</ThemeProvider>
	);
}

function NavLink({
	to,
	icon,
	label,
}: {
	to: string;
	icon: React.ReactNode;
	label: string;
}) {
	return (
		<Link
			to={to}
			className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 group"
		>
			<span className="group-hover:text-primary transition-colors">{icon}</span>
			<span className="font-medium">{label}</span>
		</Link>
	);
}
