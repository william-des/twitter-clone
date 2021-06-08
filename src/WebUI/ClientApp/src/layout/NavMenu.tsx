import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBell, faBookmark, faEnvelope, faHashtag, faHome, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../auth/AuthorizeService";
import { useReduxState } from "../core/Store";
import PostFormModal from "../feed/PostFormModal";
import Button from "../shared/Button";
import { UserCard } from "../user/UserCard";
import NavLink from "./NavLink";

export const NavMenu: React.FC = () => {
	const [state, setState] = useState({ isAuthenticated: false, user: undefined, domainUser: undefined });

	const unreadNotifications = useReduxState((state) => state.notifications.totalUnread);

	const populateState = async () => {
		const [isAuthenticated, user, domainUser] = await Promise.all([
			authService.isAuthenticated(),
			authService.getUser(),
			authService.getDomainUser(),
		]);
		setState({
			isAuthenticated,
			user,
			domainUser,
		});
	};

	useEffect(() => {
		const subscription = authService.subscribe(() => populateState());
		populateState();
		return authService.unsubscribe(subscription);
	}, []);

	const [showPostModal, setShowPostModal] = useState(false);

	return (
		<nav className="flex-none w-56px md:w-275px">
			<div className="fixed flex flex-col h-full w-56px md:w-275px border-r">
				<ul>
					<li className="my-1">
						<Link
							to="/"
							className="hover-btn text-primary text-3xl h-12 w-12 flex items-center justify-center ml-2"
						>
							<FontAwesomeIcon icon={faTwitter} />
						</Link>
					</li>
					<li className="my-1">
						<NavLink to="/" icon={faHome} exact>
							Home
						</NavLink>
					</li>
					<li className="my-1">
						<NavLink to="/explore" icon={faHashtag}>
							Explore
						</NavLink>
					</li>
					{state.isAuthenticated && (
						<React.Fragment>
							<li className="my-1">
								<NavLink to="/notifications" icon={faBell} notifications={unreadNotifications}>
									Notifications
								</NavLink>
							</li>
							<li className="my-1">
								<NavLink to="/messages" icon={faEnvelope}>
									Messages
								</NavLink>
							</li>
							<li className="my-1">
								<NavLink to="/bookmarks" icon={faBookmark}>
									Bookmarks
								</NavLink>
							</li>
							<li className="my-1">
								<NavLink to="/lists" icon={faList}>
									Lists
								</NavLink>
							</li>
							{!!state.domainUser?.username && (
								<li className="my-1">
									<NavLink to={state.domainUser.username} icon={faUser}>
										Profile
									</NavLink>
								</li>
							)}
						</React.Fragment>
					)}
				</ul>
				{state.isAuthenticated && (
					<React.Fragment>
						<Button className="mr-7 p-3 mt-4 hidden md:inline" onClick={() => setShowPostModal(true)}>
							Tweet
						</Button>
						<UserCard {...state.domainUser} />
					</React.Fragment>
				)}
			</div>
			{showPostModal && <PostFormModal onClose={() => setShowPostModal(false)} />}
		</nav>
	);
};
