import React, { useEffect } from "react";
import { useParams } from "react-router";
import MainContainer from "../layout/MainContainer";
import UserPicture from "./UserPicture";
import { UsersClient } from "../core/WebApiClient";
import { useDispatch } from "react-redux";
import { addProfile, setProfileLoading } from "./ProfileActions";
import { useReduxState } from "../core/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const UserProfile: React.FC = () => {
	const { username } = useParams() as any;
	const dispatch = useDispatch();
	const state = useReduxState((state) => state.profile);
	const profile = state.all[username];

	const loadProfile = async () => {
		dispatch(setProfileLoading());
		try {
			const profile = await new UsersClient().getUserProfile(username);
			dispatch(addProfile(username, profile));
		} catch (error) {
			dispatch(setProfileLoading(false));
		}
	};

	useEffect(() => {
		loadProfile();
	}, [username]);

	return (
		<MainContainer title="Profile" subtitle={profile?.postsCount > 0 && `${profile.postsCount} posts`} backBtn>
			<div className="flex">
				<div className="w-full ">
					<div
						className="bg-gray-300 h-44 bg-cover bg-center"
						style={
							profile?.user?.bannerId && { backgroundImage: `url(api/medias/${profile.user.bannerId})` }
						}
					></div>
					<div className="p-4">
						<UserPicture
							pictureId={profile?.user?.pictureId}
							className="h-36 w-36 profile-picture border-4 border-white z-10"
						/>
						<h3 className="text-xl font-bold leading-1">{profile?.user?.fullName || `@${username}`}</h3>
						{profile?.user?.username && <h4 className="leading-none text-gray-500">{`@${username}`}</h4>}
						{profile?.user?.created && (
							<div className="text-gray-500 mt-2">
								<FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
								Joined{" "}
								{profile.user.created.toLocaleDateString("en-US", {
									month: "long",
									year: "numeric",
								})}
							</div>
						)}
						{profile && (
							<div className="mt-2">
								<span className="font-bold">{profile?.followedCount}</span>
								<span className="text-gray-500 mr-4"> Following</span>
								<span className="font-bold">{profile?.followersCount}</span>
								<span className="text-gray-500"> Followers</span>
							</div>
						)}
					</div>
					<div className="w-full flex border-b">
						{profile?.user?.username && (
							<React.Fragment>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${profile.user.username}`}
									exact
								>
									Tweets
								</NavLink>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${profile.user.username}/with-replies`}
								>
									Tweets & Replies
								</NavLink>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${profile.user.username}/media`}
								>
									Media
								</NavLink>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${profile.user.username}/likes`}
								>
									Likes
								</NavLink>
							</React.Fragment>
						)}
					</div>
					{state.loading && (
						<div className="p-4 flex justify-center">
							<FontAwesomeIcon icon={faSpinner} spin className="text-primary text-2xl" />
						</div>
					)}
					{!state.loading && !profile && (
						<p className="text-center mt-12">
							<span className="text-xl font-bold">This account doesn't exist</span>
							<br />
							<span className="text-gray-400 mt-2 text-md">Try searching for another.</span>
						</p>
					)}
				</div>
			</div>
		</MainContainer>
	);
};

export default UserProfile;
