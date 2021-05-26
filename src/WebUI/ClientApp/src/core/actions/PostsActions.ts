import { IPostDto } from "../WebApiClient";

export const ADD_POSTS = "ADD_POSTS";
export interface AddPosts {
	type: typeof ADD_POSTS;
	payload: {
		posts: IPostDto[];
		inFeed?: boolean;
	};
}
export const addPosts = (posts: IPostDto[], inFeed?: boolean) => ({
	type: ADD_POSTS,
	payload: {
		posts,
		inFeed
	},
});

export const ADD_NEW_POST = "ADD_NEW_POST";
export interface AddNewPost {
	type: typeof ADD_NEW_POST;
	payload: IPostDto;
}
export const addNewPost = (post: IPostDto) => ({
	type: ADD_NEW_POST,
	payload: post
})

export const ADD_POST_ANSWERS = "ADD_POST_ANSWERS";
export interface AddPostAnswers {
	type: typeof ADD_POST_ANSWERS;
	payload: {
		postId: number,
		answers: IPostDto[]
	};
}
export const addPostAnswers = (postId: number, answers: IPostDto[]) => ({
	type: ADD_POST_ANSWERS,
	payload: {
		postId,
		answers
	},
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

export const ADD_LIKE = "ADD_LIKE";
export interface AddLike {
	type: typeof ADD_LIKE;
	payload: number;
}
export const addLike = (postId: number) => ({
	type: ADD_LIKE,
	payload: postId,
});

export const REMOVE_LIKE = "REMOVE_LIKE";
export interface RemoveLike {
	type: typeof REMOVE_LIKE;
	payload: number;
}
export const removeLike = (postId: number) => ({
	type: REMOVE_LIKE,
	payload: postId,
});

export type PostsActions = AddPosts | AddNewPost | AddPostAnswers | AddUserPosts | AddRePost | RemoveRePost | AddLike | RemoveLike;
