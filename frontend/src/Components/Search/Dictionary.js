import React, { Component } from 'react';
import axios from 'axios';
import './modal.css';
import './Dictionary.css';

class Dictionary extends Component {
	constructor() {
		super();

		this.state = {
			searchKey: '',
		};
	}

	handleSearchKey(event) {
		const searchKey = event.target.value;
		this.setState({
			...this.state.data,
			searchKey
		})
	}

	handleSearch(event) {
		event.preventDefault();

		this.setState({
			searchKey: '',
		})

		var term = {'dict': this.state.searchKey};
			  
		var request = require('axios');
		axios.post('http://18.191.248.57:80/dct', term)
			.then((response) => {
				console.log(response);
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