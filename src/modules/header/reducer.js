import * as Actions from './actions';
import * as ActionTypes from './action-types';
const initialState = {
  dashboardsList: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DASHBOARD_LIST_STARTED:
      return state
    case ActionTypes.DASHBOARD_LIST_COMPLETED:
      return Object.assign({}, state, {
        dashboardsList: action.payload.data.data
      })
    case ActionTypes.DASHBOARD_LIST_REJECTED:
      return Object.assign({}, state, {
        dashboardsList: []
      })
    case ActionTypes.DASHBOARD_UPDATED:
      return Object.assign({}, action.payload)
    default:
      return state
  }
};