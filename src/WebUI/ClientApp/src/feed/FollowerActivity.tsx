import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { IPostDto } from "../core/WebApiClient";

const FollowerActivity: React.FC<IPostDto> = (props) => {
	let link: React.ReactNode;

	if (props?.rePostedBy?.fullName) {
		link = (
			<NavLink to={`/${props.rePostedBy.username}`}>
				<FontAwesomeIcon icon={faRetweet} className="mr-3" />
				Retweeted by {props.rePostedBy.fullName}
			</NavLink>
		);
	} else if (props?.likedBy?.fullName) {
		link = (
			<NavLink to={`/${props.likedBy.username}`}>
				<FontAwesomeIcon icon={faHeart} className="mr-3" />
				Liked by {props.likedBy.fullName}
			</NavLink>
		);
	}

	return !!link ? (
		<h3 className="text-gray-700 font-semibold ml-9 mb-1 text-sm hover:underline">{link}</h3>
	) : (
		<React.Fragment />
	);
};

export default FollowerActivity;
