import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './history';
import './index.css';
import Search from './components/Search/Search';
import Symptoms from './components/Symptoms/Symptoms';
import Diagnosis from './components/Diagnosis/Diagnosis';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider>
		<Router history={history}>
			<React.Fragment>
				<Route exact path={'/'} component={Search} key="Search" />
				<Route path={'/symptoms'} component={Symptoms} key="Symptoms" />
				<Route path={'/diagnosis'} component={Diagnosis} key="Diagnosis" />
			</React.Fragment>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
