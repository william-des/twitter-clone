import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface UploadPreviewProps {
	img: string;
	onDeleteClick: VoidFunction;
}

const UploadPreview: React.FC<UploadPreviewProps> = (props) => {
	return (
		<div className="relative">
			<img className="mb-2" src={props.img} />
			<button
				className="h-8 w-8 bg-gray-800 rounded-full absolute top-2 left-2 text-white flex items-center justify-center text-xl"
				onClick={props.onDeleteClick}
			>
				<FontAwesomeIcon icon={faTimes} />
			</button>
		</div>
	);
};

export default UploadPreview;
