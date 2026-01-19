import { createFileRoute, Link } from "@tanstack/react-router";
import { getPosts } from "../data/demo.posts";

export const Route = createFileRoute("/posts/$postId")({
	component: PostDetail,
	loader: async ({ params }) => {
		const posts = await getPosts();
		return posts.find((p) => p.id === parseInt(params.postId, 10));
	},
});

function PostDetail() {
	const post = Route.useLoaderData();
	console.log("post", post);

	if (!post) {
		return (
			<div className="p-8 max-w-4xl mx-auto text-center">Post not found</div>
		);
	}

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<Link
				to="/posts"
				className="inline-block mb-6 text-blue-500 hover:text-blue-700"
			>
				← Back to Posts
			</Link>
			<article className="bg-white border border-gray-200 rounded-lg p-8">
				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				<p className="text-sm text-gray-500 mb-6">{post.date}</p>
				<div className="prose max-w-none">
					<p className="text-gray-700 text-lg leading-relaxed">
						{post.content}
					</p>
				</div>
			</article>
		</div>
	);
}
