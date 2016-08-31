import * as Actions  from './actions'
import * as Model from './model'
const getWidgetsDataThunk = (params) => {
  return function (dispatch) {
    dispatch(Actions.getWidgetDataStarted(params.widgetId));
    return Model.getWidgetsData(params)
      .then(response => {
        dispatch(Actions.getWidgetDataCompleted(params.widgetId))
        return response;
      })
      .catch(response => {
        dispatch(Actions.getWidgetDataRejected(params.widgetId))
        return response
      })
  };
}
export { getWidgetsDataThunk}