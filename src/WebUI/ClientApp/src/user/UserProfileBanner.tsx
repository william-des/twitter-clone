import React from "react";

interface UserProfileBannerProps {
	bannerId?: string;
	children?: React.ReactNode;
}

const UserProfileBanner: React.FC<UserProfileBannerProps> = (props) => {
	return (
		<div
			className="bg-gray-300 h-44 bg-cover bg-center flex-shrink-0"
			style={props.bannerId && { backgroundImage: `url(api/medias/${props.bannerId})` }}
		>
            {props.children}
        </div>
	);
};

export default UserProfileBanner;
