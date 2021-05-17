import React from "react";
import { useDispatch } from "react-redux";
import { useReduxState } from "../core/Store";
import { FollowsClient } from "../core/WebApiClient";
import Button from "../shared/Button";
import { addFollow, removeFollow } from "../core/actions/FollowsActions";

interface FollowButtonProps {
	userId: number;
	className?: string;
}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
	const isFollowing = useReduxState((state) => state.follows.followed.includes(props.userId));

	const dispatch = useDispatch();
	const onClick = async () => {
		if (isFollowing) {
			await new FollowsClient().unfollowUser(props.userId);
			dispatch(removeFollow(props.userId));
		} else {
			await new FollowsClient().followUser(props.userId);
			dispatch(addFollow(props.userId));
		}
	};

	return (
		<Button light={isFollowing} className={props.className} onClick={onClick}>
			{isFollowing ? "Following" : "Follow"}
		</Button>
	);
};

export default FollowButton;
