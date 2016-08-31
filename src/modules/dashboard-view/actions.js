import * as ActionTypes from './action-types';
export const dashboardSaveStarted = () => ({
    type: ActionTypes.DASHBOARD_SAVE_STARTED,
    payload: {}
});
export const dashboardSaveCompleted = (payload) => ({
    type: ActionTypes.DASHBOARD_SAVE_COMPLETED,
    payload
});
export const dashboardSaveRejected = (payload) => ({
    type: ActionTypes.DASHBOARD_SAVE_REJECTED,
    payload
});
export const updateDashboardModel = (payload) => ({
    type: ActionTypes.UPDATE_DASHBOARD_MODEL,
    payload
});
export const dashboardRemoveStarted = () => ({
    type: ActionTypes.DASHBOARD_REMOVE_STARTED,
    payload: {}
});
export const dashboardRemoveCompleted = (payload) => ({
    type: ActionTypes.DASHBOARD_REMOVE_COMPLETED,
    payload
});
export const dashboardRemoveRejected = (payload) => ({
    type: ActionTypes.DASHBOARD_REMOVE_REJECTED,
    payload
});