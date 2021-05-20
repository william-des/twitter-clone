import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PostCardButtonProps {
	icon: IconDefinition;
	color: string;
	onClick?: VoidFunction;
	active?: boolean;
	value?: number;
}

const PostCardButton: React.FC<PostCardButtonProps> = (props) => {
	return (
		<button
			className={`flex-grow group flex items-center focus:outline-none transition-all hover:text-${props.color} ${
				!!props.active ? `text-${props.color}` : ""
			}`}
			onClick={props.onClick}
		>
			<div
				className={`mr-1 group-hover:bg-opacity-10 rounded-full w-8 h-8 transition-all items-center justify-center flex group-hover:bg-${props.color}`}
			>
				<FontAwesomeIcon icon={props.icon} className="mx-auto" />
			</div>
			<span className="text-sm">{!!props.value && props.value}</span>
		</button>
	);
};

export default PostCardButton;
