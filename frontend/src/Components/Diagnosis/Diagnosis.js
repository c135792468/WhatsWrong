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
	}

	render(){
		return(
			<div className="Diagnosis">
				<input className="text" id="research-input" type="text" placeholder="Search Again?" onChange={this.handleSearchKey.bind(this)} value={this.state.data.searchKey}/> <br/>
				<h1 id="diagnosis-title">DIAGNOSIS</h1>
				<div id="diagnosis">
					<h3 id="calculated-title">Here is what we calculated:</h3>
					<div id="diagnosis-list">
						<ul>
							<li class="diagnosis-item">There is a 24% chance that you have a <strong>SPRAINED ANKLE</strong></li>
							<li class="diagnosis-item">To read more about ankle sprains, visit <a href="https://www.webmd.com/pain-management/ankle-sprain">https://www.webmd.com/pain-management/ankle-sprain</a></li>
						</ul>
					</div>
					<div class="dropdown">
						<input id="see-more" type="checkbox" name="tab" />
						<label for="see-more">Click here for other possible diagnosis</label>
						<div>
							<ul class="other-diagnosis">
								<li class="diagnosis-item">There is a 15% chance that you have a <strong>BROKEN ANKLE</strong></li>
								<li class="diagnosis-item">To read more about broken ankles, visit <a href="https://www.webmd.com/fitness-exercise/ankle-fracture">https://www.webmd.com/fitness-exercise/ankle-fracture</a></li>
							</ul>
						</div>
					</div>	
					<h4 class="disclaimer">DISCLAIMER</h4>
					<h4 class="disclaimer">WE ARE NOT DOCTORS. WE ARE SIMPLY GIVING YOU A CALCULATED DIAGNOSIS USING ALGORITHMS. IF POSSIBLE, PLEASE VISIT YOUR PERSONAL DOCTOR. IF PAIN IS UNBEARABLE, PLEASE GO TO THE EMERGENCY ROOM OR CALL 911.</h4>
				</div>
			</div>
		);
	}
}

export default Search;
