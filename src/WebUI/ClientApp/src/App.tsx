import React from "react";
import { Route, Switch } from "react-router";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import { Layout } from "./layout/Layout";
import { CreateAccount } from "./account/CreateAccount";

import "./styles.css";
import Feed from "./feed/Feed";
export const App: React.FC = () => {
	return (
		<Switch>
			<AuthorizeRoute path="/create-account" component={CreateAccount} />
			<Route path="/">
				<Layout>
					<Route exact path="/" component={Feed} />
					<Route path="/counter" component={Counter} />
					<Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
				</Layout>
			</Route>
		</Switch>
	);
};
