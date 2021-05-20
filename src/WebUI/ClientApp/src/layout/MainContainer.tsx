import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Header, { HeaderProps } from "../shared/Header";

interface MainContainerProps extends HeaderProps {
	children?: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = (props) => {
	const { children, ...headerProps } = props;
	return (
		<main className="w-full">
			{!!headerProps && <Header {...headerProps} />}
			{props.children}
		</main>
	);
};

export default MainContainer;
