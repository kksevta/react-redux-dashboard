import * as Actions from './actions';
import * as ActionTypes from './action-types';
import {statusCodes} from 'dashboard-app/config/status-codes'
const initialState = {
  active: false,
  error: {
    errorCode: '',
    errorText: ''
  },
  loginProcessInProgress: false,
  loginProcessDone: true
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_STARTED:
      return Object.assign({}, state, {
        active: false, error: {
          errorCode: '',
          errorText: ''
        }, loginProcessInProgress: true, loginProcessComplete: false
      })
    case ActionTypes.USER_LOGIN_COMPLETED:
      return Object.assign({}, state, {
        active: true,
        error: { errorCode: '', errorText: '' },
        loginProcessDone: true,
        loginProcessInProgress: false
      })
    case ActionTypes.USER_LOGIN_REJECTED:
      return Object.assign({}, state, {
        active: false, error: {
          errorCode: action.payload.response.status,
          errorText: statusCodes[action.payload.response.status].text,
        }, loginProcessInProgress: false, loginProcessComplete: true
      })
    default:
      return state
  }
};