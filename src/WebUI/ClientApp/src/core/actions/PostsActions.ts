import { IPostDto } from "../WebApiClient";

export const ADD_POSTS = "ADD_POSTS";
export interface AddPosts {
	type: typeof ADD_POSTS;
	payload: IPostDto[];
}
export const addPosts = (posts: IPostDto[]) => ({
	type: ADD_POSTS,
	payload: posts,
});

export const ADD_USER_POSTS = "ADD_USER_POSTS";
export interface AddUserPosts {
	type: typeof ADD_USER_POSTS;
	payload: {
		posts: IPostDto[];
		userId: number;
	};
}
export const addUserPosts = (userId: number, posts: IPostDto[]) => ({
	type: ADD_USER_POSTS,
	payload: { posts, userId },
});

export const SET_POSTS_LOADING = "SET_POSTS_LOADING";
export interface SetPostsLoading {
	type: typeof SET_POSTS_LOADING;
	payload: boolean;
}
export const setPostsLoading = (loading: boolean = true) => ({ type: SET_POSTS_LOADING, payload: loading });

export const SET_POST_LIKED = "SET_POST_LIKED";
export interface SetPostLiked {
	type: typeof SET_POST_LIKED;
	payload: {
		liked: boolean;
		postId: number;
	};
}
export const setPostLiked = (postId: number, liked: boolean) => ({ type: SET_POST_LIKED, payload: { postId, liked } });

export const ADD_RE_POST = "ADD_RE_POST";
export interface AddRePost {
	type: typeof ADD_RE_POST;
	payload: number;
}
export const addRePost = (postId: number) => ({
	type: ADD_RE_POST,
	payload: postId,
});

export const REMOVE_RE_POST = "REMOVE_RE_POST";
export interface RemoveRePost {
	type: typeof REMOVE_RE_POST;
	payload: number;
}
export const removeRePost = (postId: number) => ({
	type: REMOVE_RE_POST,
	payload: postId,
});

export type PostsActions = AddPosts | AddUserPosts | SetPostsLoading | SetPostLiked | AddRePost | RemoveRePost;
