import React, { useEffect, useState } from "react";
import { FollowsClient, ISuggestionUserDto } from "../core/WebApiClient";
import CertifiedBadge from "../shared/CertifiedBadge";
import LoadingIndicator from "../shared/LoadingIndicator";
import FollowButton from "../user/FollowButton";
import UserPicture from "../user/UserPicture";

const FollowSuggestions: React.FC = () => {
	const [suggestions, setSuggestions] = useState<ISuggestionUserDto[]>(undefined);

	const loadSuggestions = async () => {
		const suggestions = await new FollowsClient().getSuggestions(3);
		setSuggestions(suggestions);
	};
	useEffect(() => {
		loadSuggestions();
	}, []);

	return (
		<React.Fragment>
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
						<FollowButton className="px-4 py-2 ml-auto text-sm my-auto flex-shrink-0" userId={s.id} />
					</div>
				))}
			{!!suggestions && (
				<div className="text-primary py-3 px-4 cursor-pointer" onClick={loadSuggestions}>
					Show more
				</div>
			)}
		</React.Fragment>
	);
};

export default FollowSuggestions;
