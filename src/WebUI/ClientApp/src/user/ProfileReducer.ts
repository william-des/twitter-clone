import { IUserProfileVM } from "../core/WebApiClient";
import { ProfileActions, ADD_PROFILE as ADD_PROFILE, SET_PROFILE_LOADING } from "./ProfileActions";

export interface PostState {
	all: {[username: string]: IUserProfileVM | undefined};
	loading: boolean;
}

const initialState: PostState = {
	all: {},
	loading: false,
};

export const ProfileReducer = (state: PostState = initialState, action: ProfileActions): PostState => {
	switch (action.type) {
		case ADD_PROFILE:
			return { ...state, all: {...state.all, [action.payload.username]: action.payload.profile}, loading: false };
		case SET_PROFILE_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
