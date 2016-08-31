import * as Actions  from './actions'
import * as Model from './model'

const getDashboardsListThunk = (params) => {
  return function (dispatch) {
    dispatch(Actions.dashboardListStarted())
    return Model.getDashboardsList(params)
      .then(response => {
        dispatch(Actions.dashboardListCompleted(response))
        return response;
      })
      .catch(response => dispatch(Actions.dashboardListRejected(response)))
  };
}

export {getDashboardsListThunk}