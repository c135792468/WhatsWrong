import React, { Component } from 'react';
import './HowToUseTeamContact.css';
import './modal.css';

class HowToUse extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			// These are all static outputs to the screen using simple HTML
			// No functions are being used
			// Bootstrap Modal is being used to make a pop-up window
			<div id="HowToUse">
				<button data-toggle="modal" data-target="#myModal" id="howToUseButton">How To Use</button>
				<div id="myModal" className="modal fade" role="dialog">
				    <div className="modal-dialog">
				        <div className="modal-content">
				            <div className="modal-body">
				                <h3>How to Use WhatsWrong?</h3>
				                <h4>For simple search:</h4>
				                <ol>
				                  	<li>Enter a simple body part. Select your gender and enter age.</li>
					              	<img src="simp-search1.png" /> <br />
				                  	<li>Select the symptoms that apply to you.</li>
				                  	<img src="simp-search2.png" />
				                 	<li>See the possible diagnoses along with percentage and advice.</li>
				                  	<img src="simp-search3.png" />
				                </ol>
				                <h4>For smart search:</h4>
				                <ol>
						            <li>Enter your symptoms however way you like. Select your gender and enter age.</li>
					                <img src="smart-search1.png" />
					                <li>See the possible diagnosis along with advice.</li>
					                <img src="smart-search2.png" />
				                </ol>
				                <h4>For Medical Dictionary:</h4>
				                <ol>
						            <li>Click on icon on top left corner labeled "Medical Dictionary".</li>
					                <img src="dict-1.png" />
					                <li>Enter medical term in search bar.</li>
					                <img src="dict-2.png" />
					                <li>Read the given definitions.</li>
					                <img src="dict-3.png" />
				                </ol>
				                <button type="submit" data-dismiss="modal" id="closeButton">Close</button>
				            </div>
				        </div>
				    </div>
				</div>
			</div>
		)
	}
}

export default HowToUse;
