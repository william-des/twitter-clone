import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import MainContainer from "../layout/MainContainer";
import UserPicture from "./UserPicture";
import { IPostDto, PostsClient, UsersClient } from "../core/WebApiClient";
import { useDispatch } from "react-redux";
import { useReduxState } from "../core/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt, faLink, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import PostCard from "../feed/PostCard";
import FollowButton from "./FollowButton";
import authService from "../auth/AuthorizeService";
import { addProfile, setProfileLoading } from "../core/actions/ProfileActions";
import Button from "../shared/Button";
import EditProfileModal from "./EditProfileModal";
import UserProfileBanner from "./UserProfileBanner";
import LinkParser from "../feed/LinkParser";
import InfiniteScroll from "react-infinite-scroll-component";
import { addUserPosts } from "../core/actions/PostsActions";
import LoadingIndicator from "../shared/LoadingIndicator";
import CertifiedBadge from "../shared/CertifiedBadge";

const UserProfile: React.FC = () => {
	const { username } = useParams() as any;

	const history = useHistory();

	const dispatch = useDispatch();
	const state = useReduxState((state) => ({ loading: state.profile.loading, profile: state.profile.all[username] }));

	const userId = state?.profile?.user?.id;
	const posts = useReduxState((state) => state.posts.byUser[userId]);
	const [hasMore, setHasMore] = useState(true);

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

	const loadPosts = async () => {
		if (!userId) return;
		const beforeId = !!posts?.length ? posts[posts.length - 1].id : undefined;
		const count = 20;
		const otherPosts = await new PostsClient().getUserPosts(userId, beforeId, count);
		dispatch(addUserPosts(userId, otherPosts));
		setHasMore(otherPosts.length >= count);
	};
	useEffect(() => {
		setHasMore(true);
		loadPosts();
	}, [userId]);

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
			subtitle={state?.profile?.postsCount > 0 && `${state?.profile?.postsCount} posts`}
			leftButton={{ icon: faArrowLeft, onClick: () => history.push("") }}
		>
			{!!showEditModal && !!state.profile?.user && (
				<EditProfileModal onClose={() => setShowEditModal(false)} user={state.profile.user} />
			)}
			<div className="flex">
				<div className="w-full ">
					<UserProfileBanner bannerId={state?.profile?.user?.bannerId} />
					<div className="p-4">
						<div className="flex align-top">
							<UserPicture
								pictureId={state?.profile?.user?.pictureId}
								className="h-36 w-36 profile-picture border-4 border-white z-10"
							/>
							{!!state?.profile?.user?.id &&
								(state.profile.user.id != myId ? (
									<FollowButton
										userId={state.profile.user.id}
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
						<h3 className="text-xl font-bold leading-1">
							{state?.profile?.user?.fullName || `@${username}`}
							{!!state?.profile?.user?.isCertified && (
								<CertifiedBadge />
							)}
						</h3>
						{state?.profile?.user?.username && (
							<h4 className="leading-none text-gray-500">{`@${username}`}</h4>
						)}
						{!!state?.profile?.user?.description && (
							<p className="mt-2">
								<LinkParser>{state.profile.user.description}</LinkParser>
							</p>
						)}
						{(!!state.profile?.user?.created || !!state.profile?.user?.location) && (
							<div className="text-gray-500 mt-2">
								{!!state.profile?.user?.location && (
									<span className="mr-4">
										<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
										{state.profile.user.location}
									</span>
								)}
								{!!state.profile?.user?.website && (
									<span className="mr-4">
										<FontAwesomeIcon icon={faLink} className="mr-1" />
										<a className="text-primary hover:underline" href={state.profile.user.website}>
											{state.profile.user.website}
										</a>
									</span>
								)}
								{!!state.profile?.user?.created && (
									<span className="mr-4">
										<FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
										Joined{" "}
										{state.profile.user.created.toLocaleDateString("en-US", {
											month: "long",
											year: "numeric",
										})}
									</span>
								)}
							</div>
						)}
						{!!state.profile && (
							<div className="mt-2">
								<span className="font-bold">{state.profile?.followedCount}</span>
								<span className="text-gray-500 mr-4"> Following</span>
								<span className="font-bold">{state.profile?.followersCount}</span>
								<span className="text-gray-500"> Followers</span>
							</div>
						)}
					</div>
					<div className="w-full flex border-b">
						{state.profile?.user?.username && (
							<React.Fragment>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${state.profile.user.username}`}
									exact
								>
									Tweets
								</NavLink>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${state.profile.user.username}/with-replies`}
								>
									Tweets & Replies
								</NavLink>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${state.profile.user.username}/media`}
								>
									Media
								</NavLink>
								<NavLink
									className="text-gray-500 p-3 font-bold flex-grow text-center"
									activeClassName="border-primary border-b-2 text-primary"
									to={`/${state.profile.user.username}/likes`}
								>
									Likes
								</NavLink>
							</React.Fragment>
						)}
					</div>
					{!state.loading && !state.profile && (
						<p className="text-center mt-12">
							<span className="text-xl font-bold">This account doesn't exist</span>
							<br />
							<span className="text-gray-400 mt-2 text-md">Try searching for another.</span>
						</p>
					)}
					<InfiniteScroll
						dataLength={posts?.length || 0}
						next={loadPosts}
						hasMore={!!state.profile && hasMore}
						loader={<LoadingIndicator />}
					>
						{!!posts && posts.map(renderPost)}
					</InfiniteScroll>
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
