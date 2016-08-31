import * as ActionTypes from './action-types';
export const getWidgetConfStarted = () => ({
    type: ActionTypes.GET_WIDGET_CONF_STARTED,
    payload: {}
});
export const getWidgetConfCompleted = (payload) => ({
    type: ActionTypes.GET_WIDGET_CONF_COMPLETED,
    payload
});
export const getWidgetConfRejected = (payload) => ({
    type: ActionTypes.GET_WIDGET_CONF_REJECTED,
    payload
});
export const widgetParamChanged = (payload) => ({
    type: ActionTypes.WIDGET_PARAM_CHANGED,
    payload
});
export const widgetAdded = (payload) => ({
    type: ActionTypes.WIDGET_ADDED,
    payload
});
export const widgetRemoved = (payload) => ({
    type: ActionTypes.WIDGET_REMOVED,
    payload
});
export const cleanWidgetConf = (payload) => ({
    type: ActionTypes.CLEAN_WIDGET_CONF,
    payload
});
export const widgetsLayoutChanged = (payload) => ({
    type: ActionTypes.WIDGETS_LAYOUT_CHANGED,
    payload
})
export const getWidgetDataStarted = (payload) => ({
    type: ActionTypes.GET_WIDGET_DATA_STARTED,
    payload
})
export const getWidgetDataCompleted = (payload) => ({
    type: ActionTypes.GET_WIDGET_DATA_COMPLETED,
    payload
})
export const getWidgetDataRejected = (payload) => ({
    type: ActionTypes.GET_WIDGET_DATA_REJECTED,
    payload
})
export const widgetCloned = (payload) => ({
    type: ActionTypes.WIDGET_CLONED,
    payload
});
export const widgetConfModalOpened= (payload) => ({
    type: ActionTypes.WIDGET_CONFIG_MODAL_OPENED,
    payload
});
export const widgetConfModalClosed= (payload) => ({
    type: ActionTypes.WIDGET_CONFIG_MODAL_CLOSED,
    payload
});