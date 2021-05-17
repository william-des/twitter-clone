import { IUserProfileVM } from "../WebApiClient";
import { ProfileActions, ADD_PROFILE as ADD_PROFILE, SET_PROFILE_LOADING } from "../actions/ProfileActions";

export interface ProfileState {
	all: {[username: string]: IUserProfileVM | undefined};
	loading: boolean;
}

const initialState: ProfileState = {
	all: {},
	loading: false,
};

export const ProfileReducer = (state: ProfileState = initialState, action: ProfileActions): ProfileState => {
	switch (action.type) {
		case ADD_PROFILE:
			return { ...state, all: {...state.all, [action.payload.username]: action.payload.profile}, loading: false };
		case SET_PROFILE_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
