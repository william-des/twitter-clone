import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import authService from "../auth/AuthorizeService";
import { IPostDto } from "../core/WebApiClient";
import Header from "../shared/Header";
import Modal from "../shared/Modal";
import LinkParser from "./LinkParser";
import Post from "./Post";
import PostForm from "./PostForm";

interface PostFormModalProps {
	onClose: VoidFunction;
	answerTo?: IPostDto;
}

const PostFormModal: React.FC<PostFormModalProps> = (props) => {
	const [pictureId, setPictureId] = useState(undefined);
	useEffect(() => {
		(async () => {
			var user = await authService.getDomainUser();
			setPictureId(user?.pictureId);
		})();
	}, []);

	return (
		<Modal>
			<Header leftButton={{ icon: faTimes, onClick: props.onClose }} />
			<div className="p-4" onClick={e => e.stopPropagation()}>
				{!!props.answerTo && (
					<Post post={props.answerTo} showAnswerLine>
						<h4 className="my-3 text-gray-500">
							<LinkParser>{`Replying to @${props.answerTo.createdBy.username}`}</LinkParser>
						</h4>
					</Post>
				)}
				<PostForm
					pictureId={pictureId}
					className="mt-2"
					answerToId={props.answerTo?.id}
					largeInput
					afterValidSubmit={props.onClose}
				/>
			</div>
		</Modal>
	);
};

export default PostFormModal;
