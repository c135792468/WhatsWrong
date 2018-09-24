import React, { Component } from 'react';
import './styles.css';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			searchKey: '',
			gender: '',
			age: '',
		};
	}

	onChange(event) {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		})
	}

	onSubmit(event) {
		event.preventDefault();
		console.log("Search Key: " + this.state.searchKey);
		console.log("Gender: " + this.state.gender);
		console.log("Age: " + this.state.age);
	}

	render(){
		return(
			<div className="Search">
				<h3>WHAT'S WRONG?</h3>
				<form>
					<input className="text" type="text" name="searchKey" placeholder="Type in body part..." onChange={this.onChange.bind(this)} value={this.state.searchKey}/><br/>
					<select onChange={this.onChange.bind(this)} value={this.state.gender}>
				  		<option value="" selected disabled hidden id="defaultValue">Gender</option>
				  		<option value="Male">Male</option>
  						<option value="Female">Female</option>
					</select><br/>
					<select onChange={this.onChange.bind(this)} value={this.state.age}>
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
					<input type="sumbit" value="Search" onclick={this.onSubmit.bind(this)} /> <br/>
				</form>
			</div>
		);
	}
}

export default Search;
