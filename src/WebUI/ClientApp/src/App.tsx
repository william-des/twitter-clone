import React from "react";
import { Route, Switch } from "react-router";
import AuthorizeRoute from "./auth/AuthorizeRoute";
import ApiAuthorizationRoutes from "./auth/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./auth/ApiAuthorizationConstants";
import { Layout } from "./layout/Layout";
import { Register } from "./auth/Register";
import Feed from "./feed/Feed";
import { Provider } from "react-redux";
import store from "./core/Store";
import "./styles.css";
import UserProfile from "./user/UserProfile";

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Switch>
				<AuthorizeRoute path="/create-account" component={Register} />
				<Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
				<Route path="/">
					<Layout>
						<Route exact path="/" component={Feed} />
						<Route path="/:username" component={UserProfile} />
					</Layout>
				</Route>
			</Switch>
		</Provider>
	);
};
