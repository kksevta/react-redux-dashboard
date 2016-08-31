import * as Actions from './actions';
import * as ActionTypes from './action-types';
import {defaultWidgetsList} from 'dashboard-app/config/widgets-config'
import {createLayoutForNewWidget} from 'dashboard-app/utils/generic-collection'
import {WIDGET_GET_DATA_ERROR_STATUS} from 'dashboard-app/config/status'
const initialState = []
export default (state = initialState, action) => {
    let index;
    switch (action.type) {
        case ActionTypes.GET_WIDGET_CONF_STARTED: {
            return Object.assign([], state)
        }
        case ActionTypes.GET_WIDGET_CONF_COMPLETED: {
            return action.payload.data.data[0].widgetsConf.map((widget) => {
                return widget
            })
        }
        case ActionTypes.GET_WIDGET_CONF_REJECTED: {
            return Object.assign([], state)
        }

        case ActionTypes.WIDGET_PARAM_CHANGED:
            return state.map((widget) => {
                if (widget.id == action.payload.id) {
                    widget.title = action.payload.title;
                    widget.params = action.payload.params;
                    return widget
                } else {
                    return widget
                }
            })
        case ActionTypes.WIDGET_ADDED:
            const widgetType = action.payload;
            let defaultWidget = _.find(defaultWidgetsList, (widget) => {
                return widget.type == widgetType
            })
            let widgetId = Math.random().toString(36).substring(7)
            defaultWidget.id = widgetId
            const layout = createLayoutForNewWidget(defaultWidget, state)
            const newWidget = {
                id: defaultWidget.id,
                type: defaultWidget.type,
                title: defaultWidget.title,
                layout: layout,
                params: defaultWidget.params
            }
            return state.concat(newWidget)
        case ActionTypes.WIDGET_CLONED:
            defaultWidget = Object.assign({}, action.payload)
            widgetId = Math.random().toString(36).substring(7)
            defaultWidget.id = widgetId
            const newlayout = createLayoutForNewWidget(defaultWidget, state)
            let params = Object.assign({}, action.payload.params)
            const newWidget1 = {
                id: defaultWidget.id,
                type: defaultWidget.type,
                title: defaultWidget.title,
                layout: newlayout,
                params: params
            }
            return state.concat(newWidget1)
        case ActionTypes.WIDGET_REMOVED:
            index = _.findIndex(state, { id: action.payload.id });
            return state.slice(0, index).concat(state.slice(index + 1))
        case ActionTypes.CLEAN_WIDGET_CONF: {
            return []
        }
        case ActionTypes.WIDGETS_LAYOUT_CHANGED:
            return state.map((widget, index) => {
                let newLayout = Object.assign({}, action.payload[index]);
                return Object.assign({}, widget, { layout: newLayout })
            })
        case ActionTypes.GET_WIDGET_DATA_STARTED:
            return state.map((widget) => {
                if (widget.id == action.payload) {
                    return Object.assign({}, widget, { loading: true, error: undefined })
                } else {
                    return widget
                }
            })
        case ActionTypes.GET_WIDGET_DATA_COMPLETED:
            return state.map((widget) => {
                if (widget.id == action.payload) {
                    return Object.assign({}, widget, { loading: false, error: undefined })
                } else {
                    return widget
                }
            })
        case ActionTypes.GET_WIDGET_DATA_REJECTED:
            return state.map((widget) => {
                if (widget.id == action.payload) {
                    return Object.assign({}, widget, {
                        loading: false, error: {
                            class: WIDGET_GET_DATA_ERROR_STATUS.class,
                            message: WIDGET_GET_DATA_ERROR_STATUS.message
                        }
                    })
                } else {
                    return widget
                }
            })
        case ActionTypes.WIDGET_CONFIG_MODAL_OPENED:
            return state.map((widget) => {
                if (widget.id == action.payload.id) {
                    return Object.assign({}, widget, { modalbool: true })
                } else {
                    return widget
                }
            })
        case ActionTypes.WIDGET_CONFIG_MODAL_CLOSED:
            return state.map((widget) => {
                if (widget.id == action.payload.id) {
                    return Object.assign({}, widget, { modalbool: false })
                } else {
                    return widget
                }
            })
        default:
            return state
    }
};