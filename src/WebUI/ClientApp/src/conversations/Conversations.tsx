import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import Button from "../shared/Button";
import Header from "../shared/Header";
import NewConversation from "./NewConversation";
import Placeholder from "./Placeholder";

const Conversations: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => setShowModal(true);

	return (
		<div className="flex flex-grow">
			{showModal && <NewConversation onClose={() => setShowModal(false)} />}
			<div className="border-r w-2/5">
				<Header title="Messages" rightButton={{ icon: faPaperPlane, onClick: openModal }}></Header>
				<Placeholder
					className="mx-4 mt-5"
					title="Send a message, get a message"
					description="Direct Messages are private conversations between you and other people. Share Tweets, media, and more!"
					button={{ onClick: openModal, text: "Start a conversation" }} />
			</div>
			<div className="flex-grow flex">
				<Placeholder
					className="mx-auto self-center"
					title="You don’t have a message selected"
					description="Choose one from your existing messages, or start a new one"
					button={{ onClick: openModal, text: "New message" }} />
			</div>
		</div >
	);
};

export default Conversations;
