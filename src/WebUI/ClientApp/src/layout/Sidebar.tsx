import React, { useEffect, useState } from "react";
import { FollowsClient, ISuggestionUserDto } from "../core/WebApiClient";
import CertifiedBadge from "../shared/CertifiedBadge";
import LoadingIndicator from "../shared/LoadingIndicator";
import FollowButton from "../user/FollowButton";
import UserPicture from "../user/UserPicture";
import UserSearch from "./UserSearch";

const Sidebar: React.FC = () => {
	const [suggestions, setSuggestions] = useState<ISuggestionUserDto[]>(undefined);

	const loadSuggestions = async () => {
		const suggestions = await new FollowsClient().getSuggestions(3);
		setSuggestions(suggestions);
	};
	useEffect(() => {
		loadSuggestions();
	}, []);

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
					{suggestions == undefined && <LoadingIndicator />}
					{!!suggestions &&
						suggestions.map((s) => (
							<div className="border-b py-3 px-4 flex align-middle" key={s.id}>
								<UserPicture pictureId={s.pictureId} className="h-12 w-12 mr-4 flex-shrink-0" />
								<div className="flex flex-col flex-shrink overflow-hidden mr-2">
									<h2 className="font-semibold mr-1 flex items-center">
										<div className="truncate whitespace-nowrap flex-shrink">{s.fullName}</div>
										{s.isCertified && <CertifiedBadge />}
									</h2>
									<span className="text-gray-500 font-light truncate">@{s.username}</span>
								</div>
								<FollowButton
									className="px-4 py-2 ml-auto text-sm my-auto flex-shrink-0"
									userId={s.id}
								/>
							</div>
						))}
					{!!suggestions && (
						<div className="text-primary py-3 px-4 cursor-pointer" onClick={loadSuggestions}>
							Show more
						</div>
					)}
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
