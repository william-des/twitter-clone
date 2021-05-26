import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PostButtonProps {
	icon: IconDefinition;
	color: string;
	onClick?: VoidFunction;
	active?: boolean;
	value?: number;
	large?: boolean;
}

const PostButton: React.FC<PostButtonProps> = (props) => {
	const onClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		props.onClick?.();
	}

	return (
		<button
			className={`group flex items-center focus:outline-none transition-all hover:text-${props.color} ${
				!!props.active ? `text-${props.color}` : ""
			} ${!props.large && "flex-grow"}`}
			onClick={onClick}
		>
			<div
				className={`mr-1 group-hover:bg-opacity-10 rounded-full  transition-all items-center justify-center flex group-hover:bg-${props.color} ${!!props.large ? "w-10 h-10 text-xl" : "w-8 h-8"}`}
			>
				<FontAwesomeIcon icon={props.icon} className="mx-auto" />
			</div>
			{props.large != true && <span className="text-sm">{!!props.value && props.value}</span>}
		</button>
	);
};

export default PostButton;
