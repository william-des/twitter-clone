import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import ApiAuthorizationRoutes from "./auth/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./auth/ApiAuthorizationConstants";
import Layout from "./layout/Layout";
import Feed from "./feed/Feed";
import { Provider, useDispatch } from "react-redux";
import store from "./core/Store";
import "./styles.css";
import UserProfile from "./user/UserProfile";
import authService from "./auth/AuthorizeService";
import { FollowsClient } from "./core/WebApiClient";
import { setFollows } from "./core/actions/FollowsActions";
import AuthorizeRoute from "./auth/AuthorizeRoute";
import PostAnswers from "./feed/PostAnswers";

const ApplicationRoutes: React.FC = () => {
	const dispatch = useDispatch();
	const loadFollows = async () => {
		let follows = undefined;
		const domainUser = await authService.getDomainUser();
		if (!!domainUser) {
			follows = await new FollowsClient().getUserFollows(domainUser.id);
		}
		dispatch(setFollows(follows));
	};
	useEffect(() => {
		loadFollows();
		const subscription = authService.subscribe(() => loadFollows());
		return () => {
			authService.unsubscribe(subscription);
		};
	});

	return (
		<Layout>
			<Route exact path="/" component={Feed} />
			<Route path="/status/:id" component={PostAnswers} />
			<Route path="/:username" exact component={UserProfile} />
		</Layout>
	);
};

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Switch>
				<Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
				<AuthorizeRoute path="/" component={ApplicationRoutes} />
			</Switch>
		</Provider>
	);
};
