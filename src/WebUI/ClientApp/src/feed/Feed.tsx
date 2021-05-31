import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../auth/AuthorizeService";
import { useReduxState } from "../core/Store";
import { PostDto, PostsClient } from "../core/WebApiClient";
import MainContainer from "../layout/MainContainer";
import { addPosts } from "../core/actions/PostsActions";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import LoadingIndicator from "../shared/LoadingIndicator";
import InfiniteScroll from "react-infinite-scroll-component";

const Feed: React.FC = () => {
	const state = useReduxState((state) => ({
		posts: state.posts.feed
			.map((id) => state.posts.all[id])
			.sort((p1, p2) => p2.created.valueOf() - p1.created.valueOf()),
	}));

	const [hasMore, setHasMore] = useState(true);

	const [domainUser, setDomainUser] = useState(undefined);
	const loadDomainUser = async () => setDomainUser(await authService.getDomainUser());
	useEffect(() => {
		const subscription = authService.subscribe(() => loadDomainUser());
		loadDomainUser();
		return authService.unsubscribe(subscription);
	}, []);

	const dispatch = useDispatch();
	const loadPosts = async () => {
		const beforeIf = state.posts[state.posts.length - 1]?.id;
		const count = 20;
		const posts = await new PostsClient().getAll(beforeIf, count);
		dispatch(addPosts(posts, true));
		setHasMore(posts.length >= count);
	};
	useEffect(() => {
		loadPosts();
	}, []);

	const renderPost = (post: PostDto, index: number) => <PostCard {...post} key={index} />;

	return (
		<MainContainer title="Home">
			{!!domainUser && (
				<React.Fragment>
					<PostForm pictureId={domainUser?.pictureId} className="p-4" />
					<div className="bg-quaternary h-4 w-full border-t border-b"></div>
				</React.Fragment>
			)}
			<InfiniteScroll
				dataLength={state.posts.length}
				next={loadPosts}
				hasMore={hasMore}
				loader={<LoadingIndicator />}
			>
				{state.posts.map(renderPost)}
			</InfiniteScroll>
		</MainContainer>
	);
};

export default Feed;
