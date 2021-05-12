import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, compose, createStore } from "redux";
import { PostReducer } from "../feed/PostReducer";

const reducers = combineReducers({ posts: PostReducer });

const store = createStore(reducers, (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose);

export default store;

export type StoreType = ReturnType<typeof reducers>;
export const useReduxState: TypedUseSelectorHook<StoreType> = useSelector;
