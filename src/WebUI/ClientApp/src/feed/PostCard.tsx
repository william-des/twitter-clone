import React from "react";
import { IPostDto } from "../core/WebApiClient";
import ReactTimeAgo from "react-time-ago";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet, faShareSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkParser from "./LinkParser";
import UserPicture from "../user/UserPicture";
import { NavLink } from "react-router-dom";

const PostCard: React.FC<IPostDto> = (props) => {
	const randomInt = () => Math.ceil(Math.random() * 100);

	const Button = (btnProps: { icon: IconDefinition; color: string }) => {
		return (
			<button className={`flex-grow group flex items-center focus:outline-none hover:text-${btnProps.color}`}>
				<div
					className={`mr-1 group-hover:bg-opacity-10 rounded-full w-8 h-8 items-center justify-center flex group-hover:bg-${btnProps.color}`}
				>
					<FontAwesomeIcon icon={btnProps.icon} className="mx-auto" />
				</div>
				<span className="text-sm">{randomInt()}</span>
			</button>
		);
	};

	return (
		<article className="border-b p-3">
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
						<Button icon={faComment} color="primary" />
						<Button icon={faRetweet} color="green-400" />
						<Button icon={faHeart} color="pink-500" />
						<Button icon={faShareSquare} color="primary" />
					</div>
				</div>
			</div>
		</article>
	);
};

export default PostCard;
