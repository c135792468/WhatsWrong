import React, { Component } from 'react';
import axios from 'axios';
import HowToUse from './HowToUse.js';
import Dictionary from './Dictionary.js';
import TeamContact from './TeamContact.js';
import './searchStyles.css';
import './symptomsStyles.css';
import './diagnosisStyles.css';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			titleView: "originalTitleView",
			inputView: "originalInputView",
			genderAgeView: "originalGenderAgeView",
			searchButtonView: "originalSearchButtonView",
			smartSearchButtonView: "originalSmartSearchButtonView",
			newSearchView: "emptyNewSearch",
			symptomsView: "emptySymptoms",
			diagnosisView: "emptyDiagnosis",
			dropdownView: "emptyDropdown",
			data: {
				searchKey: '',
				gender: '',
				age: '',
				symptoms: [],
				SID: [],
				diagnosesNames: [],
				diagnosesProbabilities: [],
				diagnosesHints: [],
			}
		};
	}

	// Saves the value of whatever the user is searching
	handleSearchKey(event) {
		const searchKey = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				searchKey
			}
		})
	}

	// Saves the gender of the user required by the API call in the Search page
	handleGender(event) {
		const gender = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				gender
			}
		})
	}

	// Saves the age of the user required by the API call in the Search page
	handleAge(event) {
		const age = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				age
			}
		})
	}

	// This function is used to see if any of the input fields are left empty by the user
	handleEmptyInput() {
		if (!this.state.data.searchKey || !this.state.data.gender || !this.state.data.age) {
			return true
		} else {
			return false
		}
	}

	// Pushes into array the symptom names given from the API call
	// This is used to display the symptoms to the user
	handleSymptoms(event) {
		this.setState({
			data: {
				...this.state.data,
				symptoms: [...this.state.data.symptoms, event]
			}	
		})
	}

	// Pushes into array the symptom ID numbers given from the API call
	// SID is used to send back the symptoms that apply to the user to get back a diagnosis
	handleSID(event) {
		this.setState({
			data: {
				...this.state.data,
				SID: [...this.state.data.SID, event]
			}	
		})
	}

	// This function allows for the class names of the different views to change
	// By doing this, we are allowing for certain fields to be minimized or to disappear with different CSS properties
	// Since everything is in one page, we need views such as the Search View to disappear when showing Symptoms View
	handleMinimizeSearch() {
		if(this.state.data.symptoms.length > 0) {
			this.setState({
				titleView: "minimizedTitleView",
				inputView: "minimizedInputView",
				genderAgeView: "minimizedGenderAgeView",
				searchButtonView: "minimizedSearchButtonView",
				smartSearchButtonView: "minimizedSmartSearchButtonView",
				newSearchView: "showingNewSearch",
				symptomsView: "showingSymptoms",
			})
		} else {
			this.setState({
				titleView: "originialTitleView",
				inputView: "originalInputView",
				genderAgeView: "originalGenderAgeView",
				searchButtonView: "originalSearchButtonView",
				smartSearchButtonView: "originalSmartSearchButtonView",
				newSearchView: "emptyNewSearch",
				symptomsView: "emptySymptoms",
			})
		}
	}

	// This function allows for the class names of the different views to change
	// By doing this, we are allowing for certain fields to be minimized or to disappear with different CSS properties
	// Since everything is in one page, we need views such as the Search View to disappear when showing Diagnosis View
	handleMinimizeSmartSearch() {
		if(this.state.data.diagnosesNames.length > 0) {
			this.setState({
				titleView: "minimizedTitleView",
				inputView: "minimizedInputView",
				genderAgeView: "minimizedGenderAgeView",
				searchButtonView: "minimizedSearchButtonView",
				smartSearchButtonView: "minimizedSmartSearchButtonView",
				newSearchView: "showingNewSearch",
				symptomsView: "emptySymptoms",
				diagnosisView: "showingDiagnosis",
			})
		} else {
			this.setState({
				titleView: "originialTitleView",
				inputView: "originalInputView",
				genderAgeView: "originalGenderAgeView",
				searchButtonView: "originalSearchButtonView",
				smartSearchButtonView: "originalSmartSearchButtonView",
				newSearchView: "emptyNewSearch",
				symptomsView: "showingSymptoms",
				diagnosisView: "emptyDiagnosis",
			})
		}
	}

	// Function that allows for Simple Search button to work
	handleSimpleSearch(event) {
		event.preventDefault();

		// Empty values of state for symptoms and SID so that we can continue to make new searches
		// This prevents the mistake of still using the data from previous searches
		if (!this.handleEmptyInput()){
			this.setState({
				data: {
					...this.state.data,
					symptoms: [],
					SID: [],
				}	
			})

			// Create local arrays to save the Symptom Names and Symptom IDs soon to be given from the API response
			var symptomNames = [];
			var symptomSID = [];

			// The API call only accepts objects with property 'search', 'gender', and 'age'.
			// These values are taken from the values that were saved using handleSearchKey, handleGender, and handleAge functions
			var js = {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
			
			// Axios is being used to make API Calls and we are sending the 'js' object
			var request = require('axios');
			axios.post('http://18.191.248.57:80/search', js)
				.then((response) => {
					// Using JSON.stringify and JSON.parse, we are able to take the individual values we need from the return object
					var obj = JSON.stringify(response);
					var x = JSON.parse(obj);
					
					// This if statement is used to ensure that we are getting back results
					if(x.data[0].SID !== "no_results"){
						// We are limiting the number of symptoms being saved to 10 to not overwhelm the user
						if (x.data.length > 10) {
							for(var i = 0; i < 10; i++) {
								// For each of the values in x.data, we are pushing the symptom names and symptom IDs from the returned object
								// into the local array and then 'this.state', so we can output the results to the user in render()
								symptomNames.push(x.data[i].common_name);
								symptomSID.push(x.data[i].SID);
								this.handleSymptoms(symptomNames[i]);
								this.handleSID(symptomSID[i]);
							}
						} else {
							for(var i = 0; i < x.data.length; i++) {
								symptomNames.push(x.data[i].common_name);
								symptomSID.push(x.data[i].SID);
								this.handleSymptoms(symptomNames[i]);
								this.handleSID(symptomSID[i]);
							}
						}

						// This function is used so that we can minimize the Search View and show the Symptoms View to the user
						// The Symptoms View is what will have the symptom names shown to the user
						this.handleMinimizeSearch();
					} else {
						// If there are no results, we are alerting the user that no results were found
						alert("No results were found with your input. Perhaps try Smart Search.");
					}
				})

				.catch((error) => {
					console.log(error);
				});
		} else {
			// This will be shown if all of the inputs were not given
			alert("Must enter inputs for all fields!");
		}
	}

	handleSmartSearch(event) {
		event.preventDefault();

		if (!this.handleEmptyInput()){
			this.setState({
				data: {
					...this.state.data,
					SID: [],
					diagnosesNames: [],
					diagnosesProbabilities: [],
					diagnosesHints: [],
				}	
			})

			var symptomSID = [];
			var js = {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
				  
			var request = require('axios');
			axios.post('http://18.191.248.57:80/simpsearch', js)
				.then((response) => {
					var obj = JSON.stringify(response);
					var x = JSON.parse(obj);
					
					if(x.data[0].SID !== "error"){
						for(var i = 0; i < x.data.length; i++) {
							symptomSID.push(x.data[i].SID);
							this.handleSID(symptomSID[i]);
						}

						var jsonList = [];

						for(var i = 0; i < symptomSID.length; i++){
							var dg = {'SID': symptomSID[i], 'gender':this.state.data.gender, 'age': this.state.data.age };
							jsonList.push(dg);
						}

						var diagnosisNames = [];
						var diagnosisProbabilities = [];
						var diagnosisHints = [];

						var request2 = require('axios');
						axios.post('http://18.191.248.57:80/diagnosis', jsonList)
							.then((response) => {
								var obj = JSON.stringify(response);
								var x = JSON.parse(obj);
								
								if (x.data.length > 3) {
									for(var i = 0; i < 3; i++) {
										diagnosisNames.push(x.data[i].common_name);
										var tempProbability = ((parseFloat(x.data[i].probability) * 100).toFixed(2)).toString();
										diagnosisProbabilities.push(tempProbability);
										diagnosisHints.push(x.data[i].hint);
										this.handleDiagnosesNames(diagnosisNames[i]);
										this.handleDiagnosesProbabilities(diagnosisProbabilities[i]);
										this.handleDiagnosesHints(diagnosisHints[i]);
									}
								} else {
									for(var i = 0; i < x.data.length; i++) {
										diagnosisNames.push(x.data[i].common_name);
										var tempProbability = ((parseFloat(x.data[i].probability) * 100).toFixed(2)).toString();
										diagnosisProbabilities.push(tempProbability);
										diagnosisHints.push(x.data[i].hint);
										this.handleDiagnosesNames(diagnosisNames[i]);
										this.handleDiagnosesProbabilities(diagnosisProbabilities[i]);
										this.handleDiagnosesHints(diagnosisHints[i]);
									}
								}

								this.handleDropdown();
								this.handleMinimizeSmartSearch();
							})
						.catch((error) => {
							console.log(error);
						});
					} else {
						alert("No results were found with your input.");
					}
				})

				.catch((error) => {
					console.log(error);
				});

		} else {
			alert("Must enter inputs for all fields!");
		}
	}

	// This button will be used to reset all of the values and to make Symptoms and Diagnosis View disappear
	// The original Search View will again appear, so that the user can make another search
	handleNewSearch(event) {
		this.setState ({
			titleView: "originalTitleView",
			inputView: "originalInputView",
			genderAgeView: "originalGenderAgeView",
			searchButtonView: "originalSearchButtonView",
			smartSearchButtonView: "originalSmartSearchButtonView",
			newSearchView: "emptyNewSearch",
			symptomsView: "emptySymptoms",
			diagnosisView: "emptyDiagnosis",
			dropdownView: "emptyDropdown",
			data: {
				searchKey: '',
				gender: '',
				age: '',
				symptoms: [],
				SID: [],
				diagnosesNames: [],
				diagnosesProbabilities: [],
				diagnosesHints: [],
			}
		})
	}

	// Pushes into array the diagnosis names given from the API call
	// This is used to display the diagnosis name to the user
	handleDiagnosesNames(event) {
		this.setState({
			data: {
				...this.state.data,
				diagnosesNames: [...this.state.data.diagnosesNames, event]
			}	
		})
	}

	// Pushes into array the diagnosis probability percentages for the corresponding diagnosis name given from the API call
	// This is used to display the diagnosis probability percentage to the user
	handleDiagnosesProbabilities(event) {
		this.setState({
			data: {
				...this.state.data,
				diagnosesProbabilities: [...this.state.data.diagnosesProbabilities, event]
			}	
		})
	}

	// Pushes into array the advice for the corresponding diagnosis given from the API call
	// This is used to display the advice/recommendation the API would like for the user to take
	handleDiagnosesHints(event) {
		this.setState({
			data: {
				...this.state.data,
				diagnosesHints: [...this.state.data.diagnosesHints, event]
			}	
		})
	}

	// This function is called in handleDiagnosis
	// This will allow for the Symptoms View to disappear and the Diagnosis View to appear
	// with all the given Diagnosis names, probabilities, and hints
	handleMinimizeSymptoms() {
		if(this.state.data.diagnosesNames.length > 0) {
			this.setState({
				...this.state,
				symptomsView: "emptySymptoms",
				diagnosisView: "showingDiagnosis",
			})
		} else {
			this.setState({
				...this.state,
				symptomsView: "showingSymptoms",
				diagnosisView: "emptyDiagnosis",
			})
		}
	}

	// Checks to see if there is more than one diagnoses name given
	handleDropdown() {
		// If there is more than one, then we are showing the dropdown that includes 2 more diagnosis names
		if (this.state.data.diagnosesNames.length > 1) {
			this.setState({
				...this.state,
				dropdownView: "dropdown",
			})
		// If not, then we are hiding the dropdown from the user
		} else {
			this.setState({
				...this.state,
				dropdownView: "emptyDropdown",
			})
		}
	}

	// Function that allows for Diagnosis to work for Simple Search
	handleDiagnose(event) {
		event.preventDefault();

		// Empty values of state for diagnosis names, probabilities, and hints so that we can continue to receive new diagnoses
		// This prevents the mistake of still using the data from previous submissions
		this.setState({
			data: {
				...this.state.data,
				diagnosesNames: [],
				diagnosesProbabilities: [],
				diagnosesHints: [],
			}	
		})

		// Create array to save the symptoms that the user put a check on
		// This indicates that the symptom does apply to the user
		var checkedSymptom = [];

		// If the symptom has a check corresponding it, then we are pushing
		// the SID of that symptom to checkedSymptom
		for(var i = 0; i < this.state.data.SID.length; i++) {
			if(document.getElementsByClassName("SID")[i].checked){
				var ID = document.getElementsByClassName("SID")[i].value;
				checkedSymptom.push(this.state.data.SID[ID])
			}
		}

		// The API only accepts lists of objects
		var jsonList = [];

		// The API only takes array of objects that have properties 'SID', 'gender', and 'age'
		// Using dg, we are making making the objects and then pushing dg onto jsonList	
		for(var i = 0; i < checkedSymptom.length; i++){
			var dg = {'SID': checkedSymptom[i], 'gender':this.state.data.gender, 'age': this.state.data.age };
			jsonList.push(dg);
		}
		
		// Create local arrays to save the diagnosis names, probabilities, and hints soon to be given from the API response
		var diagnosisNames = [];
		var diagnosisProbabilities = [];
		var diagnosisHints = [];
		
		// Axios is being used to make API Calls and we are sending the 'jsonList' object array
		var request = require('axios');
		axios.post('http://18.191.248.57:80/diagnosis', jsonList)
			.then((response) => {
				// Using JSON.stringify and JSON.parse, we are able to take the individual values we need from the return object
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);
				
				if (x.data.length > 3) {
					for(var i = 0; i < 3; i++) {
						diagnosisNames.push(x.data[i].common_name);
						var tempProbability = ((parseFloat(x.data[i].probability) * 100).toFixed(2)).toString();
						diagnosisProbabilities.push(tempProbability);
						diagnosisHints.push(x.data[i].hint);
						this.handleDiagnosesNames(diagnosisNames[i]);
						this.handleDiagnosesProbabilities(diagnosisProbabilities[i]);
						this.handleDiagnosesHints(diagnosisHints[i]);
					}
				} else {
					for(var i = 0; i < x.data.length; i++) {
						diagnosisNames.push(x.data[i].common_name);
						var tempProbability = ((parseFloat(x.data[i].probability) * 100).toFixed(2)).toString();
						diagnosisProbabilities.push(tempProbability);
						diagnosisHints.push(x.data[i].hint);
						this.handleDiagnosesNames(diagnosisNames[i]);
						this.handleDiagnosesProbabilities(diagnosisProbabilities[i]);
						this.handleDiagnosesHints(diagnosisHints[i]);
					}
				}

				this.handleDropdown();
				this.handleMinimizeSymptoms();
			})

			.catch((error) => {
				console.log(error);
			});
	}

	render(){
		return(
			<div className="Search">
				<HowToUse />
				<Dictionary />
				<TeamContact />

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
				<input id={this.state.searchButtonView} type="submit" value="SIMPLE SEARCH" onClick={this.handleSimpleSearch.bind(this)} /> 
				<input id={this.state.smartSearchButtonView} type="submit" value="SMART SEARCH" onClick={this.handleSmartSearch.bind(this)} /> <br/>
				
				<input id={this.state.newSearchView} type="submit" value="NEW SEARCH" onClick={this.handleNewSearch.bind(this)} /> <br/>

				<div id={this.state.symptomsView}>
					<h3 id="apply-title">Check all that apply</h3>
					<div id="symptoms-list">
						<ul>
							{this.state.data.symptoms.map((item,index) => 
								<li class="symptom"><input class="checkbox" type="checkbox" class="SID" value={index}/>{item}</li>
							)}
						</ul>
					</div>
					<input id="submit-button" type="submit" value="Submit" onClick={this.handleDiagnose.bind(this)} /> <br/>
				</div>

				<div id={this.state.diagnosisView}>
					<div id="diagnosis">
						<h3 id="calculated-title">Here is what we calculated:</h3>
						<div id="diagnosis-list">
							<ul id="main-diagnosis">
								<p class="diagnosis-item">There is a {this.state.data.diagnosesProbabilities[0]}% chance that you have a <strong>{this.state.data.diagnosesNames[0]}</strong></p>
								<p class="diagnosis-item">{this.state.data.diagnosesHints[0]}</p>
							</ul>
						</div>
						<div class={this.state.dropdownView}>
							<input id="see-more" type="checkbox" name="tab" />
							<label for="see-more">Click here for other possible diagnosis</label>
							<div class="more-diagnosis">
								<ul class="more-diagnosis-list">
									<p class="diagnosis-item">There is a {this.state.data.diagnosesProbabilities[1]}% chance that you have a <strong>{this.state.data.diagnosesNames[1]}</strong></p>
									<p class="diagnosis-item">{this.state.data.diagnosesHints[1]}</p>
									<hr />
									<p class="diagnosis-item">There is a {this.state.data.diagnosesProbabilities[2]}% chance that you have a <strong>{this.state.data.diagnosesNames[2]}</strong></p>
									<p class="diagnosis-item">{this.state.data.diagnosesHints[2]}</p>
								</ul>
							</div>
						</div>
						<div class="disclaimer">
							<h4 class="title">DISCLAIMER</h4>
							<h4>WE ARE NOT DOCTORS. WE ARE SIMPLY GIVING YOU A CALCULATED DIAGNOSIS USING ALGORITHMS. IF POSSIBLE, PLEASE VISIT YOUR PERSONAL DOCTOR. IF PAIN IS UNBEARABLE, PLEASE GO TO THE EMERGENCY ROOM OR CALL 911.</h4>
						</div>
					</div>
				</div>

				<div id="screenTooSmall">
					<h1> Screen size is too small. Increase window size. </h1>
				</div>
			</div>
		);
	}
}

export default Search;
