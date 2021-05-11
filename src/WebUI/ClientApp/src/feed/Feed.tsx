import React from "react";
import PostForm from "./PostForm";

const Feed: React.FC = () => {
	return (
		<div className="border-l border-r w-full">
			<h1 className="border-b p-3 text-xl font-bold">Home</h1>
			<PostForm />
			<div className="bg-quaternary h-4 w-full border-t border-b"></div>
		</div>
	);
};

export default Feed;
