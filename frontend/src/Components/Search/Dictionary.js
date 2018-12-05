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

	handleSearchKey(event) {
		const searchKey = event.target.value;
		this.setState({
			...this.state.data,
			searchKey
		})
	}

	handlePhrases(event) {
		this.setState({
			...this.state,
			phrases: [...this.state.phrases, event]
		})
	}

	handleDefs(event) {
		this.setState({
			...this.state,
			defs: [...this.state.defs, event]
		})
	}

	handleSearch(event) {
		event.preventDefault();

		this.setState({
			searchKey: '',
			phrases: [],
			defs: [],
		})

		var listOfPhrases = [];
		var listOfDefs = [];

		var term = {'dict': this.state.searchKey};
			  
		var request = require('axios');
		axios.post('http://18.191.248.57:80/dct', term)
			.then((response) => {
				var obj = JSON.stringify(response);
				var x = JSON.parse(obj);

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
			<div id="ModalInfo">
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