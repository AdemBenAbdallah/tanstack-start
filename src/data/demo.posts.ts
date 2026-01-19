import { createServerFn } from "@tanstack/react-start";

export const getPosts = createServerFn({
	method: "GET",
}).handler(async () => [
	{
		id: 1,
		title: "Getting Started with TanStack Start",
		content:
			"TanStack Start is a new SSR-first React framework built on React Router and Vite. It provides server components, streaming, file-based routing, and more.",
		date: "2024-01-15",
	},
	{
		id: 2,
		title: "Understanding React Server Components",
		content:
			"Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client and improving initial page load performance.",
		date: "2024-01-10",
	},
	{
		id: 3,
		title: "State Management with TanStack Query",
		content:
			"TanStack Query provides powerful data fetching, caching, and state management. It handles loading states, error handling, and automatic refetching out of the box.",
		date: "2024-01-05",
	},
	{
		id: 4,
		title: "Routing in Modern React Applications",
		content:
			"File-based routing is becoming the standard in modern React frameworks. It provides type-safe routing, code-splitting, and a clear project structure.",
		date: "2024-01-01",
	},
	{
		id: 5,
		title: "TypeScript Best Practices for React",
		content:
			"Using TypeScript with React improves developer experience, catches errors at compile time, and provides better IDE autocomplete and documentation.",
		date: "2023-12-28",
	},
	{
		id: 6,
		title: "Optimizing React Performance",
		content:
			"React performance can be improved with techniques like memoization, virtual scrolling, lazy loading, and avoiding unnecessary re-renders.",
		date: "2023-12-20",
	},
]);
