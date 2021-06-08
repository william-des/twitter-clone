import React from "react";

interface CardProps {
	onClick: VoidFunction;
	children?: React.ReactNode;
	className?: string;
}

const Card: React.FC<CardProps> = (props) => {
	return (
		<article
			className={`border-b hover:bg-gray-50 transition-colors cursor-pointer ${props.className || ""}`}
			onClick={props.onClick}
		>
			{props.children}
		</article>
	);
};

export default Card;
