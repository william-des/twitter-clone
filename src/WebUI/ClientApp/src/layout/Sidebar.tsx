import React from "react";
import FollowButton from "../user/FollowButton";
import UserSearch from "./UserSearch";

const Sidebar: React.FC = () => {
	return (
		<div className="hidden lg:block w-350px flex-shrink-0">
			<div className="p-3 pl-7 border-l h-full w-350px fixed">
				<UserSearch />
				<div className="rounded-xl bg-gray-100 mt-4">
					<h3 className="font-bold border-b py-3 px-4 text-xl">Trends for you</h3>
					<div className="border-b py-3 px-4 text-sm">
						<div className="text-gray-600">Operating System · Trending</div>
						<h2 className="font-semibold">Linux</h2>
						<div className="text-gray-600">3.01M Tweets</div>
					</div>
					<div className="border-b py-3 px-4 text-sm">
						<div className="text-gray-600">Cyptocurrency · Trending</div>
						<h2 className="font-semibold">#Bitcoin</h2>
						<div className="text-gray-600">1.21M Tweets</div>
					</div>
					<div className="border-b py-3 px-4 text-sm">
						<div className="text-gray-600">Trending in France</div>
						<h2 className="font-semibold">SpaceX</h2>
						<div className="text-gray-600">420K Tweets</div>
					</div>

					<div className="border-b py-3 px-4 text-sm">
						<div className="text-gray-600">NBA · Trending</div>
						<h2 className="font-semibold">LeBron James</h2>
						<div className="text-gray-600">389K Tweets</div>
					</div>
					<div className="text-primary py-3 px-4">Show more</div>
				</div>
				<div className="rounded-xl bg-gray-100 mt-4">
					<h3 className="font-bold border-b py-3 px-4 text-xl">Who to follow</h3>
					<div className="border-b py-3 px-4 flex align-middle">
						<img src={"https://thispersondoesnotexist.com/image"} className="h-12 w-12 rounded-full mr-4" />
						<div className="flex flex-col">
							<h2 className="font-semibold mr-1">Elon Musk</h2>
							<span className="text-gray-500 font-light">@ToTheMoon</span>
						</div>
						<FollowButton className="px-4 py-2 ml-auto text-sm my-auto" userId={1} />
					</div>
					<div className="border-b py-3 px-4 flex align-middle">
						<img src={"https://thispersondoesnotexist.com/image"} className="h-12 w-12 rounded-full mr-4" />
						<div className="flex flex-col">
							<h2 className="font-semibold mr-1">Elon Musk</h2>
							<span className="text-gray-500 font-light">@ToTheMoon</span>
						</div>
						<FollowButton className="px-4 py-2 ml-auto text-sm my-auto" userId={1} />
					</div>
					<div className="text-primary py-3 px-4">Show more</div>
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
