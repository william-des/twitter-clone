import React from "react";

const Trends: React.FC = () => {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

export default Trends;
