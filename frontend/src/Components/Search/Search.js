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
		console.log("Search Key: " + this.state.data.searchKey);
		console.log("Gender: " + this.state.data.gender);
		console.log("Age: " + this.state.data.age);

		// var request = require('axios');
		// axios.post('http://18.191.248.57:80/search', {'t1': this.state.data.searchKey})
		// 	.then(function (response) {
		// 		console.log(response);
		// 		var obj = JSON.stringify(response)
		// 		console.log(obj);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	}); 

		var arr = [];
		var j;
		var js =  {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
		//var post_data = JSON.parse(js);
		/* var request = require('axios');
			axios.get('http://127.0.0.1:5000/test')
			  .then(function (response) {
				console.log(response);
			  })
			  .catch(function (error) {
				console.log(error);
			  }); */
			  //'http://127.0.0.1:5000/search' 
			  
			var request = require('axios');
			axios.post('http://18.191.248.57:80/search',js)
			.then((response) => {
				
			
				console.log(response);
				//turn the response into a json formated string
				var obj = JSON.stringify(response);
				//turn the string into a json obj, react stores the json array sent by the server in a dictionary called
				//'data', so loop through data, not the response
				var x = JSON.parse(obj);
				j=obj;
				console.log(obj);
				//console.log(x.data[0]);
				
				for(var i =0; i<x.data.length; i++) {
					//console.log(x.data[i].common_name);
					arr.push(x.data[i].common_name);
					console.log(arr[i]);
					this.handleSymptoms(arr[i]);
					//console.log(x.data[i].SID)
				}
				
				//this.handleSearch(obj);
			
			
			
			
			//this.handleSymptoms('rrr');
			
			})

			// var js =  {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
		//var post_data = JSON.parse(js);
		/* var request = require('axios');
			axios.get('http://127.0.0.1:5000/test')
			  .then(function (response) {
				console.log(response);
			  })
			  .catch(function (error) {
				console.log(error);
			  }); */
			  //'http://127.0.0.1:5000/search'
			  
			// var request = require('axios');
			// axios.post('http://18.191.248.57:80/search',js)
			//   .then(function (response) {
			// 	console.log(response);
			// 	//turn the response into a json formated string
			// 	var obj = JSON.stringify(response);
			// 	//turn the string into a json obj, react stores the json array sent by the server in a dictionary called
			// 	//'data', so loop through data, not the response
			// 	var x = JSON.parse(obj);
			// 	j=x;
			// 	console.log(obj);
				//console.log(x.data[0]);
				
				/* for(var i =0; i<x.data.length; i++)
					{
						//console.log(x.data[i].common_name);
						arr.push(x.data[i].common_name);
						console.log(arr[i]);
						this.handleSymptoms(arr[i]);
						//console.log(x.data[i].SID)
						
						
					} */
					//this.handleSymptoms('kkk');
					// 
					//this.handleSymptoms=this.handleSymptoms.bind(this)
					//this.setState({symptoms:arr})
					//console.log("SYMP: " + this.state.data.symptoms);
				
			  // })
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
