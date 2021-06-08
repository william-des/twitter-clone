import { faSearch, faTimesCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ISearchUserDto, UsersClient } from "../core/WebApiClient";
import LoadingIndicator from "../shared/LoadingIndicator";
import UserPicture from "../user/UserPicture";

const UserSearch: React.FC = () => {
	const [state, setState] = useState<{ search: string; users: ISearchUserDto[]; loading: boolean }>({
		search: "",
		users: [],
		loading: false,
	});

	const [focused, setFocused] = useState(false);

	const inputRef = useRef<HTMLInputElement>();
	const onClick = () => inputRef.current?.focus();

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

	const history = useHistory();
	const onUserClick = (username: string) => {
		setState({ ...state, search: "", users: [] });
		history.push(`/${username}`);
	};

	return (
		<React.Fragment>
			<div
				className={`rounded-full text-gray-600 py-2 flex items-center border ${
					focused ? "border-primary" : "bg-gray-200 border-gray-200"
				}`}
				onClick={onClick}
			>
				<FontAwesomeIcon icon={faSearch} className={`mx-4 ${focused && "text-primary"}`} />
				<input
					ref={inputRef}
					type="text"
					placeholder="Search twitter"
					className="bg-transparent focus:outline-none flex-full"
					onChange={(e) => setState({ ...state, search: e.target?.value?.trimStart() || "" })}
					value={state.search}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				{!!state.search && (
					<FontAwesomeIcon
						icon={faTimesCircle}
						className="text-primary text-2xl"
						onClick={() => setState((state) => ({ ...state, search: "", users: [] }))}
					/>
				)}
			</div>
			{state.loading && (
				<div className="absolute bg-white shadow-offset-0 w-309px h-12">
					<LoadingIndicator />
				</div>
			)}
			{state.users.length > 0 && (
				<ul className="absolute bg-white shadow-offset-0 w-309px">
					{state.users.map((u) => (
						<li
							key={u.id}
							className="p-3 border-b hover:bg-gray-50 transition-colors cursor-pointer"
							onClick={() => onUserClick(u.username)}
						>
							{!!u.followedByMe && (
								<div className="font-bold text-gray-500 text-sm ml-5 mb-1">
									<FontAwesomeIcon icon={faUser} className="mr-3" />
									Following
								</div>
							)}
							<div className="flex  ">
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
		</React.Fragment>
	);
};

export default UserSearch;
