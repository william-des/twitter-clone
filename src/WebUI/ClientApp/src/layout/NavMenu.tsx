import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBell, faBookmark, faEnvelope, faHashtag, faHome, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../components/api-authorization/AuthorizeService";
import { AccountCard } from "./AccountCard";
import NavLink from "./NavLink";

export const NavMenu: React.FC = () => {
	const [state, setState] = useState({ isAuthenticated: false, user: undefined });

	const populateState = async () => {
		const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
		setState({
			isAuthenticated,
			user,
		});
	};

	useEffect(() => {
		const subscription = authService.subscribe(() => populateState());
		populateState();
		return authService.unsubscribe(subscription);
	}, []);

	return (
		<header className="flex-none flex flex-col p-2 w-64">
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
							<NavLink to="/notifications" icon={faBell}>
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
						<li className="my-1">
							<NavLink to="/profile" icon={faUser}>
								Profile
							</NavLink>
						</li>
					</React.Fragment>
				)}
			</ul>
			{state.isAuthenticated && (
				<React.Fragment>
					<button className="custom-btn mr-4 p-3 mt-4">Tweet</button>
					<AccountCard userName={state.user.name} />
				</React.Fragment>
			)}
		</header>
	);
};
