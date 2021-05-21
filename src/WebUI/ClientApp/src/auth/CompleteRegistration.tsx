import React, { useState } from "react";
import { useHistory } from "react-router";
import authService from "./AuthorizeService";
import { CreateUserCommand, ICreateUserCommand, UsersClient } from "../core/WebApiClient";

export const CompleteRegistration: React.FC = () => {
	const [state, setState] = useState<ICreateUserCommand>({ fullName: "", username: "" });
	const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
	const history = useHistory();

	const usersClient = new UsersClient();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const applicationUser = await authService.getUser();
		const command = new CreateUserCommand({ ...state, applicationUserId: applicationUser.sub });

		try {
			await usersClient.create(command);
			history.push("/");
		} catch (error) {
			if (error?.status == 400 && error?.response) {
				const response = JSON.parse(error?.response);
				setErrors(response?.errors || {});
			} else {
				throw error;
			}
		}
	};

	const renderErrors = (errors: string[]) =>
		errors.map((error, index) => (
			<div key={index} className="text-red-700">
				{error}
			</div>
		));

	return (
		<form className="max-w-screen-sm mx-auto flex-1 text-lg px-4" onSubmit={handleSubmit}>
			<h1 className="text-center font-semibold text-2xl my-3">Create your profile</h1>
			<input
				placeholder="Fullname"
				name="fullName"
				value={state.fullName}
				onChange={handleInputChange}
				className={`w-full border rounded border-gray-400 p-2 my-3 ${
					!!errors.FullName ? "border-red-700 text-red-700" : "border-gray-400"
				}`}
			/>
			{!!errors?.FullName && renderErrors(errors.FullName)}
			<input
				placeholder="Username"
				name="username"
				value={state.username}
				onChange={handleInputChange}
				className={`w-full border rounded border-gray-400 p-2 my-3 ${
					!!errors.Username ? "border-red-700 text-red-700" : "border-gray-400"
				}`}
			/>
			{!!errors?.Username && renderErrors(errors.Username)}
			<button type="submit" className="text-lg text-white bg-primary rounded-full w-full py-3 font-semibold my-3">
				Confirm
			</button>
		</form>
	);
};
