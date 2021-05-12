import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {
	return (
		<div className="w-128 p-3 pl-7 lg:block hidden">
			<div className="rounded-full bg-gray-200 text-gray-600 p-2 px-4">
				<FontAwesomeIcon icon={faSearch} className="mr-4" />
				Search twitter
			</div>
			<div className="rounded-xl bg-gray-100 mt-4">
				<h3 className="font-bold border-b py-3 px-4 text-xl">Trends for you</h3>
				<div className="border-b py-3 px-4 text-sm">
					<div className="text-gray-600">Scam · Trending</div>
					<h2 className="font-semibold">Accueil, bilan, synthèse</h2>
					<div className="text-gray-600">3.01M Tweets</div>
				</div>
				<div className="border-b py-3 px-4 text-sm">
					<div className="text-gray-600">Cyptocurrency · France</div>
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
					<button className="custom-btn px-4 py-2 ml-auto text-sm my-auto" type="submit">
						Following
					</button>
				</div>
				<div className="border-b py-3 px-4 flex align-middle">
					<img src={"https://thispersondoesnotexist.com/image"} className="h-12 w-12 rounded-full mr-4" />
					<div className="flex flex-col">
						<h2 className="font-semibold mr-1">Elon Musk</h2>
						<span className="text-gray-500 font-light">@ToTheMoon</span>
					</div>
					<button className="custom-btn px-4 py-2 ml-auto text-sm my-auto" type="submit">
						Following
					</button>
				</div>
				<div className="text-primary py-3 px-4">Show more</div>
			</div>
			<p className="text-sm text-gray-600 m-3">Terms of Service</p>
		</div>
	);
};

export default Sidebar;
