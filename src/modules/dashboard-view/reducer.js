import * as Actions from './actions';
import * as ActionTypes from './action-types';
import {DASHBOARD_SAVE_SUCCESS_STATUS, DASHBOARD_SAVE_STARTED_STATUS, DASHBOARD_SAVE_ERROR_STATUS} from 'dashboard-app/config/status'
const initialState = {
  dashboardId: '',
  dashboardName: '',
  dashboardInEditMode: false,
  status: {},
  loader: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DASHBOARD_SAVE_STARTED:
      return Object.assign({}, state, {
        status: DASHBOARD_SAVE_STARTED_STATUS,
        loader: true
      })
    case ActionTypes.DASHBOARD_SAVE_COMPLETED:
      return Object.assign({}, state, {
        status: DASHBOARD_SAVE_SUCCESS_STATUS,
        loader: false
      })
    case ActionTypes.DASHBOARD_SAVE_REJECTED:
      return Object.assign({}, state, {
        status: DASHBOARD_SAVE_SUCCESS_STATUS,
        loader: false
      })
    case ActionTypes.UPDATE_DASHBOARD_MODEL:
      return Object.assign({}, state, {
        dashboardId: action.payload.dashboardId,
        dashboardName: action.payload.dashboardName,
        dashboardInEditMode: action.payload.dashboardInEditMode,
        status: {},
        loader: false
      })
    case ActionTypes.DASHBOARD_REMOVE_STARTED:
      return Object.assign({}, state)
    case ActionTypes.DASHBOARD_REMOVE_COMPLETED:
      return Object.assign({}, state)
    case ActionTypes.DASHBOARD_REMOVE_REJECTED:
      return Object.assign({}, state)
    default:
      return state
  }
};