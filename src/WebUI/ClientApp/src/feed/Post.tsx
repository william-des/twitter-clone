import React from "react";
import { NavLink } from "react-router-dom";
import { IPostDto } from "../core/WebApiClient";
import UserPicture from "../user/UserPicture";
import LinkParser from "./LinkParser";
import ReactTimeAgo from "react-time-ago";
import CertifiedBadge from "../shared/CertifiedBadge";

interface PostProps {
	post: IPostDto;
	children?: React.ReactNode;
	showAnswerLine?: boolean;
	large?: boolean;
}

const Post: React.FC<PostProps> = (props) => {
	return (
		<div className="flex">
			<div className="mr-3 flex flex-col items-center">
				<UserPicture pictureId={props.post?.createdBy?.pictureId} className="h-12 w-12 mt-1" />
				{!!props.showAnswerLine && <div className="flex-grow w-2px bg-gray-400 mt-1"></div>}
			</div>
			<div className="flex flex-1 flex-col">
				<div className={`flex ${!!props.large && "flex-col leading-tight"}`}>
					<h2 className="font-semibold mr-2 hover:underline">
						<NavLink to={`/${props.post.createdBy.username}`}>
							{props.post.createdBy.fullName}
							{props.post.createdBy.isCertified && (
								<CertifiedBadge />
							)}
						</NavLink>
					</h2>
					<span className="text-gray-500 font-light">
						@{props.post.createdBy.username}
						{props.large != true && (
							<React.Fragment>
								{" · "}
								<ReactTimeAgo date={props.post.created} timeStyle="twitter" />
							</React.Fragment>
						)}
					</span>
				</div>
				<p className="whitespace-pre-line mb-1">
					<LinkParser>{props.post.content}</LinkParser>
				</p>
				{!!props.post.mediaId && (
					<img src={`api/medias/${props.post.mediaId}`} className="border border-gray-300 rounded-xl my-2" />
				)}
				{props.children}
			</div>
		</div>
	);
};

export default Post;
