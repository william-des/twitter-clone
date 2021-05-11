import React, { useEffect, useState } from "react";
import { IPostDto, PostDto, PostsClient } from "../services/WebApiClient";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

const Feed: React.FC = () => {
	const [posts, setPosts] = useState<IPostDto[]>([]);

	const loadPosts = async () => {
		const posts = await new PostsClient().get();
		setPosts(posts);
	};

	useEffect(() => {
		loadPosts();
	}, []);

	const renderPost = (post: PostDto) => <PostCard {...post} key={post.id} />;

	return (
		<section className="border-l border-r w-full">
			<h1 className="border-b p-3 text-xl font-bold">Home</h1>
			<PostForm />
			<div className="bg-quaternary h-4 w-full border-t border-b"></div>
			{posts.map(renderPost)}
		</section>
	);
};

export default Feed;
