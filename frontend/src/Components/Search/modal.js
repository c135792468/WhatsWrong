import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div id="ModalInfo">
				<button data-toggle="modal" data-target="#myModal" id="modalButton">How To Use</button>
				<div id="myModal" className="modal fade" role="dialog">
				    <div className="modal-dialog">
				        <div className="modal-content">
				            <div className="modal-body">
				                <h3>How to Use WhatsWrong?</h3>
				                <h4>For simple search:</h4>
				                <ol>
				                  	<li>Enter a simple body part. Select your gender and enter age.</li>
					                <img src="simp-search1.png" />
				                  	<li>Select the symptoms that apply to you.</li>
				                  	<img src="simp-search2.png" />
				                  	<li>See the possible diagnoses along with percentage and advice.</li>
				                  	<img src="simp-search3.png" />
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

export default Modal;