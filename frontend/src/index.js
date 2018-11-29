import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './history';
import './index.css';
import Search from './components/Search/Search';

import registerServiceWorker from './registerServiceWorker';

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
