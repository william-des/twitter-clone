import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "./Button";

export interface HeaderProps {
	title?: string;
	subtitle?: string;
	leftButton?: {
		icon: IconDefinition;
		onClick: VoidFunction;
	};
	rightButton?: {
		text?: string;
		icon?: IconDefinition;
		disabled?: boolean;
		onClick: VoidFunction;
	};
	children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
	return (
		<div className="w-full border-b ">
			<div className="flex w-full items-center h-14 px-3">
				{!!props.leftButton && (
					<button
						onClick={props.leftButton.onClick}
						className="rounded-full w-8 h-8 items-center justify-center flex hover:bg-primary hover:bg-opacity-10 mr-8 focus:outline-none"
					>
						<FontAwesomeIcon icon={props.leftButton.icon} className="text-primary " />
					</button>
				)}
				<div className="flex flex-col">
					<h1 className="text-xl font-bold leading-none">{props.title}</h1>
					<h2 className="leading-none text-sm text-gray-500">{props.subtitle}</h2>
				</div>
				{!!props.rightButton?.text && (
					<Button disabled={props?.rightButton?.disabled} className="ml-auto px-4 py-1 disabled:opacity-60" onClick={props.rightButton.onClick}>
						{props.rightButton.text}
						{!!props.rightButton?.icon && <FontAwesomeIcon icon={props.rightButton.icon} />}
					</Button>
				)}
				{!!props.rightButton?.icon && (
					<button
						onClick={props.rightButton.onClick}
						className="ml-auto w-8 h-8 rounded-full items-center justify-center flex hover:bg-primary hover:bg-opacity-10 focus:outline-none"
					>
						<FontAwesomeIcon icon={props.rightButton.icon} className="text-primary " />
					</button>
				)}
			</div>
			{props.children}
		</div>
	);
};

export default Header;
