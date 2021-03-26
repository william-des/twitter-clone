import React, { Component } from "react";
import { WeatherForecast, WeatherForecastClient } from "../services/WebApiClient";

export class FetchData extends Component<any, any> {
	static displayName = FetchData.name;

	constructor(props) {
		super(props);
		this.state = { forecasts: [], loading: true };
	}

	componentDidMount() {
		this.populateWeatherData();
	}

	static renderForecastsTable(forecasts: WeatherForecast[]) {
		return (
			<table className="table table-striped" aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Date</th>
						<th>Temp. (C)</th>
						<th>Temp. (F)</th>
						<th>Summary</th>
					</tr>
				</thead>
				<tbody>
					{forecasts.map((forecast: WeatherForecast) => (
						<tr key={forecast.date.getTime()}>
							<td>{forecast.date.toLocaleDateString()}</td>
							<td>{forecast.temperatureC}</td>
							<td>{forecast.temperatureF}</td>
							<td>{forecast.summary}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading ? (
			<p>
				<em>Loading...</em>
			</p>
		) : (
			FetchData.renderForecastsTable(this.state.forecasts)
		);

		return (
			<div>
				<h1 id="tabelLabel">Weather forecast</h1>
				<p>This component demonstrates fetching data from the server.</p>
				{contents}
			</div>
		);
	}

	async populateWeatherData() {
		const data = await new WeatherForecastClient().get();
		console.log(data);
		this.setState({ forecasts: data, loading: false });
	}
}
