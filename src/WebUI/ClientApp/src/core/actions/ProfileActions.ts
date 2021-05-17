import { IUserProfileVM } from "../WebApiClient";

export const ADD_PROFILE = "ADD_PROFILE";
export interface SetProfile {
	type: typeof ADD_PROFILE;
	payload: {
		username: string;
		profile: IUserProfileVM;
	};
}
export const addProfile = (username: string, profile: IUserProfileVM) => ({
	type: ADD_PROFILE,
	payload: { username, profile },
});

export const SET_PROFILE_LOADING = "SET_PROFILE_LOADING";
export interface SetProfileLoading {
	type: typeof SET_PROFILE_LOADING;
	payload: boolean;
}
export const setProfileLoading = (loading: boolean = true) => ({ type: SET_PROFILE_LOADING, payload: loading });

export type ProfileActions = SetProfile | SetProfileLoading;
