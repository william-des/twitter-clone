import {
	ADD_POSTS,
	ADD_RE_POST,
	ADD_USER_POSTS,
	PostsActions,
	REMOVE_RE_POST,
	SET_POSTS_LOADING,
	SET_POST_LIKED,
} from "../actions/PostsActions";
import { IPostDto } from "../WebApiClient";

export interface PostsState {
	all: IPostDto[];
	byUser: { [id: number]: IPostDto[] };
	rePosted: Number[];
	rePosts: { [id: number]: number };
	loading: boolean;
}

const initialState: PostsState = {
	all: [],
	byUser: {},
	rePosted: [],
	rePosts: {},
	loading: false,
};

export const PostsReducer = (state: PostsState = initialState, action: PostsActions): PostsState => {
	switch (action.type) {
		case ADD_POSTS:
			return {
				...state,
				all: [
					...state.all.filter((p) => !action.payload.find((updated) => updated.id == p.id)),
					...action.payload,
				],
				rePosted: [
					...state.rePosted,
					...action.payload.filter((p) => !state.rePosted.includes(p.id) && p.rePostedByMe).map((p) => p.id),
				],
				rePosts: {
					...state.rePosts,
					...action.payload.reduce((rePosts, post) => ({ ...rePosts, [post.id]: post.likes }), {}),
				},
				loading: false,
			};
		case ADD_USER_POSTS:
			const existingPosts = (state.byUser[action.payload.userId] || []).filter(
				(p) => !action.payload.posts.find((updated) => updated.id == p.id)
			);
			return {
				...state,
				byUser: {
					...state.byUser,
					[action.payload.userId]: [...existingPosts, ...action.payload.posts],
				},
			};
		case SET_POST_LIKED:
			const index = state.all.findIndex((p) => p.id == action.payload.postId);
			if (index == -1) return state;
			return {
				...state,
				all: [
					...state.all.slice(0, index),
					{
						...state.all[index],
						likedByMe: action.payload.liked,
						likes: (state.all[index].likes || 0) + (action.payload.liked ? 1 : -1),
					},
					...state.all.slice(index + 1),
				],
			};
		case ADD_RE_POST:
			if (state.rePosted.includes(action.payload)) return state;
			return {
				...state,
				rePosted: [...state.rePosted, action.payload],
				rePosts: { ...state.rePosts, [action.payload]: state.rePosts[action.payload] + 1 },
			};
		case REMOVE_RE_POST:
			return {
				...state,
				rePosted: state.rePosted.filter((r) => r != action.payload),
				rePosts: { ...state.rePosts, [action.payload]: state.rePosts[action.payload] - 1 },
			};
		case SET_POSTS_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
