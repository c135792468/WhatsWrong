import React, { Component } from 'react';
import './HowToUseTeamContact.css';
import './modal.css';

class TeamContact extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			// These are all static outputs to the screen using simple HTML
			// No functions are being used
			<div id="HowToUse">
				<button data-toggle="modal" data-target="#myModal3" id="teamContactButton">Team/Contact</button>
				<div id="myModal3" className="modal fade" role="dialog">
				    <div className="modal-dialog">
				        <div className="modal-content">
				            <div className="modal-body">
				                <h3>Team</h3>
				                <p><strong>Founder/Front-End Developer</strong>: Rakib Hassan</p>
				                <p><strong>Back-End Developer</strong>: Kris Ali</p>
				                <p><strong>Android Developer</strong>: Yin Yu</p>
				                <p><strong>Developer/QA</strong>: Michael Li</p>
				               
				               <h3>Contact</h3>
				               <h4>If you have any problems with the website, please do not hesitate to email us.</h4>
				               <p>rhassan0221@gmail.com</p>
				                <button type="submit" data-dismiss="modal" id="closeButton">Close</button>
				            </div>
				        </div>
				    </div>
				</div>
			</div>
		)
	}
}

export default TeamContact;
