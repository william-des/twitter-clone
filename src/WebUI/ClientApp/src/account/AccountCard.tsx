import React from "react";

interface AccountCardProps {
	userName: string;
}

export const AccountCard: React.FC<AccountCardProps> = (props) => {
	return (
		<div className="flex mt-auto items-center hover-btn p-2">
			<div className="bg-tertiary h-10 w-10 rounded-full"></div>
			<div className="flex-col text-sm hidden md:flex ml-4">
				<span className="font-bold my-0 ">{props.userName}</span>
			</div>
		</div>
	);
};
