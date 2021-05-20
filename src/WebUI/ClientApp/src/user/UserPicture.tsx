import React from "react";
import DefaultPicture from "../assets/default-picture.png";

interface UserPictureProps {
	pictureId?: string;
	className?: string;
	children?: React.ReactNode;
}

const UserPicture: React.FC<UserPictureProps> = (props) => {
	const className = "rounded-full bg-cover bg-center " + props.className;
	const imgSrc = !!props.pictureId ? `/api/medias/${props.pictureId}` : DefaultPicture;

	return (
		<div className={className} style={{ backgroundImage: `url(${imgSrc})` }}>
			{props.children}
		</div>
	);
};

export default UserPicture;
