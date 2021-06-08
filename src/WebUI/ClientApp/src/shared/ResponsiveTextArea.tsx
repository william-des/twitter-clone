import React, { createRef, useEffect } from "react";

interface ResponsiveTextAreaProps
	extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	minHeight?: number;
}

const ResponsiveTextArea: React.FC<ResponsiveTextAreaProps> = (props) => {
	const { minHeight, ...textareaProps } = props;
	const resizeTextArea = () => {
		if (ref.current) {
			ref.current.style.height = "16px";
			ref.current.style.height = Math.max(ref.current.scrollHeight, minHeight || 16) + "px";
		}
	};

	useEffect(() => {
		window.addEventListener("resize", resizeTextArea);
		return () => {
			window.removeEventListener("resize", resizeTextArea);
		};
	});

	const ref = createRef<HTMLTextAreaElement>();
	useEffect(() => {
		resizeTextArea();
	}, [props.value]);

	return <textarea {...textareaProps} ref={ref} style={{ overflowY: "hidden", resize: "none" }} />;
};

export default ResponsiveTextArea;
