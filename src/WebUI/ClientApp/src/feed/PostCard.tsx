import React from "react";
import { IPostDto } from "../core/WebApiClient";
import Post from "./Post";
import FollowerActivity from "./FollowerActivity";
import PostButtonRow from "./PostButtonRow";
import { NavLink } from "react-router-dom";

const PostCard: React.FC<IPostDto> = (props) => {
	return (
		<article className="border-b p-3 hover:bg-gray-50 transition-colors cursor-pointer">
			<NavLink to={`/status/${props.id}`}>
				<FollowerActivity {...props} />
				<Post post={props}>
					<PostButtonRow post={props}/>
				</Post>
			</NavLink>
		</article>
	);
};

export default PostCard;
