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

export const MARK_AS_READ = "MARK_AS_READ";
export interface MarkAsRead {
	type: typeof MARK_AS_READ;
	payload: number;
}
export const markAsRead = (id: number) => ({ type: MARK_AS_READ, payload: id });

export type NotificationsActions = AddNotification | MarkAsRead;
