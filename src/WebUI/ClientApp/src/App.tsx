import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import AuthorizeRoute from "./auth/AuthorizeRoute";
import ApiAuthorizationRoutes from "./auth/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./auth/ApiAuthorizationConstants";
import Layout from "./layout/Layout";
import { Register } from "./auth/Register";
import Feed from "./feed/Feed";
import { Provider, useDispatch } from "react-redux";
import store from "./core/Store";
import "./styles.css";
import UserProfile from "./user/UserProfile";
import authService from "./auth/AuthorizeService";
import { FollowsClient } from "./core/WebApiClient";
import { setFollows } from "./core/actions/FollowsActions";

const ApplicationRoutes: React.FC = (props) => {
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

	return <React.Fragment>{props.children}</React.Fragment>;
};

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Switch>
				<AuthorizeRoute path="/create-account" component={Register} />
				<Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
				<Route path="/">
					<ApplicationRoutes>
						<Layout>
							<Route exact path="/" component={Feed} />
							<Route path="/:username" component={UserProfile} />
						</Layout>
					</ApplicationRoutes>
				</Route>
			</Switch>
		</Provider>
	);
};
