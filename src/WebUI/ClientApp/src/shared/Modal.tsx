import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScrollEnable } from "../core/actions/LayoutActions";

const Modal: React.FC = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setScrollEnable(false));
		return () => {
			dispatch(setScrollEnable(true));
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
			{props.children}
		</div>
	);
};

export default Modal;
