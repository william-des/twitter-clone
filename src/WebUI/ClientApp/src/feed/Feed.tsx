import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../auth/AuthorizeService";
import { useReduxState } from "../core/Store";
import { PostDto, PostsClient } from "../core/WebApiClient";
import MainContainer from "../layout/MainContainer";
import { addPosts, setPostsLoading } from "../core/actions/PostsActions";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import LoadingIndicator from "../shared/LoadingIndicator";

const Feed: React.FC = () => {
	const state = useReduxState((state) => ({
		loading: state.posts.loading,
		posts: state.posts.all.sort((p1, p2) => p2.created.valueOf() - p1.created.valueOf()),
	}));

	const [domainUser, setDomainUser] = useState(undefined);
	const loadDomainUser = async () => setDomainUser(await authService.getDomainUser());
	useEffect(() => {
		const subscription = authService.subscribe(() => loadDomainUser());
		loadDomainUser();
		return authService.unsubscribe(subscription);
	}, []);

	const dispatch = useDispatch();
	const loadPosts = async () => {
		const posts = await new PostsClient().getAll();
		dispatch(addPosts(posts));
	};
	useEffect(() => {
		dispatch(setPostsLoading());
		loadPosts();
	}, []);

	const renderPost = (post: PostDto) => <PostCard {...post} key={post.id} />;

	return (
		<MainContainer title="Home">
			{!!domainUser && (
				<React.Fragment>
					<PostForm pictureId={domainUser.pictureId} />
					<div className="bg-quaternary h-4 w-full border-t border-b"></div>
				</React.Fragment>
			)}
			{state.posts.map(renderPost)}
			{!!state.loading && <LoadingIndicator />}
		</MainContainer>
	);
};

export default Feed;
