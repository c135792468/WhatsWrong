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
			title: false,
			titleView: "originalTitleView",
			input: false,
			inputView: "originalInputView",
			genderAge: false,
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

	handleEmptyInput() {
		if (!this.state.data.searchKey || !this.state.data.gender || !this.state.data.age) {
			return true
		} else {
			return false
		}
	}

	handleSymptoms(event) {
		this.setState({
			data: {
				...this.state.data,
				symptoms: [...this.state.data.symptoms, event]
			}	
		})
	}

	handleSID(event) {
		this.setState({
			data: {
				...this.state.data,
				SID: [...this.state.data.SID, event]
			}	
		})
	}

	handleMinimizeSearch() {
		if(this.state.data.symptoms.length > 0) {
			this.setState({
				title: true,
				titleView: "minimizedTitleView",
				input: true,
				inputView: "minimizedInputView",
				genderAge: true,
				genderAgeView: "minimizedGenderAgeView",
				searchButtonView: "minimizedSearchButtonView",
				smartSearchButtonView: "minimizedSmartSearchButtonView",
				newSearchView: "showingNewSearch",
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
				smartSearchButtonView: "originalSmartSearchButtonView",
				newSearchView: "emptyNewSearch",
				symptomsView: "emptySymptoms",
			})
		}
	}

	handleMinimizeSmartSearch() {
		if(this.state.data.diagnosesNames.length > 0) {
			this.setState({
				title: true,
				titleView: "minimizedTitleView",
				input: true,
				inputView: "minimizedInputView",
				genderAge: true,
				genderAgeView: "minimizedGenderAgeView",
				searchButtonView: "minimizedSearchButtonView",
				smartSearchButtonView: "minimizedSmartSearchButtonView",
				newSearchView: "showingNewSearch",
				symptomsView: "emptySymptoms",
				diagnosisView: "showingDiagnosis",
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
				smartSearchButtonView: "originalSmartSearchButtonView",
				newSearchView: "emptyNewSearch",
				symptomsView: "showingSymptoms",
				diagnosisView: "emptyDiagnosis",
			})
		}
	}

	handleSimpleSearch(event) {
		event.preventDefault();

		if (!this.handleEmptyInput()){
			this.setState({
				data: {
					...this.state.data,
					symptoms: [],
					SID: [],
				}	
			})

			var symptomNames = [];
			var symptomSID = [];
			var js = {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
				  
			var request = require('axios');
			axios.post('http://18.191.248.57:80/search', js)
				.then((response) => {
					var obj = JSON.stringify(response);
					var x = JSON.parse(obj);
					
					if(x.data[0].SID !== "no_results"){
						if (x.data.length > 10) {
							for(var i = 0; i < 10; i++) {
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
						this.handleMinimizeSearch();
					} else {
						alert("No results were found with your input. Perhaps try Smart Search.");
					}
				})

				.catch((error) => {
					console.log(error);
				});
		} else {
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

					console.log(x);
					
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

								console.log(x);
								
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

	handleNewSearch(event) {
		this.setState ({
			title: false,
			titleView: "originalTitleView",
			input: false,
			inputView: "originalInputView",
			genderAge: false,
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

	handleDiagnosesNames(event) {
		this.setState({
			data: {
				...this.state.data,
				diagnosesNames: [...this.state.data.diagnosesNames, event]
			}	
		})
	}

	handleDiagnosesProbabilities(event) {
		this.setState({
			data: {
				...this.state.data,
				diagnosesProbabilities: [...this.state.data.diagnosesProbabilities, event]
			}	
		})
	}

	handleDiagnosesHints(event) {
		this.setState({
			data: {
				...this.state.data,
				diagnosesHints: [...this.state.data.diagnosesHints, event]
			}	
		})
	}

	handleDropdown() {
		if (this.state.data.diagnosesNames.length > 1) {
			this.setState({
				...this.state,
				dropdownView: "dropdown",
			})
		} else {
			this.setState({
				...this.state,
				dropdownView: "emptyDropdown",
			})
		}
	}

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

	handleDiagnose(event) {
		event.preventDefault();

		this.setState({
			data: {
				...this.state.data,
				diagnosesNames: [],
				diagnosesProbabilities: [],
				diagnosesHints: [],
			}	
		})

		var checkedSymptom = [];

		if (this.state.data.SID.length > 10) {
			for(var i = 0; i < 10; i++) {
				if(document.getElementsByClassName("SID")[i].checked){
					var ID = document.getElementsByClassName("SID")[i].value;
					checkedSymptom.push(this.state.data.SID[ID])
				}
			}
		} else {
			for(var i = 0; i < this.state.data.SID.length; i++) {
				if(document.getElementsByClassName("SID")[i].checked){
					var ID = document.getElementsByClassName("SID")[i].value;
					checkedSymptom.push(this.state.data.SID[ID])
				}
			}
		}

		var jsonList = [];

		for(var i = 0; i < checkedSymptom.length; i++){
			var dg = {'SID': checkedSymptom[i], 'gender':this.state.data.gender, 'age': this.state.data.age };
			jsonList.push(dg);
		}

		var diagnosisNames = [];
		var diagnosisProbabilities = [];
		var diagnosisHints = [];
		  
		var request = require('axios');
		axios.post('http://18.191.248.57:80/diagnosis', jsonList)
			.then((response) => {
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);

				console.log(x);
				
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
