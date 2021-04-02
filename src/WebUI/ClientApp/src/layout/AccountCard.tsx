import React from "react";

interface AccountCardProps {
	userName: string;
}

export const AccountCard: React.FC<AccountCardProps> = (props) => {
	return (
		<div className="flex mt-auto items-center hover-btn p-2">
			<div className="bg-gray h-10 w-10 rounded-full mr-4"></div>
			<div className="flex flex-col text-sm">
				<span className="font-bold my-0 ">{props.userName}</span>
			</div>
		</div>
	);
};
