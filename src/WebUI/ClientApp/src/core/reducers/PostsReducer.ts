import {
	ADD_LIKE,
	ADD_NEW_POST,
	ADD_POSTS,
	ADD_POST_ANSWERS,
	ADD_RE_POST,
	ADD_USER_POSTS,
	PostsActions,
	REMOVE_LIKE,
	REMOVE_RE_POST,
} from "../actions/PostsActions";
import { IPostDto } from "../WebApiClient";

export interface PostsState {
	all: { [id: number]: IPostDto };
	byUser: { [id: number]: IPostDto[] };
	rePosted: number[];
	rePosts: { [id: number]: number };
	liked: number[];
	likes: { [id: number]: number };
	answers: { [id: number]: number };
	answersIds: { [id: number]: number[] };
	feed: number[];
}

const initialState: PostsState = {
	all: {},
	byUser: {},
	rePosted: [],
	rePosts: {},
	liked: [],
	likes: {},
	answers: {},
	answersIds: {},
	feed: [],
};

const updatedCountByPost = (state: PostsState, newPosts: IPostDto[], property: keyof IPostDto) => ({
	...state[property],
	...newPosts.reduce((countByPost, post) => ({ ...countByPost, [post.id]: post[property] }), {}),
});

const updatedPostsInformations = (state: PostsState, newPosts: IPostDto[]) => ({
	rePosted: [
		...state.rePosted,
		...newPosts.filter((p) => !state.rePosted.includes(p.id) && p.rePostedByMe).map((p) => p.id),
	],
	liked: [...state.liked, ...newPosts.filter((p) => !state.liked.includes(p.id) && p.likedByMe).map((p) => p.id)],
	rePosts: updatedCountByPost(state, newPosts, "rePosts"),
	likes: updatedCountByPost(state, newPosts, "likes"),
	answers: updatedCountByPost(state, newPosts, "answers"),
});

export const PostsReducer = (state: PostsState = initialState, action: PostsActions): PostsState => {
	switch (action.type) {
		case ADD_POSTS:
			return {
				...state,
				all: {
					...state.all,
					...action.payload.posts.reduce((posts, post) => ({ ...posts, [post.id]: post }), {}),
				},
				feed: !!action.payload.inFeed ? [...state.feed, ...action.payload.posts.map(p => p.id)] : state.feed,
				...updatedPostsInformations(state, action.payload.posts),
			};
		case ADD_NEW_POST:
			const newState = { ...state, all: { ...state.all, [action.payload.id]: action.payload } };

			return !!action.payload.answerToId ? ({
				...newState,
				answersIds: { ...newState.answersIds, [action.payload.answerToId]: [...(newState.answersIds[action.payload.answerToId] || []), action.payload.id] },
				answers: { ...newState.answers, [action.payload.answerToId]: (newState.answers[action.payload.answerToId] || 0) + 1 }
			}) : ({ ...newState, feed: [...newState.feed, action.payload.id] })
		case ADD_POST_ANSWERS:
			return {
				...state,
				all: {
					...state.all,
					...action.payload.answers.reduce((posts, post) => ({ ...posts, [post.id]: post }), {}),
				},
				answersIds: { ...state.answersIds, [action.payload.postId]: [...(state.answersIds[action.payload.postId] || []), ...action.payload.answers.map(a => a.id)] },
				...updatedPostsInformations(state, action.payload.answers),
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
				...updatedPostsInformations(state, action.payload.posts),
			};
		case ADD_RE_POST:
			if (state.rePosted.includes(action.payload)) return state;
			return {
				...state,
				rePosted: [...state.rePosted, action.payload],
				rePosts: { ...state.rePosts, [action.payload]: state.rePosts[action.payload] + 1 },
			};
		case REMOVE_RE_POST:
			if (!state.rePosted.includes(action.payload)) return state;
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
		case REMOVE_LIKE:
			if (!state.liked.includes(action.payload)) return state;
			return {
				...state,
				liked: state.liked.filter((l) => l != action.payload),
				likes: { ...state.likes, [action.payload]: state.likes[action.payload] - 1 },
			};
		default:
			return state;
	}
};
