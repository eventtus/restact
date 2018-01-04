import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {reducer as confirmationModalReducer} from '../../../src';

import {user} from './user';

export default combineReducers({
  loadingBar: loadingBarReducer,
  toastr: toastrReducer,
  confirmationModal: confirmationModalReducer,
  user
});
