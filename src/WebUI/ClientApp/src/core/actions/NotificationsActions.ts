import { INotificationsVM } from "../WebApiClient";

export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export interface AddNotification {
	type: typeof ADD_NOTIFICATIONS;
	payload: INotificationsVM;
}
export const addNotifications = (vm: INotificationsVM) => ({
	type: ADD_NOTIFICATIONS,
	payload: vm,
});

export type NotificationsActions = AddNotification;
