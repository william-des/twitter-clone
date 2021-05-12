import { IPostDto } from "../core/WebApiClient";

export const SET_POSTS = "SET_POSTS";
export interface SetPosts {
	type: typeof SET_POSTS;
	payload: IPostDto[];
}
export const setPosts = (payload: IPostDto[]): SetPosts => ({
	type: SET_POSTS,
	payload,
});

export const ADD_POST = "ADD_POST";
export interface AddPost {
	type: typeof ADD_POST;
	payload: IPostDto;
}
export const addPost = (payload: IPostDto): AddPost => ({
	type: ADD_POST,
	payload,
});

export type PostActions = SetPosts | AddPost;
