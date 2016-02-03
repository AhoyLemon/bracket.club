import '../styles/index.less';
import 'file?name=favicon.ico!../public/favicon.ico';
import 'file?name=favicon.png!../public/favicon.png';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistory} from 'redux-simple-router';

import ga from 'lib/analytics';
import firebase from 'lib/firebase';
import configureStore from './store/configureStore';
import routes from './routes';
import * as meActions from './actions/me';

const reduxRouterMiddleware = syncHistory(browserHistory);
const store = configureStore({middleware: [reduxRouterMiddleware]});

if (process.env.NODE_ENV === 'production') {
  browserHistory.listen(({pathname}) => ga.pageview(pathname));
}

// Firebase will trigger the action if the user is logged in from a previous
// session when first loading the page
firebase.onAuth((auth) => store.dispatch(meActions.syncLogin(auth)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
