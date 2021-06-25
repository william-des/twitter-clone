import { faSearch, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { CreateConversationCommand, ISearchUserDto, UsersClient } from "../core/WebApiClient";
import Header from "../shared/Header";
import LoadingIndicator from "../shared/LoadingIndicator";
import Modal from "../shared/Modal";
import UserPicture from "../user/UserPicture";
import { ConversationsClient } from "../core/WebApiClient";

interface NewConversationProps {
	onClose: VoidFunction;
}

const NewConversation: React.FC<NewConversationProps> = (props) => {
	const [state, setState] = useState<{
		search: string;
		users: ISearchUserDto[];
		loading: boolean;
		selectedUsers: ISearchUserDto[];
	}>({
		search: "",
		users: [],
		loading: false,
		selectedUsers: [],
	});

	const queryUsers = async () => {
		if (!state.search?.trim()) {
			setState((state) => ({ ...state, users: [], loading: false }));
		} else {
			setState((state) => ({ ...state, loading: true, users: [] }));
			const users = await new UsersClient().searchUser(state.search);
			setState({ ...state, loading: false, users });
		}
	};
	const timeout = useRef<ReturnType<typeof setTimeout>>();
	useEffect(() => {
		!!timeout.current && clearTimeout(timeout.current);
		timeout.current = setTimeout(() => queryUsers(), 500);
		return () => {
			!!timeout.current && clearTimeout(timeout.current);
		};
	}, [state.search]);

	const createConversation = async () => {
		if(!state.selectedUsers || state.selectedUsers.length == 0) return;

		const members = state.selectedUsers.map(u => u.id);
		const command = new CreateConversationCommand({ members });
		const createdId = await new ConversationsClient().create(command);
		props.onClose();
	}

	return (
		<Modal className="h-600px">
			<Header
				title="New message"
				leftButton={{ icon: faTimes, onClick: props.onClose }}
				rightButton={{ text: "next", onClick: createConversation, disabled: state.selectedUsers.length == 0 }}
			>
				<div className="flex items-center mb-2">
					<FontAwesomeIcon className="mx-5 text-primary" icon={faSearch} />
					<input
						onChange={(e) => setState({ ...state, search: e.target?.value?.trimStart() || "" })}
						value={state.search}
						type="text"
						className="focus:outline-none flex-grow text-gray-500"
						placeholder="Search people"
					/>
				</div>
				{state.selectedUsers.length > 0 && (
					<div className="flex mx-2 flex-wrap">
						{state.selectedUsers.map((u) => (
							<div
								className="rounded-full flex p-1 border items-center mb-2 mr-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer"
								onClick={() =>
									setState((state) => ({
										...state,
										selectedUsers: state.selectedUsers.filter((usr) => usr.id != u.id),
									}))
								}
							>
								<UserPicture pictureId={u.pictureId} className="h-6 w-6 mr-3" />
								<div className="font-bold">{u.fullName}</div>
								<FontAwesomeIcon icon={faTimes} className="text-primary mx-2" />
							</div>
						))}
					</div>
				)}
			</Header>
			<div className="flex overflow-y-auto">
				{state.loading && <LoadingIndicator className="mx-auto" />}
				{state.users.length > 0 && (
					<ul className="w-full">
						{state.users.map((u) => (
							<li
								key={u.id}
								className="p-3 border-b hover:bg-gray-50 transition-colors cursor-pointer w-full"
								onClick={() =>
									setState((state) => ({
										...state,
										selectedUsers: [...state.selectedUsers, u],
										search: "",
										users: [],
									}))
								}
							>
								{!!u.followedByMe && (
									<div className="font-bold text-gray-500 text-sm ml-5 mb-1">
										<FontAwesomeIcon icon={faUser} className="mr-3" />
										Following
									</div>
								)}
								<div className="flex">
									<UserPicture className="h-9 w-9" pictureId={u.pictureId} />
									<div className="flex flex-col ml-2 flex-grow justify-between">
										<h2 className="font-semibold mr-1 leading-none">{u.fullName}</h2>
										<span className="text-gray-500 font-light leading-none">@{u.username}</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</Modal>
	);
};

export default NewConversation;
