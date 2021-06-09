import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { markAsRead } from "../core/actions/NotificationsActions";
import { INotificationDto, NotificationsClient, NotificationType } from "../core/WebApiClient";
import Card from "../shared/Card";
import UserPicture from "../user/UserPicture";

const NotificationItem: React.FC<INotificationDto> = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onClick = async () => {
		if (!props.read) {
			await new NotificationsClient().markAsRead(props.id);
			dispatch(markAsRead(props.id));
		}

		history.push(props.type == NotificationType.Follow ? `/${props.createdBy.username}` : `/status/${props.postId}`);
	};

	const getLabel = (type: NotificationType) => {
		switch (type) {
			case NotificationType.Follow:
				return "followed you";
			case NotificationType.Answer:
				return "replied to your tweet";
			case NotificationType.Mention:
				return "mentioned you in a tweet";
			case NotificationType.RePost:
				return "retweeted your tweet";
			default:
				return "";
		}
	};

	return (
		<Card onClick={onClick} className={`py-3 px-5 ${props.read ? "" : "bg-primary bg-opacity-5"}`}>
			<div className="flex">
				<FontAwesomeIcon className="text-primary text-3xl mr-2" icon={faTwitter} />
				<div className="flex flex-col">
					<UserPicture className="h-8 w-8" pictureId={props?.createdBy?.pictureId} />
					<div className="mt-1">
						<span className="font-bold">{props.createdBy.fullName}</span> {getLabel(props.type)}
					</div>
					<div className="mt-1 text-gray-500">{props.postContent}</div>
				</div>
			</div>
		</Card>
	);
};

export default NotificationItem;
