import { IFollowsVM } from "../WebApiClient";

export const SET_FOLLOWS = "SET_FOLLOWS";
export interface SetFollows {
	type: typeof SET_FOLLOWS;
	payload: IFollowsVM;
}
export const setFollows = (payload?: IFollowsVM) => ({
	type: SET_FOLLOWS,
	payload,
});

export const ADD_FOLLOW = "ADD_FOLLOW";
export interface AddFollow {
	type: typeof ADD_FOLLOW;
	payload: number;
}
export const addFollow = (userId: number) => ({
	type: ADD_FOLLOW,
	payload: userId,
});

export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
export interface RemoveFollow {
	type: typeof REMOVE_FOLLOW;
	payload: number;
}
export const removeFollow = (userId: number) => ({
	type: REMOVE_FOLLOW,
	payload: userId,
});

export type FollowsActions = SetFollows | AddFollow | RemoveFollow;
