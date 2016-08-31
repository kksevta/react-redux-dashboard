import * as ActionTypes from './action-types';
export const userLoginStarted = () => ({
  type: ActionTypes.USER_LOGIN_STARTED,
  payload: {}
});
export const userLoginCompleted = (payload) => ({
  type: ActionTypes.USER_LOGIN_COMPLETED,
  payload
});
export const userLoginRejected = (payload) => ({
  type: ActionTypes.USER_LOGIN_REJECTED,
  payload
});
export const userLogoutStarted = () => ({
  type: ActionTypes.USER_LOGOUT_STARTED,
  payload: {}
});
export const userLogoutCompleted = (payload) => ({
  type: ActionTypes.USER_LOGOUT_COMPLETED,
  payload
});
export const userLogoutRejected = (payload) => ({
  type: ActionTypes.USER_LOGOUT_REJECTED,
  payload
});