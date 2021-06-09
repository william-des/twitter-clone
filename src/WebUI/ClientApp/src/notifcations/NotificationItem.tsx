import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { markAsRead } from "../core/actions/NotificationsActions";
import { INotificationDto, NotificationsClient, NotificationType } from "../core/WebApiClient";
import Card from "../shared/Card";
import UserPicture from "../user/UserPicture";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";

const notificationsConfig = {
	[NotificationType.Follow]: {
		label: "followed you",
		icon: faTwitter,
		iconColor: "primary",
	},
	[NotificationType.Mention]: {
		label: "mentioned you in a tweet",
		icon: faComment,
		iconColor: "primary",
	},
	[NotificationType.Answer]: {
		label: "replied to your tweet",
		icon: faComment,
		iconColor: "primary",
	},
	[NotificationType.RePost]: {
		label: "retweeted your tweet",
		icon: faRetweet,
		iconColor: "green-400",
	},
	[NotificationType.Like]: {
		label: "liked your tweet",
		icon: faHeart,
		iconColor: "pink-500",
	},
};

const NotificationItem: React.FC<INotificationDto> = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onClick = async () => {
		if (!props.read) {
			await new NotificationsClient().markAsRead(props.id);
			dispatch(markAsRead(props.id));
		}

		history.push(
			props.type == NotificationType.Follow ? `/${props.createdBy.username}` : `/status/${props.postId}`
		);
	};

	return (
		<Card onClick={onClick} className={`py-3 px-5 ${props.read ? "" : "bg-primary bg-opacity-5"}`}>
			<div className="flex">
				<FontAwesomeIcon className={`text-2xl mr-2 text-${notificationsConfig[props.type].iconColor}`} icon={notificationsConfig[props.type].icon} />
				<div className="flex flex-col">
					<UserPicture className="h-8 w-8" pictureId={props?.createdBy?.pictureId} />
					<div className="mt-1">
						<span className="font-bold">{props.createdBy.fullName}</span>{" "}
						{notificationsConfig[props.type].label}
					</div>
					<div className="mt-1 text-gray-500">{props.postContent}</div>
				</div>
			</div>
		</Card>
	);
};

export default NotificationItem;
