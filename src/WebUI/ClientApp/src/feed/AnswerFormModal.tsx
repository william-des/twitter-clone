import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../auth/AuthorizeService";
import { IPostDto } from "../core/WebApiClient";
import Header from "../shared/Header";
import Modal from "../shared/Modal";
import LinkParser from "./LinkParser";
import Post from "./Post";
import PostForm from "./PostForm";

interface AnswerFormModalProps {
	onClose: VoidFunction;
	answerTo: IPostDto;
}

const AnswerFormModal: React.FC<AnswerFormModalProps> = (props) => {
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
			<div className="p-4">
				<Post post={props.answerTo} showAnswerLine>
					<h4 className="my-3 text-gray-500">
						<LinkParser>{`Replying to @${props.answerTo.createdBy.username}`}</LinkParser>
					</h4>
				</Post>
				<PostForm
					pictureId={pictureId}
					className="mt-2"
					answerToId={props.answerTo.id}
					afterValidSubmit={props.onClose}
				/>
			</div>
		</Modal>
	);
};

export default AnswerFormModal;
