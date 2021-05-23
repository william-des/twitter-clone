import { faImages, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addProfile } from "../core/actions/ProfileActions";
import { IProfileUserDto, MediasClient, UpdateUserCommand, UsersClient } from "../core/WebApiClient";
import Header from "../shared/Header";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import UserPicture from "./UserPicture";
import UserProfileBanner from "./UserProfileBanner";

interface EditProfileModalProps {
	onClose: VoidFunction;
	user: IProfileUserDto;
}

const EditProfileModal: React.FC<EditProfileModalProps> = (props) => {
	const [state, setState] = useState({
		fullName: props.user.fullName || "",
		description: props.user.description || "",
		location: props.user.location || "",
		website: props.user.website || "",
		bannerId: props.user.bannerId,
		pictureId: props.user.pictureId,
	});

	const handleChange = (name: string, value: string) => setState((state) => ({ ...state, [name]: value }));

	const PictureButton = (props: { onClick: VoidFunction }) => {
		return (
			<div className="flex justify-center items-center h-full w-full overflow-hidden ">
				<div className="p-10 cursor-pointer" onClick={props.onClick}>
					<FontAwesomeIcon className="text-white text-xl " icon={faImages} />
				</div>
			</div>
		);
	};

	const dispatch = useDispatch();
	const onSave = async () => {
		const client = new UsersClient();
		await client.update(new UpdateUserCommand(state));
		const updated = await client.getUserProfile(props.user.username);
		dispatch(addProfile(props.user.username, updated));
		props.onClose();
	};

	const bannerInputRef = useRef<HTMLInputElement>(null);
	const onBannerClick = () => bannerInputRef.current?.click();
	const pictureInputRef = useRef<HTMLInputElement>(null);
	const onPictureClick = () => pictureInputRef.current?.click();

	const onFileChange = async (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
		if (e?.target?.files?.length < 1) return;
		const file = e.target.files[0];

		const mediaId = await new MediasClient().create({ fileName: file.name, data: file });
		setState((state) => ({ ...state, [name]: mediaId }));
	};

	return (
		<Modal className="h-600px overflow-hidden">
			<Header
				title="Edit profile"
				leftButton={{ icon: faTimes, onClick: props.onClose }}
				rightButton={{ text: "Save", onClick: onSave }}
			/>
			<div className="flex flex-col flex-grow overflow-y-auto">
				<UserProfileBanner bannerId={state.bannerId}>
					<PictureButton onClick={onBannerClick} />
				</UserProfileBanner>
				<UserPicture
					pictureId={state.pictureId}
					className="h-36 w-36 profile-picture border-4 ml-4 border-white z-10 flex-shrink-0"
				>
					<PictureButton onClick={onPictureClick} />
				</UserPicture>
				<div className="p-4">
					<Input name="fullName" label="Name" value={state.fullName} onChange={handleChange} maxLength={50} />
					<Input
						name="description"
						label="Bio"
						value={state.description}
						onChange={handleChange}
						maxLength={160}
					/>
					<Input
						name="location"
						label="Location"
						value={state.location}
						onChange={handleChange}
						maxLength={30}
					/>
					<Input
						name="website"
						label="Website"
						value={state.website}
						onChange={handleChange}
						maxLength={100}
					/>
				</div>
				<input
					type="file"
					className="hidden"
					accept=".png,.jpg,.jpeg,image/jpeg,image/png"
					ref={bannerInputRef}
					onChange={(e) => onFileChange("bannerId", e)}
				/>
				<input
					type="file"
					className="hidden"
					accept=".png,.jpg,.jpeg,image/jpeg,image/png"
					ref={pictureInputRef}
					onChange={(e) => onFileChange("pictureId", e)}
				/>
			</div>
		</Modal>
	);
};

export default EditProfileModal;
