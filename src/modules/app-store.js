import { combineReducers } from 'redux';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';



import HeaderModule from 'dashboard-app/header';
import AuthModule from 'dashboard-app/auth';
import DashboardViewModule from 'dashboard-app/dashboard-view';
import WidgetContainerModule from 'dashboard-app/widgets-container'


const RootReducer = (state = {}, action) => {
  return {
    [HeaderModule.constants.NAME]: HeaderModule.reducer(
      state[HeaderModule.constants.NAME],
      action
    ),
    [AuthModule.constants.NAME]: AuthModule.reducer(
      state[AuthModule.constants.NAME],
      action
    ),
    [DashboardViewModule.constants.NAME]: DashboardViewModule.reducer(
      state[DashboardViewModule.constants.NAME],
      action,
    ),
    [WidgetContainerModule.constants.NAME]: WidgetContainerModule.reducer(
      state[WidgetContainerModule.constants.NAME],
      action
    )
  }
}
const Store = createStore(RootReducer, applyMiddleware(thunk, logger()));
export default Store;