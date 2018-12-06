import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './history';
import Search from './components/Search/Search';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// The website is all under one URL to ensure efficiency
// If you would like to add another URL in future, reuse line 17 for other pages.

ReactDOM.render(
	<Provider>
		<Router history={history}>
			<React.Fragment>
				<Route exact path={'/'} component={Search} key="Search" />
			</React.Fragment>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
