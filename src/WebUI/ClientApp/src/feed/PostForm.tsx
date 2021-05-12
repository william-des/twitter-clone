import React, { useState } from "react";
import { faPollH } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faCalendarPlus, faFileImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreatePostCommand, PostsClient } from "../core/WebApiClient";
import { useDispatch } from "react-redux";
import { addPost } from "./PostActions";
import UserPicture from "../user/UserPicture";

interface PostFormProps {
	pictureId?: string;
}

const PostForm: React.FC<PostFormProps> = (props) => {
	const [content, setContent] = useState("");

	const isContentEmpty = () => content.trim().length == 0;

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	const dispatch = useDispatch();
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isContentEmpty()) return;

		const client = new PostsClient();
		const id = await client.create(new CreatePostCommand({ content }));
		const created = await client.get(id);
		dispatch(addPost(created));

		setContent("");
	};

	return (
		<form onSubmit={onSubmit} className="p-4 flex">
			<UserPicture pictureId={props.pictureId} className="h-12 w-12 mr-4" />
			<div className="flex flex-1 flex-col">
				<textarea
					className="flex-1 mt-3 resize-none text-xl outline-none"
					name="post-content"
					rows={1}
					placeholder="What's happening ?"
					value={content}
					onChange={onChange}
				></textarea>
				<div className="flex">
					<button className="text-primary text-2xl mr-4">
						<FontAwesomeIcon icon={faFileImage} />
					</button>
					<button className="text-primary text-2xl mr-4">
						<FontAwesomeIcon icon={faPollH} />
					</button>
					<button className="text-primary text-2xl mr-4">
						<FontAwesomeIcon icon={faSmile} />
					</button>
					<button className="text-primary text-2xl">
						<FontAwesomeIcon icon={faCalendarPlus} />
					</button>
					<button
						className="custom-btn p-2 px-5 ml-auto disabled:opacity-50"
						type="submit"
						disabled={isContentEmpty()}
					>
						Tweet
					</button>
				</div>
			</div>
		</form>
	);
};

export default PostForm;
