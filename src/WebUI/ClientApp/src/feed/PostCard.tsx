import React from "react";
import { IPostDto } from "../core/WebApiClient";
import Post from "./Post";
import FollowerActivity from "./FollowerActivity";
import PostButtonRow from "./PostButtonRow";
import { useHistory } from "react-router-dom";

const PostCard: React.FC<IPostDto> = (props) => {
	const history = useHistory();

	return (
		<article
			className="border-b p-3 hover:bg-gray-50 transition-colors cursor-pointer"
			onClick={() => history.push(`/status/${props.id}`)}
		>
			<FollowerActivity {...props} />
			<Post post={props}>
				<PostButtonRow post={props} />
			</Post>
		</article>
	);
};

export default PostCard;
