import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { IPostDto, PostsClient } from "../core/WebApiClient";
import MainContainer from "../layout/MainContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIndicator from "../shared/LoadingIndicator";
import PostCard from "./PostCard";
import PostButtonRow from "./PostButtonRow";
import { useReduxState } from "../core/Store";
import { useDispatch } from "react-redux";
import { addPostAnswers, addPosts } from "../core/actions/PostsActions";
import UserPicture from "../user/UserPicture";
import { NavLink } from "react-router-dom";
import LinkParser from "./LinkParser";
import CertifiedBadge from "../shared/CertifiedBadge";

const PostAnswers: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { id } = useParams() as any;

	const state = useReduxState((state) => ({
		post: state.posts.all[id],
		answers:
			state.posts.answersIds[id]
				?.map((id) => state.posts.all[id])
				?.sort((p1, p2) => p2.created.valueOf() - p1.created.valueOf()) || [],
	}));

	const [hasMore, setHasMore] = useState(true);

	const loadAnswers = async () => {
		const beforeIf = state.answers[state.answers.length - 1]?.id;
		const count = 20;
		const posts = await new PostsClient().getPostAnswers(id, beforeIf, count);
		dispatch(addPostAnswers(id, posts));
		setHasMore(posts.length >= count);
	};

	useEffect(() => {
		(async () => {
			setHasMore(true);

			try {
				const post = await new PostsClient().get(id);
				dispatch(addPosts([post]));
				await loadAnswers();
			} catch (error) {
				if (error?.status == 404) {
					history.push("/");
				} else {
					console.error(error);
				}
			}
		})();
	}, [id]);

	const renderPost = (post: IPostDto) => <PostCard {...post} key={post.id} />;

	return (
		<MainContainer title="Tweet" leftButton={{ icon: faArrowLeft, onClick: history.goBack }}>
			{!!state.post && (
				<div className="px-3 pt-3 border-b">
					<div className="flex flex-col">
						<div className="flex items-center">
							<UserPicture pictureId={state.post?.createdBy?.pictureId} className="h-12 w-12 mt-1" />
							<div className="ml-3 flex flex-col leading-tight">
								<h2 className="font-semibold mr-1 hover:underline">
									<NavLink to={`/${state.post.createdBy.username}`}>
										{state.post.createdBy.fullName}
									</NavLink>
									{state.post.createdBy.isCertified && (
										<CertifiedBadge />
									)}
								</h2>
								<span className="text-gray-500 font-light">@{state.post.createdBy.username}</span>
							</div>
						</div>
						<p className="whitespace-pre-line my-3 text-2xl">
							<LinkParser>{state.post.content}</LinkParser>
						</p>
						{!!state.post.mediaId && (
							<img
								src={`api/medias/${state.post.mediaId}`}
								className="border border-gray-300 rounded-xl mb-3"
							/>
						)}
						<span className="text-gray-500">
							{state.post.created.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })} ·{" "}
							{state.post.created.toLocaleDateString(undefined, {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</span>
					</div>
					<PostButtonRow post={state.post} large />
				</div>
			)}
			<InfiniteScroll
				dataLength={state.answers.length}
				next={loadAnswers}
				hasMore={hasMore}
				loader={<LoadingIndicator />}
			>
				{state.answers.map(renderPost)}
			</InfiniteScroll>
		</MainContainer>
	);
};

export default PostAnswers;
