import React, { useRef, useState } from "react";
import { faPollH } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faCalendarPlus, faFileImage } from "@fortawesome/free-regular-svg-icons";
import { CreatePostCommand, MediasClient, PostsClient } from "../core/WebApiClient";
import { useDispatch } from "react-redux";
import { addPost } from "../core/actions/PostActions";
import UserPicture from "../user/UserPicture";
import UploadPreview from "./UploadPreview";
import FormButton from "./FormButton";
import Button from "../shared/Button";
import ResponsiveTextArea from "../shared/ResponsiveTextArea";

interface PostFormProps {
	pictureId?: string;
}

const PostForm: React.FC<PostFormProps> = (props) => {
	const [state, setState] = useState({ content: "", mediaId: undefined });
	const isContentEmpty = () => state.content.trim().length == 0;
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setState({ ...state, content: e.target.value });

	const dispatch = useDispatch();
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isContentEmpty()) return;

		const client = new PostsClient();
		const id = await client.create(new CreatePostCommand(state));
		const created = await client.get(id);
		dispatch(addPost(created));

		setState({ content: "", mediaId: undefined });
	};

	const fileInputRef = useRef<HTMLInputElement>(null);
	const onUploadClick = () => fileInputRef.current?.click();
	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.length < 1) return;
		const file = e.target.files[0];
		const mediaId = await new MediasClient().create({ fileName: file.name, data: file });
		setState({ ...state, mediaId });
	};
	const onDeleteFile = () => setState({ ...state, mediaId: undefined });

	return (
		<form onSubmit={onSubmit} className="p-4 flex">
			<UserPicture pictureId={props.pictureId} className="h-12 w-12 mr-4" />
			<div className="flex flex-1 flex-col">
				<ResponsiveTextArea
					className="w-full mt-3 mb-1 text-xl outline-none"
					name="post-content"
					placeholder="What's happening ?"
					value={state.content}
					onChange={onChange}
				/>
				{!!state.mediaId && <UploadPreview mediaId={state.mediaId} onDeleteClick={onDeleteFile} />}
				<div className="flex">
					<FormButton onClick={onUploadClick} disabled={!!state.mediaId} icon={faFileImage}>
						<input
							type="file"
							className="hidden"
							accept=".png,.jpg,.jpeg,image/jpeg,image/png"
							ref={fileInputRef}
							onChange={onFileChange}
						/>
					</FormButton>
					<FormButton disabled icon={faPollH} />
					<FormButton disabled icon={faSmile} />
					<FormButton disabled icon={faCalendarPlus} />
					<Button className="p-2 px-5 ml-auto disabled:opacity-50" type="submit" disabled={isContentEmpty()}>
						Tweet
					</Button>
				</div>
			</div>
		</form>
	);
};

export default PostForm;
