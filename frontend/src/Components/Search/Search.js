import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			data: {
				searchKey: '',
				gender: '',
				age: '',
			}
		};
	}

	handleSearchKey(event) {
		const searchKey = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				searchKey
			}
		})
	}

	handleGender(event) {
		const gender = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				gender
			}
		})
	}

	handleAge(event) {
		const age = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				age
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("Search Key: " + this.state.data.searchKey);
		console.log("Gender: " + this.state.data.gender);
		console.log("Age: " + this.state.data.age);

		var request = require('axios');
		axios.post('http://18.191.248.57:80', {'t1': this.state.data.searchKey})
			.then(function (response) {
				console.log(response);
				var obj = JSON.stringify(response)
				console.log(obj);
			})
			.catch(function (error) {
				console.log(error);
			}); 
	}

	render(){
		return(
			<div className="Search">
				<h1 id="search-title">WHAT'S WRONG?</h1>
				<input className="text" id="search-input" type="text" placeholder="Type in body part..." onChange={this.handleSearchKey.bind(this)} value={this.state.data.searchKey}/> <br/>
				<div id="gender-age">
					<select id="gender-input" onChange={this.handleGender.bind(this)} value={this.state.data.gender}>
					  	<option value="" selected disabled hidden id="defaultValue">Gender</option>
					  	<option value="Male">Male</option>
	  					<option value="Female">Female</option>
					</select><br/>
					<input className="text" id="age-input" type="text" placeholder="Age" onChange={this.handleAge.bind(this)} value={this.state.data.age} />
				</div>
				<input id="search-button" type="submit" value="SEARCH" onClick={this.handleSubmit.bind(this)} /> <br/>
				<button><Link to="/symptoms">Symptoms Page</Link></button>
			</div>
		);
	}
}

export default Search;
