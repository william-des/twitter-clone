import React from "react";
import { IPostDto } from "../core/WebApiClient";
import ReactTimeAgo from "react-time-ago";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkParser from "./LinkParser";
import UserPicture from "../user/UserPicture";
import { NavLink } from "react-router-dom";

const PostCard: React.FC<IPostDto> = (props) => {
	const randomInt = () => Math.ceil(Math.random() * 100);

	return (
		<article className="border-b p-3 flex">
			<UserPicture pictureId={props?.createdBy?.pictureId} className="h-12 w-12 mr-4" />
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
				<div className="flex justify-between w-5/6 text-gray-500 font-light">
					<button className="w-16 text-left">
						<FontAwesomeIcon icon={faComment} className="mr-2" />
						{randomInt()}
					</button>
					<button className="w-16 text-left">
						<FontAwesomeIcon icon={faRetweet} className="mr-2" />
						{randomInt()}
					</button>
					<button className="w-16 text-left">
						<FontAwesomeIcon icon={faHeart} className="mr-2" />
						{randomInt()}
					</button>
					<button className="w-16 text-left">
						<FontAwesomeIcon icon={faShareSquare} className="mr-2" />
					</button>
				</div>
			</div>
		</article>
	);
};

export default PostCard;
