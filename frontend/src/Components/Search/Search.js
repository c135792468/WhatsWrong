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

	// handleBool() {
	// 	if(this.state.data.title){
	// 		this.setState({
	// 			titleView: "Symptoms",
	// 		})
	// 	}
	// }

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
						arr.push(x.data[i].common_name);
						console.log(i + " " + arr[i]);
						this.handleSymptoms(arr[i]);
					}
				} else {
					for(var i = 0; i < x.data.length; i++) {
						arr.push(x.data[i].common_name);
						console.log(i + " " + arr[i]);
						this.handleSymptoms(arr[i]);
					}
				}

				this.handleMinimize();
				// this.handleBool();

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
				<div>
					<ul>
						{this.state.data.symptoms.map((item,index) => 
							<li key={index}>{item}</li>
						)}
					</ul>
				</div>
				<div id={this.state.symptomsView}>
					<h3 id="apply-title">Check all that apply</h3>
					<div id="symptoms-list">
						<input class="symptom" type="checkbox" name="symptom1" value="symptom1" /> Symptom 1<br/>
						<input class="symptom" type="checkbox" name="symptom2" value="symptom2" /> Symptom 2<br/>
						<input class="symptom" type="checkbox" name="symptom3" value="symptom3" /> Symptom 3<br/>
						<input class="symptom" type="checkbox" name="symptom4" value="symptom4" /> Symptom 4<br/>
						<input class="symptom" type="checkbox" name="symptom5" value="symptom5" /> Symptom 5<br/>
						<input class="symptom" type="checkbox" name="symptom6" value="symptom6" /> Symptom 6<br/>
						<input class="symptom" type="checkbox" name="symptom7" value="symptom7" /> Symptom 7<br/>
						<input class="symptom" type="checkbox" name="symptom8" value="symptom8" /> Symptom 8<br/>
						<input class="symptom" type="checkbox" name="symptom9" value="symptom9" /> Symptom 9<br/>
						<input class="symptom" type="checkbox" name="symptom10" value="symptom10" /> Symptom 10<br/>
					</div>
					<input id="submit-button" type="submit" value="Submit" onClick={this.handleSubmit.bind(this)} /> <br/>
				</div>
				<button><Link to="/symptoms">Symptoms Page</Link></button>
			</div>
		);
	}
}

export default Search;
