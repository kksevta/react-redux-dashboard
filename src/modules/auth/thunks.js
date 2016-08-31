import * as Actions  from './actions'
import * as Model from './model'

const userLoginThunk = (params) => {
  return function (dispatch) {
    Model.postLogin(params)
      .then(response => dispatch(Actions.userLoginCompleted(response)))
      .catch(response => dispatch(Actions.userLoginRejected(response)))
  };
}

const userLogoutThunk = () => {
  return function (dispatch) {
    Model.postLogout()
      .then(response => dispatch(Actions.userLogoutCompleted(response)))
      .catch(response => dispatch(Actions.userLogoutRejected(response)))
  };
}
export {userLoginThunk, userLogoutThunk}