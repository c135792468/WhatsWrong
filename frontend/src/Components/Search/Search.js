import React, { Component } from 'react';
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
	}

	render(){
		return(
			<div className="Search">
				<h3>WHAT'S WRONG?</h3>
				<input className="text" type="text" name="searchKey" placeholder="Type in body part..." onChange={this.handleSearchKey.bind(this)} value={this.state.data.searchKey}/> <br/>
				<select onChange={this.handleGender.bind(this)} value={this.state.data.gender}>
				  	<option value="" selected disabled hidden id="defaultValue">Gender</option>
				  	<option value="Male">Male</option>
  					<option value="Female">Female</option>
				</select><br/>
				<select onChange={this.handleAge.bind(this)} value={this.state.data.age}>
				  	<option value="" selected disabled hidden id="defaultValue">Age</option>
				  	<option value="1">1</option>
  					<option value="2">2</option>
  					<option value="3">3</option>
  					<option value="4">4</option>
  					<option value="5">5</option>
  					<option value="6">6</option>
  					<option value="7">7</option>
  					<option value="8">8</option>
				</select><br/>
				<input type="submit" value="Search" onClick={this.handleSubmit.bind(this)} /> <br/>
			</div>
		);
	}
}

export default Search;
