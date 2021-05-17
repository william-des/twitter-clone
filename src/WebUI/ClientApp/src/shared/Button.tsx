import React from "react";

export interface ButtonProps
	extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	light?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
	const { className, light, ...otherProps } = props;
	const conditonnalClasses = !!props.light ? "text-primary border border-primary" : "bg-primary text-white";

	return (
		<button
			className={`font-semibold rounded-full focus:outline-none ${conditonnalClasses} ${props.className || ""}`}
			{...otherProps}
		/>
	);
};

export default Button;
