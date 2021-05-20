import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import MainContainer from "../layout/MainContainer";
import UserPicture from "./UserPicture";
import { IPostDto, PostsClient, UsersClient } from "../core/WebApiClient";
import { useDispatch } from "react-redux";
import { useReduxState } from "../core/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt, faLink, faMapMarkerAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import PostCard from "../feed/PostCard";
import FollowButton from "./FollowButton";
import authService from "../auth/AuthorizeService";
import { addProfile, setProfileLoading } from "../core/actions/ProfileActions";
import Button from "../shared/Button";
import EditProfileModal from "./EditProfileModal";
import UserProfileBanner from "./UserProfileBanner";
import LinkParser from "../feed/LinkParser";

const UserProfile: React.FC = () => {
	const { username } = useParams() as any;

	const history = useHistory();

	const dispatch = useDispatch();
	const state = useReduxState((state) => state.profile);
	const profile = state.all[username];

	const [showEditModal, setShowEditModal] = useState(false);

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

	const [posts, setPosts] = useState<IPostDto[]>(undefined);
	const loadPosts = async () => {
		if (!profile?.user?.id) return;
		const posts = await new PostsClient().getUserPosts(profile.user.id);
		setPosts(posts);
	};
	useEffect(() => {
		loadPosts();
	}, [profile?.user?.id]);

	const [myId, setMyId] = useState(undefined);
	const loadUser = async () => {
		const user = await authService.getDomainUser();
		setMyId(user?.id);
	};
	useEffect(() => {
		loadUser();
	}, []);

	const renderPost = (post: IPostDto) => <PostCard {...post} key={post.id} />;

	return (
		<MainContainer
			title="Profile"
			subtitle={profile?.postsCount > 0 && `${profile.postsCount} posts`}
			leftButton={{ icon: faArrowLeft, onClick: history.goBack }}
		>
			{!!showEditModal && !!profile.user && (
				<EditProfileModal onClose={() => setShowEditModal(false)} user={profile.user} />
			)}
			<div className="flex">
				<div className="w-full ">
					<UserProfileBanner bannerId={profile?.user?.bannerId} />
					<div className="p-4">
						<div className="flex align-top">
							<UserPicture
								pictureId={profile?.user?.pictureId}
								className="h-36 w-36 profile-picture border-4 border-white z-10"
							/>
							{!!profile?.user?.id &&
								(profile.user.id != myId ? (
									<FollowButton
										userId={profile.user.id}
										className="px-4 py-2 ml-auto text-md mb-auto"
									/>
								) : (
									<Button
										className="px-4 py-2 ml-auto text-md mb-auto"
										light
										onClick={() => setShowEditModal(true)}
									>
										Edit profile
									</Button>
								))}
						</div>
						<h3 className="text-xl font-bold leading-1">{profile?.user?.fullName || `@${username}`}</h3>
						{profile?.user?.username && <h4 className="leading-none text-gray-500">{`@${username}`}</h4>}
						{!!profile?.user?.description && (
							<p className="mt-2">
								<LinkParser>{profile.user.description}</LinkParser>
							</p>
						)}
						{(!!profile?.user?.created || !!profile?.user?.location) && (
							<div className="text-gray-500 mt-2">
								{!!profile?.user?.location && (
									<span className="mr-4">
										<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
										{profile.user.location}
									</span>
								)}
								{!!profile?.user?.website && (
									<span className="mr-4">
										<FontAwesomeIcon icon={faLink} className="mr-1" />
										<a className="text-primary hover:underline" href={profile.user.website}>{profile.user.website}</a>
									</span>
								)}
								{!!profile?.user?.created && (
									<span className="mr-4">
										<FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
										Joined{" "}
										{profile.user.created.toLocaleDateString("en-US", {
											month: "long",
											year: "numeric",
										})}
									</span>
								)}
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
					{(state.loading || (!posts && profile)) && (
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
					{!!posts && posts.map(renderPost)}
					{posts?.length === 0 && (
						<p className="text-center mt-12 text-xl font-bold">
							<span className="text-xl font-bold">This account doesn't have any tweet yet</span>
						</p>
					)}
				</div>
			</div>
		</MainContainer>
	);
};

export default UserProfile;
