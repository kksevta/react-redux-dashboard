import * as Actions  from './actions'
import * as Model from './model'
import WidgetContainerModule from 'dashboard-app/widgets-container'
import {DEFAULT_DASHBOARD_NAME} from 'dashboard-app/config/axios-endpoints'
const saveDashboardThunk = (params) => {
  return function (dispatch, getState) {
    dispatch(Actions.dashboardSaveStarted())
    params.widgetsConf = getState().widgetsConf;
    return Model.saveDashboard(params)
      .then(response => dispatch(Actions.dashboardSaveCompleted(response)))
      .catch(response => dispatch(Actions.dashboardSaveRejected(response)))
  };
}
const removeDashboardThunk = (params) => {
  return function (dispatch, getState) {
    dispatch(Actions.dashboardRemoveStarted())
    return Model.removeDashboard(params)
      .then(response => dispatch(Actions.dashboardRemoveCompleted(response)))
      .catch(response => dispatch(Actions.dashboardRemoveRejected(response)))
  };
}
const getWidgetsConfigurationThunk = (params) => {
  return function (dispatch) {
    Model.getWidgetsConfiguration(params)
      .then(response => dispatch(WidgetContainerModule.actions.getWidgetConfCompleted(response)))
      .catch(response => dispatch(WidgetContainerModule.actions.getWidgetConfRejected(response)))
  };
}
const updateDashboardModelThunk = (params) => {
  return function (dispatch, getState) {
    const dashboardsList = getState().header.dashboardsList;
    if (dashboardsList && dashboardsList.length > 0 || params.dashboardInEditMode) {
      const dashboard = _.find(dashboardsList, (dashboard) => {
        return dashboard.dashboardId == params.dashboardId
      })
      let dashboardName = DEFAULT_DASHBOARD_NAME
      let dashboardId = params.dashboardId
      if (!params.dashboardInEditMode) {
        if (dashboard && dashboard.dashboardName) {
          dashboardName = dashboard.dashboardName
        }
      }
      dispatch(Actions.updateDashboardModel({ dashboardId: dashboardId, dashboardName: dashboardName, dashboardInEditMode: params.dashboardInEditMode }))
      dispatch(WidgetContainerModule.actions.cleanWidgetConf())
      if (!params.dashboardInEditMode) {
        dispatch(getWidgetsConfigurationThunk({ dashboardId: params.dashboardId }))
      }
    }
  }
}
export { saveDashboardThunk, getWidgetsConfigurationThunk, updateDashboardModelThunk, removeDashboardThunk}