import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import Button from "../shared/Button";
import Header from "../shared/Header";
import NewConversation from "./NewConversation";

const Conversations: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => setShowModal(true);

	return (
		<div className="flex flex-grow">
			{showModal && <NewConversation onClose={() => setShowModal(false)} />}
			<div className="border-r w-2/5">
				<Header title="Messages" rightButton={{ icon: faPaperPlane, onClick: openModal }}></Header>
				<div className="mx-4 mt-5 text-center">
					<h2 className="font-bold text-xl">Send a message, get a message</h2>
					<p className="text-gray-600 my-1">
						Direct Messages are private conversations between you and other people. Share Tweets, media, and
						more!
					</p>
					<Button className="mt-2 py-2 px-4" onClick={openModal}>
						Start a conversation
					</Button>
				</div>
			</div>
			<div className="flex-grow flex">
				<div className="mx-auto self-center text-center">
					<h2 className="font-bold text-xl">You don’t have a message selected</h2>
					<p className="text-gray-600 my-1">Choose one from your existing messages, or start a new one.</p>
					<Button className="mt-2 py-2 px-4" onClick={openModal}>
						New message
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Conversations;
