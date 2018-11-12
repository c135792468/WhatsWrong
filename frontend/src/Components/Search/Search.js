import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			title: false,
			titleView: "originalTitleView",
			input: false,
			inputView: "originalInputView",
			genderAge: false,
			genderAgeView: "originalGenderAgeView",
			searchButtonView: "originalSearchButtonView",
			symptomsView: "emptySymptoms",
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

	handleMinimize() {
		if(this.state.data.symptoms.length > 0) {
			this.setState({
				title: true,
				titleView: "minimizedTitleView",
				input: true,
				inputView: "minimizedInputView",
				genderAge: true,
				genderAgeView: "minimizedGenderAgeView",
				searchButtonView: "minimizedSearchButtonView",
				symptomsView: "showingSymptoms",

			})
		} else {
			this.setState({
				title: false,
				titleView: "originialTitleView",
				input: false,
				inputView: "originalInputView",
				genderAge: false,
				genderAgeView: "originalGenderAgeView",
				searchButtonView: "originalSearchButtonView",
				symptomsView: "emptySymptoms",
			})
		}
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

		var symptomNames = [];
		var symptomSID = [];
		var j;
		var js = {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
			  
			var request = require('axios');
			axios.post('http://18.191.248.57:80/search',js)

			.then((response) => {
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);

				console.log(x);

				j = x;
				
				if (x.data.length > 10) {
					for(var i = 0; i < 10; i++) {
						symptomNames.push(x.data[i].common_name);
						symptomSID.push(x.data[i].SID);
						console.log(i + " " + symptomNames[i] + " " + symptomSID[i]);
						this.handleSymptoms(symptomNames[i]);
					}
				} else {
					for(var i = 0; i < x.data.length; i++) {
						symptomNames.push(x.data[i].common_name);
						console.log(i + " " + symptomNames[i]);
						this.handleSymptoms(symptomNames[i]);
					}
				}

				this.handleMinimize();

				console.log(this.state);
			})


			.catch((error) => {
				console.log(error);
			});
	}

	render(){
		return(
			<div className="Search">
				<h1 id={this.state.titleView}>WHAT'S WRONG?</h1>
				<input className="text" id={this.state.inputView} type="text" placeholder="Type in body part..." onChange={this.handleSearchKey.bind(this)} value={this.state.data.searchKey}/> <br/>
				<div id={this.state.genderAgeView}>
					<select id="gender-input" onChange={this.handleGender.bind(this)} value={this.state.data.gender}>
					  	<option value="" selected disabled hidden id="defaultValue">Gender</option>
					  	<option value="Male">Male</option>
	  					<option value="Female">Female</option>
					</select><br/>
					<input className="text" id="age-input" type="text" placeholder="Age" onChange={this.handleAge.bind(this)} value={this.state.data.age} />
				</div>
				<input id={this.state.searchButtonView} type="submit" value="SEARCH" onClick={this.handleSubmit.bind(this)} /> <br/>
				<div id={this.state.symptomsView}>
					<h3 id="apply-title">Check all that apply</h3>
					<div id="symptoms-list">
						{/*  <input class="symptom" type="checkbox" name="symptom1" value="symptom1" /> Symptom 1<br/> */}
						<ul>
							{this.state.data.symptoms.map((item,index) => 
								<li class="symptom" key={index}><input class="checkbox" type="checkbox"/>{item}</li>
							)}
						</ul>
					</div>
					<input id="submit-button" type="submit" value="Submit" onClick={this.handleSubmit.bind(this)} /> <br/>
				</div>
				<button><Link to="/symptoms">Symptoms Page</Link></button>
			</div>
		);
	}
}

export default Search;
