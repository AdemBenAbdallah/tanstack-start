import { createFileRoute, Link } from "@tanstack/react-router";
import { getPosts } from "../data/demo.posts";

export const Route = createFileRoute("/posts")({
	component: Posts,
	loader: async () => await getPosts(),
});

function Posts() {
	const posts = Route.useLoaderData();

	console.log("posts", posts);
	return (
		<div className="p-8 max-w-6xl mx-auto">
			<h1 className="text-4xl font-bold mb-8">Posts</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<Link
						key={post.id}
						to="/posts/$postId"
						params={{ postId: post.id.toString() }}
						className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer"
					>
						<h2 className="text-xl font-semibold mb-2">{post.title}</h2>
						<p className="text-sm text-gray-500 mb-3">{post.date}</p>
						<p className="text-gray-700 line-clamp-3">{post.content}</p>
						<div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors inline-block">
							View Details
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
