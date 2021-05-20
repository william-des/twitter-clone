export const SET_SCROLL_ENABLE = "SET_SCROLL_ENABLE";

interface SetScrollEnable {
	type: typeof SET_SCROLL_ENABLE;
	payload: boolean;
}

export const setScrollEnable = (enable: boolean) => ({ type: SET_SCROLL_ENABLE, payload: enable });

export type LayoutActions = SetScrollEnable;
