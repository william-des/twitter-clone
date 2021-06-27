import { IConversationDto } from "../WebApiClient";

export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export interface SetConversations {
	type: typeof SET_CONVERSATIONS;
	payload: IConversationDto[];
}
export const setConversations = (payload: IConversationDto[]) => ({
	type: SET_CONVERSATIONS,
	payload,
});

export type ConversationsActions = SetConversations;
