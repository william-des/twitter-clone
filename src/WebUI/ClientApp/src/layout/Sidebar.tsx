import React from "react";
import FollowSuggestions from "./FollowSuggestions";
import Trends from "./Trends";
import UserSearch from "./UserSearch";

const Sidebar: React.FC = () => {
	return (
		<div className="hidden lg:block w-350px flex-shrink-0">
			<div className="p-3 pl-7 border-l h-full w-350px fixed">
				<UserSearch />
				<div className="rounded-xl bg-gray-100 mt-4">
					<Trends />
				</div>
				<div className="rounded-xl bg-gray-100 mt-4">
					<FollowSuggestions />
				</div>
				<p className="text-sm text-gray-600 m-3">
					This website is a copy of twitter for demo purposes. Learn more on{" "}
					<a className="underline" href="https://github.com/wdesgardin/twitter-clone">
						Github
					</a>
				</p>
			</div>
		</div>
	);
};

export default Sidebar;
