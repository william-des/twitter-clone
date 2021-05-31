import React, { useRef, useState } from "react";
import { faPollH } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faCalendarPlus, faFileImage } from "@fortawesome/free-regular-svg-icons";
import { CreatePostCommand, MediasClient, PostsClient } from "../core/WebApiClient";
import { useDispatch } from "react-redux";
import { addNewPost } from "../core/actions/PostsActions";
import UserPicture from "../user/UserPicture";
import UploadPreview from "./UploadPreview";
import PostFormButton from "./PostFormButton";
import Button from "../shared/Button";
import ResponsiveTextArea from "../shared/ResponsiveTextArea";

interface PostFormProps {
	pictureId?: string;
	answerToId?: number;
	className?: string;
	largeInput?: boolean;
	afterValidSubmit?: VoidFunction;
}

const PostForm: React.FC<PostFormProps> = (props) => {
	const [state, setState] = useState({ content: "", mediaId: undefined, imgBlob: undefined });
	const isContentEmpty = () => state.content.trim().length == 0;
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setState({ ...state, content: e.target.value });

	const dispatch = useDispatch();
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isContentEmpty()) return;

		const client = new PostsClient();
		const id = await client.create(new CreatePostCommand({ ...state, answerToId: props.answerToId }));
		const created = await client.get(id);
		dispatch(addNewPost(created));

		setState({ content: "", mediaId: undefined, imgBlob: undefined });

		props.afterValidSubmit?.();
	};

	const fileInputRef = useRef<HTMLInputElement>(null);
	const onUploadClick = () => fileInputRef.current?.click();
	const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.length < 1) return;
		const file = e.target.files[0];

		setState((state) => ({ ...state, imgBlob: URL.createObjectURL(file) }));

		const mediaId = await new MediasClient().create({ fileName: file.name, data: file });
		setState((state) => ({ ...state, mediaId }));
	};

	const onDeleteFile = () => setState({ ...state, mediaId: undefined, imgBlob: undefined });

	return (
		<form onSubmit={onSubmit} className={`${props.className || ""} flex`}>
			<UserPicture pictureId={props.pictureId} className="h-12 w-12 mr-4" />
			<div className="flex flex-1 flex-col">
				<ResponsiveTextArea
					className="w-full mt-3 mb-1 text-xl outline-none"
					name="post-content"
					placeholder={!!props.answerToId ? "Tweet your reply" : "What's happening ?"}
					value={state.content}
					minHeight={!!props.largeInput && 96}
					onChange={onChange}
				/>
				{!!state.imgBlob && <UploadPreview img={state.imgBlob} onDeleteClick={onDeleteFile} />}
				<div className="flex">
					<PostFormButton onClick={onUploadClick} disabled={!!state.mediaId} icon={faFileImage}>
						<input
							type="file"
							className="hidden"
							accept=".png,.jpg,.jpeg,image/jpeg,image/png"
							ref={fileInputRef}
							onChange={onFileChange}
						/>
					</PostFormButton>
					<PostFormButton disabled icon={faPollH} />
					<PostFormButton disabled icon={faSmile} />
					<PostFormButton disabled icon={faCalendarPlus} />
					<Button className="p-2 px-5 ml-auto disabled:opacity-50" type="submit" disabled={isContentEmpty()}>
						{!!props.answerToId ? "Reply" : "Tweet"}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default PostForm;
