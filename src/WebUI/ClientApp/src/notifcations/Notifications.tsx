import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { addNotifications } from "../core/actions/NotificationsActions";
import { useReduxState } from "../core/Store";
import { NotificationsClient, NotificationType } from "../core/WebApiClient";
import MainContainer from "../layout/MainContainer";
import Header from "../shared/Header";
import LoadingIndicator from "../shared/LoadingIndicator";
import NotificationItem from "./NotificationItem";

const Notifications: React.FC = () => {
	const notifications = useReduxState((state) => state.notifications.all);

	const dispatch = useDispatch();
	const [hasMore, setHasMore] = useState(true);
	const loadNotifications = async () => {
		const beforeId = notifications[notifications.length - 1]?.id;
		const count = 20;
		const vm = await new NotificationsClient().get(count, beforeId);
		dispatch(addNotifications(vm));
		setHasMore(vm.notifications.length >= count);
	};
	useEffect(() => {
		if (notifications.length == 0) {
			loadNotifications();
		}
	}, []);

	const location = useLocation();
	const onlyMentions = location.pathname == "/notifications/mentions";

	return (
		<MainContainer>
			<Header title="Notifications">
				<div className="flex h-14">
					<NavLink
						to="/notifications"
						className="text-gray-600 font-bold relative flex flex-grow items-center justify-center hover:bg-primary hover:text-primary hover:bg-opacity-10 transition-all"
						activeClassName="text-primary"
						exact
					>
						All
						{!onlyMentions && (
							<div className="bg-primary w-24 h-1 rounded absolute bottom-0"></div>
						)}
					</NavLink>
					<NavLink
						to="/notifications/mentions"
						className="text-gray-600 font-bold relative flex items-center justify-center flex-grow hover:bg-primary hover:text-primary hover:bg-opacity-10 transition-all"
						activeClassName="text-primary"
					>
						Mentions
						{onlyMentions && <div className="bg-primary w-24 h-1 rounded absolute bottom-0"></div>}
					</NavLink>
				</div>
			</Header>
			<InfiniteScroll
				dataLength={notifications.length}
				next={loadNotifications}
				hasMore={hasMore}
				loader={<LoadingIndicator />}
			>
				{notifications.filter(n => !onlyMentions || n.type == NotificationType.Mention).map((n, index) => (
					<NotificationItem {...n} key={index} />
				))}
			</InfiniteScroll>
		</MainContainer>
	);
};

export default Notifications;
