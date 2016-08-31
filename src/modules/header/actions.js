import * as ActionTypes from './action-types';
export const dashboardListStarted = () => ({
  type: ActionTypes.DASHBOARD_LIST_STARTED,
  payload: {}
});
export const dashboardListCompleted = (payload) => ({
  type: ActionTypes.DASHBOARD_LIST_COMPLETED,
  payload
});
export const dashboardListRejected = (payload) => ({
  type: ActionTypes.DASHBOARD_LIST_REJECTED,
  payload
});
export const dashboardUpdated = (payload) => ({
  type: ActionTypes.DASHBOARD_UPDATED,
  payload
});