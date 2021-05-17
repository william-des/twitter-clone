import { ADD_FOLLOW, FollowsActions, REMOVE_FOLLOW, SET_FOLLOWS } from "../actions/FollowsActions";

export interface FollowsState {
	followed: number[];
	followers: number[];
}

const initialState: FollowsState = {
	followed: [],
	followers: [],
};

export const FollowsReducer = (state: FollowsState = initialState, action: FollowsActions): FollowsState => {
	switch (action.type) {
		case SET_FOLLOWS:
			return {
				...state,
				followed: action.payload?.followedIds || [],
				followers: action.payload?.followerIds || [],
			};
		case ADD_FOLLOW:
			if (state.followed.includes(action.payload)) return state;
			return { ...state, followed: [...state.followed, action.payload] };
		case REMOVE_FOLLOW:
			return { ...state, followed: state.followed.filter((f) => f != action.payload) };
		default:
			return state;
	}
};
