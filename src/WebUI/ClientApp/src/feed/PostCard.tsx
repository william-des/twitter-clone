import React from "react";
import { IPostDto, LikesClient } from "../core/WebApiClient";
import ReactTimeAgo from "react-time-ago";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkParser from "./LinkParser";
import UserPicture from "../user/UserPicture";
import { NavLink } from "react-router-dom";
import PostCardButton from "./PostCardButton";
import { useDispatch } from "react-redux";
import { setPostLiked } from "../core/actions/PostsActions";

const PostCard: React.FC<IPostDto> = (props) => {
	const dispatch = useDispatch();

	const onLikeClick = async () => {
		const client = new LikesClient();
		if (props.likedByMe) {
			await client.removeLike(props.id);
		} else {
			await client.createLike(props.id);
		}
		dispatch(setPostLiked(props.id, !props.likedByMe));
	};

	return (
		<article className="border-b p-3">
			{!!props?.likedBy?.username && (
				<h3 className="text-gray-700 font-semibold ml-9 mb-1 text-sm">
					<FontAwesomeIcon icon={faHeart} className="mr-3" />
					Liked by {props.likedBy.fullName}
				</h3>
			)}
			<div className="flex">
				<UserPicture pictureId={props?.createdBy?.pictureId} className="h-12 w-12 mr-3 mt-1" />
				<div className="flex flex-1 flex-col">
					<div className="flex">
						<h2 className="font-semibold mr-1 hover:underline">
							<NavLink to={`/${props.createdBy.username}`}>{props.createdBy.fullName}</NavLink>
						</h2>
						<span className="text-gray-500 font-light">
							@{props.createdBy.username} · <ReactTimeAgo date={props.created} timeStyle="twitter" />
						</span>
					</div>
					<p className="whitespace-pre-line mb-1">
						<LinkParser>{props.content}</LinkParser>
					</p>
					{!!props.mediaId && (
						<img src={`api/medias/${props.mediaId}`} className="border border-gray-300 rounded-xl my-2" />
					)}
					<div className="flex text-gray-500 font-light w-full text-md">
						<PostCardButton icon={faComment} color="primary" />
						<PostCardButton icon={faRetweet} color="green-400" />
						<PostCardButton
							icon={faHeart}
							color="pink-500"
							onClick={onLikeClick}
							active={props.likedByMe}
							value={props.likes}
						/>
						<PostCardButton icon={faShareSquare} color="primary" />
					</div>
				</div>
			</div>
		</article>
	);
};

export default PostCard;
