import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Search extends Component {
	constructor() {
		super();

		this.state = {
			data: {
				searchKey: '',
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

	handleSubmit(event) {
		event.preventDefault();
		console.log("Search Key: " + this.state.data.searchKey);
		console.log("Gender: " + this.state.data.gender);
		console.log("Age: " + this.state.data.age);
	}

	render(){
		return(
			<div className="Symptoms">
				<input className="text" id="research-input" type="text" placeholder="Search Again?" onChange={this.handleSearchKey.bind(this)} value={this.state.data.searchKey}/> <br/>
				<h1 id="symptoms-title">Tell me about your ANKLE</h1>
				<div id="symptoms">
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
					<button><Link to="/diagnosis">Diagnosis Page</Link></button>
				</div>
			</div>
		);
	}
}

export default Search;
