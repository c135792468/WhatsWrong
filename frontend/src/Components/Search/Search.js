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
				search: '',
				symptoms: [],
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

	handleSymptoms(event) {
		this.setState({
			data: {
				...this.state.data,
				symptoms: [...this.state.data.symptoms, event]
			}	
		})
	}


	handleSearch(event) {
		this.setState({
			data: {
				search: event
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault();

		this.setState({
			data: {
				...this.state.data,
				symptoms: []
			}	
		})
		// console.log("Search Key: " + this.state.data.searchKey);
		// console.log("Gender: " + this.state.data.gender);
		// console.log("Age: " + this.state.data.age);

		var arr = [];
		var arrString = [];
		var j;
		var js =  {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
			  
			var request = require('axios');
			axios.post('http://18.191.248.57:80/search',js)

			.then((response) => {
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);

				console.log(x);

				j = x;
				
				for(var i = 0; i < x.data.length; i++)
				{
					arr.push(x.data[i].common_name);
					console.log(i + " " + arr[i]);
					this.handleSymptoms(arr[i]);
					console.log(this.state.data.symptoms.length)
				}
			})

			.catch((error) => {
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
				<div>
					<ul>
						{this.state.data.symptoms.map((item,index) => 
							<li key={index}>{item}</li>
						)}
					</ul>
				</div>
				<button><Link to="/symptoms">Symptoms Page</Link></button>
			</div>
		);
	}
}

export default Search;
