import React from "react";
import DefaultPicture from "../assets/default-picture.png";

interface UserPictureProps {
	pictureId?: string;
	className?: string;
}

const UserPicture: React.FC<UserPictureProps> = (props) => {
	const className = "rounded-full " + props.className;
	const imgSrc = !!props.pictureId ? `/api/medias/${props.pictureId}` : DefaultPicture;

	return <img src={imgSrc} className={className} />;
};

export default UserPicture;
