import '../styles/index.js2less';

import '!!file?name=favicon.ico!../public/favicon.ico';
import '!!file?name=favicon.png!../public/favicon.png';
import '!!file?name=favicon-180x180.png!../public/favicon-180x180.png';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistory} from 'react-router-redux';

import {pageview} from 'lib/analytics';
import firebase from 'lib/firebase';
import configureStore from './store/configureStore';
import routes from './routes';
import * as meActions from './actions/me';

const reduxRouterMiddleware = syncHistory(browserHistory);
const store = configureStore({middleware: [reduxRouterMiddleware]});

// Google analytics for each history change
browserHistory.listen(pageview);

// Firebase will trigger the action if the user is logged in from a previous
// session when first loading the page
firebase.onAuth((auth) => store.dispatch(meActions.syncLogin(auth)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
