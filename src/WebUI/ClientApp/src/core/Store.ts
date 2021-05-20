import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, compose, createStore } from "redux";
import { PostsReducer } from "./reducers/PostsReducer";
import { FollowsReducer } from "./reducers/FollowsReducer";
import { ProfileReducer } from "./reducers/ProfileReducer";
import { LayoutReducer } from "./reducers/LayoutReducer";

const reducers = combineReducers({
	posts: PostsReducer,
	profile: ProfileReducer,
	follows: FollowsReducer,
	layout: LayoutReducer,
});

const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.() || compose);

export default store;

export type StoreType = ReturnType<typeof reducers>;
export const useReduxState: TypedUseSelectorHook<StoreType> = useSelector;
