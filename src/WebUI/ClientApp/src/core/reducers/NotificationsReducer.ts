import {
	ADD_NOTIFICATION,
	ADD_NOTIFICATIONS,
	MARK_AS_READ,
	NotificationsActions,
} from "../actions/NotificationsActions";
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
		case ADD_NOTIFICATION:
			if (state.all.find((n) => n.id == action.payload.id)) return state;
			return {
				...state,
				totalUnread: state.totalUnread + 1,
				all: [action.payload, ...state.all],
			};
		case ADD_NOTIFICATIONS:
			return {
				...state,
				totalUnread: action.payload.totalUnread,
				all: [...state.all, ...action.payload.notifications],
			};
		case MARK_AS_READ:
			const index = state.all.findIndex((n) => n.id == action.payload);
			if (index == -1) return state;
			return {
				...state,
				totalUnread: state.totalUnread - 1,
				all: [...state.all.slice(0, index), { ...state.all[index], read: true }, ...state.all.slice(index + 1)],
			};
		default:
			return state;
	}
};
