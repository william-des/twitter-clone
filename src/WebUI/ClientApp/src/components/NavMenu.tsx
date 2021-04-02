import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "./NavMenu.css";

export class NavMenu extends Component<any, any> {
	static displayName = NavMenu.name;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header>
				<Link to="/">TwitterClone</Link>
				<ul className="navbar-nav flex-grow">
					<li>
						<Link className="text-dark" to="/">
							Home
						</Link>
					</li>
					<li>
						<Link className="text-dark" to="/counter">
							Counter
						</Link>
					</li>
					<li>
						<Link className="text-dark" to="/fetch-data">
							Fetch data
						</Link>
					</li>
					<LoginMenu></LoginMenu>
				</ul>
			</header>
		);
	}
}
