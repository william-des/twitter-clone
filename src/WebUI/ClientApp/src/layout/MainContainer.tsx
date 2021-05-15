import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

interface MainContainerProps {
	children?: React.ReactNode;
	title: string;
	subtitle?: string;
	backBtn?: boolean;
}

const MainContainer: React.FC<MainContainerProps> = (props) => {
	return (
		<main className="w-full">
			<header className="flex w-full px-3 border-b items-center h-14">
				{!!props.backBtn && (
					<NavLink to="">
						<FontAwesomeIcon icon={faArrowLeft} className="text-primary mr-8" />
					</NavLink>
				)}
				<div className="flex flex-col">
					<h1 className="text-xl font-bold leading-none">{props.title}</h1>
					<h2 className="leading-none text-sm text-gray-500">{props.subtitle}</h2>
				</div>
			</header>
			{props.children}
		</main>
	);
};

export default MainContainer;
