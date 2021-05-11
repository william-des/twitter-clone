import React from "react";
import { Route, Switch } from "react-router";
import AuthorizeRoute from "./auth/AuthorizeRoute";
import ApiAuthorizationRoutes from "./auth/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./auth/ApiAuthorizationConstants";
import { Layout } from "./layout/Layout";
import { CreateAccount } from "./account/CreateAccount";
import Feed from "./feed/Feed";
import "./styles.css";

export const App: React.FC = () => {
	return (
		<Switch>
			<AuthorizeRoute path="/create-account" component={CreateAccount} />
			<Route path="/">
				<Layout>
					<Route exact path="/" component={Feed} />
					<Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
				</Layout>
			</Route>
		</Switch>
	);
};
