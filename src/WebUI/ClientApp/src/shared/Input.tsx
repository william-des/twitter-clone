import React, { useRef, useState } from "react";

interface InputProps {
	name: string;
	label: string;
	value: string;
	onChange: (name: string, value: string) => void;
	maxLength: number;
}

const Input: React.FC<InputProps> = (props) => {
	const [focused, setFocused] = useState(false);

	const inputRef = useRef<HTMLInputElement>();
	const textAreaRef = useRef<HTMLTextAreaElement>();

	const onClick = () => {
		inputRef?.current?.focus();
		textAreaRef?.current?.focus();
	};

	const inputProps = {
		name: props.name,
		maxLength: props.maxLength,
		className: "focus:outline-none mt-4 resize-none",
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		value: props.value,
		onChange: (e: any) => props.onChange(props.name, e.target.value),
	};

	return (
		<div
			className={`rounded relative p-2 flex flex-col transition-all duration-200 mb-6 ${
				focused ? "border-primary border" : "border"
			}`}
			onClick={onClick}
		>
			<label
				htmlFor={props.name}
				className={`text-gray-600 absolute top-0 bottom-0 transition-all duration-200 ${
					!!focused && "text-primary"
				}  ${!!focused || props.value.length > 0 ? "text-xs pt-2 " : "flex text-lg pt-3"}`}
			>
				{props.label}
			</label>
			{focused && (
				<div className="text-gray-600 absolute right-0 text-xs mr-2">{`${props.value.length} / ${props.maxLength}`}</div>
			)}
			{props.maxLength <= 100 ? (
				<input ref={inputRef} type="text" {...inputProps} />
			) : (
				<textarea {...inputProps} className={`${inputProps.className} h-20`} />
			)}
		</div>
	);
};

export default Input;
