import { LayoutActions, SET_SCROLL_ENABLE } from "../actions/LayoutActions";

export interface LayoutState {
	scrollEnable: boolean;
}

const initialState: LayoutState = {
	scrollEnable: true,
};

export const LayoutReducer = (state: LayoutState = initialState, action: LayoutActions): LayoutState => {
	switch (action.type) {
		case SET_SCROLL_ENABLE:
			return { ...state, scrollEnable: action.payload };
		default:
			return state;
	}
};
