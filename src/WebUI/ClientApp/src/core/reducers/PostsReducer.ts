import {
	ADD_LIKE,
	ADD_POSTS,
	ADD_RE_POST,
	ADD_USER_POSTS,
	PostsActions,
	REMOVE_RE_POST,
} from "../actions/PostsActions";
import { IPostDto } from "../WebApiClient";

export interface PostsState {
	all: IPostDto[];
	byUser: { [id: number]: IPostDto[] };
	rePosted: number[];
	rePosts: { [id: number]: number };
	liked: number[];
	likes: { [id: number]: number };
	hasMore: boolean;
}

const initialState: PostsState = {
	all: [],
	byUser: {},
	rePosted: [],
	rePosts: {},
	liked: [],
	likes: {},
	hasMore: true,
};

export const PostsReducer = (state: PostsState = initialState, action: PostsActions): PostsState => {
	switch (action.type) {
		case ADD_POSTS:
			return {
				...state,
				all: [
					...state.all.filter((p) => !action.payload.posts.find((updated) => updated.id == p.id)),
					...action.payload.posts,
				],
				rePosted: [
					...state.rePosted,
					...action.payload.posts
						.filter((p) => !state.rePosted.includes(p.id) && p.rePostedByMe)
						.map((p) => p.id),
				],
				rePosts: {
					...state.rePosts,
					...action.payload.posts.reduce((rePosts, post) => ({ ...rePosts, [post.id]: post.likes }), {}),
				},
				liked: [
					...state.liked,
					...action.payload.posts.filter((p) => !state.liked.includes(p.id) && p.likedByMe).map((p) => p.id),
				],
				likes: {
					...state.likes,
					...action.payload.posts.reduce((likes, post) => ({ ...likes, [post.id]: post.likes }), {}),
				},
				hasMore: action.payload.hasMore == undefined ? state.hasMore : action.payload.hasMore,
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
		case ADD_LIKE:
			if (state.liked.includes(action.payload)) return state;
			return {
				...state,
				liked: [...state.liked, action.payload],
				likes: { ...state.likes, [action.payload]: state.likes[action.payload] + 1 },
			};
		case REMOVE_RE_POST:
			return {
				...state,
				liked: state.liked.filter((r) => r != action.payload),
				likes: { ...state.likes, [action.payload]: state.likes[action.payload] - 1 },
			};
		default:
			return state;
	}
};
