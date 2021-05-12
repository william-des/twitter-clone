import React from "react";
import { NavLink } from "react-router-dom";
import { ApplicationPaths } from "../auth/ApiAuthorizationConstants";

interface AccountCardProps {
	fullName?: string;
	username?: string;
}

export const AccountCard: React.FC<AccountCardProps> = (props) => {
	return (
		<NavLink
			className="flex mt-auto items-center hover-btn p-2"
			to={{ pathname: `${ApplicationPaths.LogOut}`, state: { local: true } }}
		>
			<img src="https://thispersondoesnotexist.com/image" className="h-10 w-10 rounded-full"/>
			<div className="flex-col text-sm hidden md:flex ml-4">
				<span className="font-bold">{props.fullName || "Unknow user"}</span>
				{!!props.username && <span className="text-gray-500">@{props.username}</span>}
			</div>
		</NavLink>
	);
};
