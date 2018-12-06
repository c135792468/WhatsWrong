import React, { Component } from 'react';
import axios from 'axios';
import './modal.css';
import './Dictionary.css';

class Dictionary extends Component {
	constructor() {
		super();

		this.state = {
			searchKey: '',
			phrases: [],
			defs: [],
		};
	}

	// Saves the value of whatever the user is searching
	handleSearchKey(event) {
		const searchKey = event.target.value;
		this.setState({
			...this.state.data,
			searchKey
		})
	}

	// Pushes into array the phrase results captured from the API call
	handlePhrases(event) {
		this.setState({
			...this.state,
			phrases: [...this.state.phrases, event]
		})
	}

	// Pushes into array the definition results captured for the phrases found in handlePhrases
	handleDefs(event) {
		this.setState({
			...this.state,
			defs: [...this.state.defs, event]
		})
	}

	// Function that allows for search of Medical Dictionary
	handleSearch(event) {
		event.preventDefault();

		// Empty values of state for every search so that prior phrases and definitions do not clutter array
		this.setState({
			searchKey: '',
			phrases: [],
			defs: [],
		})

		// Create local arrays for phrase and defitions that will soon be pushed into this.state
		var listOfPhrases = [];
		var listOfDefs = [];

		// The API only takes objects with property 'dict'. The value for this is saved using handleSearchKey function
		var term = {'dict': this.state.searchKey};
		
		// Axios is being used to make API Calls and we are sending the 'term' object
		var request = require('axios');
		axios.post('http://18.191.248.57:80/dct', term)
			.then((response) => {
				// Using JSON.stringify and JSON.parse, we are able to take the individual values we need from the return object
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);

				// For each of the values in x.data, we are pushing the phrases and definitions from the returned object
				// into the local array and then 'this.state', so we can output the results to the user in render()
				for(var i = 0; i < x.data.length; i++) {
					listOfPhrases.push(x.data[i].phrase);
					listOfDefs.push(x.data[i].def);
					this.handlePhrases(listOfPhrases[i]);
					this.handleDefs(listOfDefs[i]);
				}
			})

			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div id="Dictionary">
				<button data-toggle="modal" data-target="#myModal2" id="dictionaryButton">Medical Dictionary</button>
				<div id="myModal2" className="modal fade" role="dialog">
				    <div className="modal-dialog">
				        <div className="modal-content">
				            <div className="modal-body">
				            	<div id="searchView">
				                	<input className="text" id="dictionary-input" type="text" placeholder="Search the Medical Dictionary" onChange={this.handleSearchKey.bind(this)} value={this.state.searchKey}/>
				                	<input id="dictionary-search-button" type="submit" value="SEARCH" onClick={this.handleSearch.bind(this)} />
				                </div>
				                <div id="definition-list">
									<ul>
										{/* Shows user the phrases along with it's corresponding definition using corresponding index numbers */}
										{this.state.phrases.map((item,index) => 
											<li class="symptom"><strong>{item}</strong>: {this.state.defs[index]}</li>
										)}
									</ul>
								</div>
				                <button type="submit" data-dismiss="modal" id="closeButton">Close</button>
				            </div>
				        </div>
				    </div>
				</div>
			</div>
		)
	}
}

export default Dictionary;
