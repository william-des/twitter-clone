import { ADD_NOTIFICATIONS, NotificationsActions } from "../actions/NotificationsActions";
import { INotificationDto } from "../WebApiClient";

export interface NotificationsState {
	all: INotificationDto[];
	totalUnread: number;
}

const initialState: NotificationsState = {
	all: [],
	totalUnread: 0,
};

export const NotificationsReducer = (
	state: NotificationsState = initialState,
	action: NotificationsActions
): NotificationsState => {
	switch (action.type) {
		case ADD_NOTIFICATIONS:
			return {
				...state,
				totalUnread: action.payload.totalUnread,
				all: [...state.all, ...action.payload.notifications],
			};
		default:
			return state;
	}
};
