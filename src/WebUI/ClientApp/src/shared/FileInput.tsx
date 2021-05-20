import React, { useRef } from "react";

interface FileInputProps {
	onFileChange: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = (props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.length < 1) return;
		props.onFileChange(e.target.files[0]);
	};

	return (
		<span onClick={() => fileInputRef?.current?.click()}>
			<input
				type="file"
				className="hidden"
				accept=".png,.jpg,.jpeg,image/jpeg,image/png"
				ref={fileInputRef}
				onChange={onFileChange}
			/>
			{props.children}
		</span>
	);
};

export default FileInput;
