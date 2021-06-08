import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink as ReactNavLink } from "react-router-dom";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface MenuLinkProps {
	to: string;
	children: React.ReactNode;
	icon: IconDefinition;
	exact?: boolean;
	notifications?: number;
}

const NavLink: React.FC<MenuLinkProps> = (props) => {
	return (
		<ReactNavLink
			className="hover-btn hover:text-primary text-xl font-semibold flex flex-none py-3 px-4 w-min"
			activeClassName="text-primary"
			to={props.to}
			exact={props.exact}
		>
			<div className="w-6 flex items-center justify-center relative">
				{!!props.notifications && (
					<div className="min-w-4 h-4 bg-primary text-white rounded-xl text-xs absolute ml-4 mb-4 text-center px-1">
						{props.notifications}
					</div>
				)}
				<FontAwesomeIcon icon={props.icon} />
			</div>
			<span className="ml-4 hidden md:inline">{props.children}</span>
		</ReactNavLink>
	);
};

export default NavLink;
