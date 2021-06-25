import React from "react";
import { useReduxState } from "../core/Store";
import { NavMenu } from "./NavMenu";
import Sidebar from "./Sidebar";

interface LayoutProps {
	showSidebar: boolean;
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
	const scrollEnable = useReduxState((state) => state.layout.scrollEnable);

	return (
		<div className={`max-w-screen-xl mx-auto h-full flex ${!scrollEnable && "overflow-hidden"}`}>
			<NavMenu />
			{props.children}
			{props.showSidebar && <Sidebar />}
		</div>
	);
};
export default Layout;
