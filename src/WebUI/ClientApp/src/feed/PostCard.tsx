import React, { useState } from "react";
import { IPostDto, LikesClient, RePostsClient } from "../core/WebApiClient";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import PostCardButton from "./PostCardButton";
import { useDispatch } from "react-redux";
import { addLike, addRePost, removeLike, removeRePost } from "../core/actions/PostsActions";
import { useReduxState } from "../core/Store";
import AnswerFormModal from "./AnswerFormModal";
import Post from "./Post";
import FollowerActivity from "./FollowerActivity";

const PostCard: React.FC<IPostDto> = (props) => {
	const dispatch = useDispatch();

	const state = useReduxState((state) => ({
		rePosted: state.posts.rePosted.includes(props.id),
		rePosts: state.posts.rePosts[props.id],
		liked: state.posts.liked.includes(props.id),
		likes: state.posts.likes[props.id],
	}));

	const [showAnswerModal, setShowAnswerModal] = useState(false);

	const onLikeClick = async () => {
		const client = new LikesClient();
		if (state.liked) {
			await client.removeLike(props.id);
			dispatch(removeLike(props.id));
		} else {
			await client.createLike(props.id);
			dispatch(addLike(props.id));
		}
	};

	const onRePostClick = async () => {
		const client = new RePostsClient();
		if (state.rePosted) {
			await client.removeRePost(props.id);
			dispatch(removeRePost(props.id));
		} else {
			await client.createRePost(props.id);
			dispatch(addRePost(props.id));
		}
	};

	return (
		<article className="border-b p-3">
			{showAnswerModal && <AnswerFormModal answerTo={props} onClose={() => setShowAnswerModal(false)} />}
			<FollowerActivity {...props} />
			<Post post={props}>
				<div className="flex text-gray-500 font-light w-full text-md">
					<PostCardButton icon={faComment} color="primary" onClick={() => setShowAnswerModal(true)} />
					<PostCardButton
						icon={faRetweet}
						color="green-400"
						onClick={onRePostClick}
						active={state.rePosted}
						value={state.rePosts}
					/>
					<PostCardButton
						icon={faHeart}
						color="pink-500"
						onClick={onLikeClick}
						active={state.liked}
						value={state.likes}
					/>
					<PostCardButton icon={faShareSquare} color="primary" />
				</div>
			</Post>
		</article>
	);
};

export default PostCard;
