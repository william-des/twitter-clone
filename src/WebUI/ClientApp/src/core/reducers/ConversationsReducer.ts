import { SET_CONVERSATIONS as SET_CONVERSATIONS, ConversationsActions } from "../actions/ConversationsActions";
import { IConversationDto } from "../WebApiClient";

export interface ConversationsState {
    all?: IConversationDto[]
}

const initialState: ConversationsState = {};

export const ConversationsReducer = (state: ConversationsState = initialState, action: ConversationsActions): ConversationsState => {
    switch (action.type) {
        case SET_CONVERSATIONS:
            return {
                ...state,
                all: action.payload
            };
        default:
            return state;
    }
};
