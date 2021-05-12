import React from "react";
import { NavLink } from "react-router-dom";
import { ApplicationPaths } from "../auth/ApiAuthorizationConstants";
import UserPicture from "./UserPicture";

interface UserCardProps {
	fullName?: string;
	username?: string;
	pictureId?: string;
}

export const UserCard: React.FC<UserCardProps> = (props) => {
	return (
		<NavLink
			className="flex mt-auto items-center hover-btn p-2"
			to={{ pathname: `${ApplicationPaths.LogOut}`, state: { local: true } }}
		>
			<UserPicture pictureId={props.pictureId} className="h-10 w-10" />
			<div className="flex-col text-sm hidden md:flex ml-4">
				<span className="font-bold">{props.fullName || "Unknow user"}</span>
				{!!props.username && <span className="text-gray-500">@{props.username}</span>}
			</div>
		</NavLink>
	);
};
