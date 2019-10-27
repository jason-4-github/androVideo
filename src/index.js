import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import HomepageContainer from './containers/HomepageContaienr';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './styles/index.less';

import configureStore from './store';
const store = configureStore();

render( <Provider store={store}>
    <Router>
      <Route path='/' component={HomepageContainer} />
    </Router>
  </Provider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
