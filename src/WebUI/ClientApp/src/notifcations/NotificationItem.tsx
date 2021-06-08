import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { markAsRead } from "../core/actions/NotificationsActions";
import { INotificationDto } from "../core/WebApiClient";
import Card from "../shared/Card";
import UserPicture from "../user/UserPicture";

const NotificationItem: React.FC<INotificationDto> = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onClick = async () => {
		if (!props.read) {
			dispatch(markAsRead(props.id));
		}
		history.push(`/${props.createdBy.username}`);
	};

	return (
		<Card onClick={onClick} className={`py-3 px-5 ${props.read ? "" : "bg-primary bg-opacity-5" }`}>
			<div className="flex">
				<FontAwesomeIcon className="text-primary text-3xl mr-2" icon={faTwitter} />
				<div className="flex flex-col">
					<UserPicture className="h-8 w-8" pictureId={props?.createdBy?.pictureId} />
					<div className="mt-1">
						<span className="font-bold">{props.createdBy.fullName}</span> followed you
					</div>
				</div>
			</div>
		</Card>
	);
};

export default NotificationItem;
