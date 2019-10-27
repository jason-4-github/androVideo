import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homepage from './homepage';

const rootReducer = combineReducers({
  homepage,
  routing: routerReducer,
});

export default rootReducer;