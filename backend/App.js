import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';
import Symptoms from './symptoms.js';
import Search from './search.js';
import Diagnosis from './diagnosis.js';
import { Switch, BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt } from 'react-router-dom'
//import Footer from "./Footer.js";
//Access-Control-Allow-Origin:*

class home_page extends Component {
	constructor() {
		super();

		this.state = {
			data: {
				searchKey: '',
				gender: '',
				age: '',
				search: '',
				symptoms:[]
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
		//var js = JSON.parse(post_data);
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
			axios.post('http://18.191.248.57:80/search', {'t1': this.state.data.searchKey})
			  .then(function (response) {
				console.log(response);
				var obj = JSON.stringify(response)
				console.log(obj);
			  })
			  .catch(function (error) {
				console.log(error);
			  }); 
			
			//this.state.data.ph="sdsds";
			this.setState({
			data: {
				...this.state.data,
				search: '1'
				}
			})
			
			//console.log(this.state.data.ph)
	/*
		var request = require('request');
		request('http://127.0.0.1:5000/test', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			console.log(response);
		  }
		})
		*/
		/*
		$.ajax({
            url: "http://127.0.0.1:5000/test",
            type: "GET",
			dataType: "json",
            success: function(resp){
                console.log("success");
				console.log(resp);
				obj = JSON.stringify(resp);
				console.log(obj);
				console.log(resp[0].author);
				
            },
			error: function(error){
				console.log(error);
				console.log("err");
			}
        });
		*/
	}

	render(){
		return(
			
			<Router>
			<div>
				<Route exact path = "/" component = {Search}/>
				<Route path = "/symptoms" component = {Symptoms}/>
				<Route path = "/diagnosis" component = {Diagnosis}/>
				<NavLink exact activeClassName="current" to='/'>home</NavLink>
				<NavLink exact activeClassName="current" to='/symptoms'>symptoms</NavLink>
				<NavLink exact activeClassName="current" to='/diagnosis'>diagnosis</NavLink>
			</div>	
			</Router>		
				
		);
	}


}
export default home_page;