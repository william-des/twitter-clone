import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface LoadingIndicatorProps {
	className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
	return (
		<div className="p-4 flex justify-center">
			<FontAwesomeIcon icon={faSpinner} spin className={`text-primary text-2xl ${props.className}`} />
		</div>
	);
};

export default LoadingIndicator;
