import { IPostDto } from "../WebApiClient";
import { ADD_POST, PostActions, SET_POSTS } from "../actions/PostActions";

export interface PostState {
	all: IPostDto[];
}

const initialState: PostState = {
	all: [],
};

export const PostReducer = (state: PostState = initialState, action: PostActions): PostState => {
	switch (action.type) {
		case SET_POSTS:
			return { ...state, all: action.payload };
		case ADD_POST:
			return { ...state, all: [action.payload, ...state.all] };
		default:
			return state;
	}
};
