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
			diagnosisView: "emptyDiagnosis",
			data: {
				searchKey: '',
				gender: '',
				age: '',
				search: '',
				symptoms: [],
				SID: '',
				diagnosesNames: [],
				diagnosesProbabilities: [],
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

	handleSubmit(event) {
		event.preventDefault();

		this.setState({
			data: {
				...this.state.data,
				symptoms: [],
				SID: [],
			}	
		})

		var symptomNames = [];
		var symptomSID = [];
		var j;
		var js = {'search': this.state.data.searchKey, 'gender':this.state.data.gender, 'age': this.state.data.age };
			  
		var request = require('axios');
		axios.post('http://18.191.248.57:80/search', js)
			.then((response) => {
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);

				console.log(x);
				
				if (x.data.length > 10) {
					for(var i = 0; i < 10; i++) {
						symptomNames.push(x.data[i].common_name);
						symptomSID.push(x.data[i].SID);
						console.log(i + " " + symptomNames[i] + " " + symptomSID[i]);
						this.handleSymptoms(symptomNames[i]);
						this.handleSID(symptomSID[i]);
					}
				} else {
					for(var i = 0; i < x.data.length; i++) {
						symptomNames.push(x.data[i].common_name);
						symptomSID.push(x.data[i].SID);
						console.log(i + " " + symptomNames[i]);
						this.handleSymptoms(symptomNames[i]);
						this.handleSID(symptomSID[i]);
					}
				}

				this.handleMinimizeSearch();

				console.log(this.state);
			})

			.catch((error) => {
				console.log(error);
			});
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

		console.log(jsonList);

		var diagnosisNames = [];
		var diagnosisProbabilities = [];
		  
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
						console.log(tempProbability);
						diagnosisProbabilities.push(tempProbability);
						this.handleDiagnosesNames(diagnosisNames[i]);
						this.handleDiagnosesProbabilities(diagnosisProbabilities[i]);
					}
				} else {
					for(var i = 0; i < x.data.length; i++) {
						diagnosisNames.push(x.data[i].common_name);
						var tempProbability = ((parseFloat(x.data[i].probability) * 100).toFixed(2)).toString();
						console.log(tempProbability);
						diagnosisProbabilities.push(tempProbability);
						this.handleDiagnosesNames(diagnosisNames[i]);
						this.handleDiagnosesProbabilities(diagnosisProbabilities[i]);
					}
				}

				this.handleMinimizeSymptoms();

				console.log(this.state.data.diagnosesProbability[0]);
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
								<li class="symptom"><input class="checkbox" type="checkbox" class="SID" value={index}/>{item}</li>
							)}
						</ul>
					</div>
					<input id="submit-button" type="submit" value="Submit" onClick={this.handleDiagnose.bind(this)} /> <br/>
				</div>


				<div id={this.state.diagnosisView}>
					<input className="text" id="research-input" type="text" placeholder="Search Again?" onChange={this.handleSearchKey.bind(this)} value={this.state.data.searchKey}/> <br/>
					<h1 id="diagnosis-title">DIAGNOSIS</h1>
					<div id="diagnosis">
						<h3 id="calculated-title">Here is what we calculated:</h3>
						<div id="diagnosis-list">
							<ul>
								
								<li class="diagnosis-item">There is a {this.state.data.diagnosesProbabilities[0]}% chance that you have a <strong>{this.state.data.diagnosesNames[0]}</strong></li>
								<li class="diagnosis-item">To read more about ankle sprains, visit <a href="https://www.webmd.com/pain-management/ankle-sprain">https://www.webmd.com/pain-management/ankle-sprain</a></li>
							</ul>
						</div>
						<div class="dropdown">
							<input id="see-more" type="checkbox" name="tab" />
							<label for="see-more">Click here for other possible diagnosis</label>
							<div class="more-diagnosis">
								<ul class="more-diagnosis-list">
									<li class="diagnosis-item">There is a 15% chance that you have a <strong>BROKEN ANKLE</strong></li>
									<li class="diagnosis-item">To read more about broken ankles, visit <a href="https://www.webmd.com/fitness-exercise/ankle-fracture">https://www.webmd.com/fitness-exercise/ankle-fracture</a></li>
									<li class="diagnosis-item">There is a 15% chance that you have a <strong>BROKEN ANKLE</strong></li>
									<li class="diagnosis-item">To read more about broken ankles, visit <a href="https://www.webmd.com/fitness-exercise/ankle-fracture">https://www.webmd.com/fitness-exercise/ankle-fracture</a></li>
									<li class="diagnosis-item">There is a 15% chance that you have a <strong>BROKEN ANKLE</strong></li>
									<li class="diagnosis-item">To read more about broken ankles, visit <a href="https://www.webmd.com/fitness-exercise/ankle-fracture">https://www.webmd.com/fitness-exercise/ankle-fracture</a></li>
								</ul>
							</div>
						</div>
						<div class="disclaimer">
							<h4 class="title">DISCLAIMER</h4>
							<h4>WE ARE NOT DOCTORS. WE ARE SIMPLY GIVING YOU A CALCULATED DIAGNOSIS USING ALGORITHMS. IF POSSIBLE, PLEASE VISIT YOUR PERSONAL DOCTOR. IF PAIN IS UNBEARABLE, PLEASE GO TO THE EMERGENCY ROOM OR CALL 911.</h4>
						</div>
					</div>
				</div>
				<button><Link to="/symptoms">Symptoms Page</Link></button>
			</div>
		);
	}
}

export default Search;
