import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div style={{ padding: "2rem", fontFamily: "system-ui" }}>
			<h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
				Hello World! 👋
			</h1>
			<p style={{ color: "#666" }}>Welcome to your TanStack Start app!</p>
		</div>
	);
}
