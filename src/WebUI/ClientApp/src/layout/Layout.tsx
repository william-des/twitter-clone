import React from "react";
import { useReduxState } from "../core/Store";
import { NavMenu } from "./NavMenu";
import Sidebar from "./Sidebar";

const Layout: React.FC = (props) => {
	const scrollEnable = useReduxState((state) => state.layout.scrollEnable);

	return (
		<div className={`max-w-screen-xl mx-auto h-full flex ${!scrollEnable && "overflow-hidden"}`}>
			<NavMenu />
			{props.children}
			<Sidebar />
		</div>
	);
};
export default Layout;
