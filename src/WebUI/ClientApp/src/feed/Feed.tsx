import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useReduxState } from "../core/Store";
import { PostDto, PostsClient } from "../core/WebApiClient";
import { setPosts } from "./PostActions";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

const Feed: React.FC = () => {
	const posts = useReduxState((state) => state.posts.all);

	const dispatch = useDispatch();
	const loadPosts = async () => {
		const posts = await new PostsClient().getAll();
		dispatch(setPosts(posts));
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
