import React from 'react'
import { Route, IndexRoute, Router, hashHistory, browserHistory, IndexRedirect} from "react-router";
import AppWrapper from './app-wrapper'
import DashboardWrapper from './dashboard-wrapper'
import DashboardViewModule from 'dashboard-app/dashboard-view'
import AuthModule from './auth'
const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={ AppWrapper }>
      <Route path="/view" component={DashboardWrapper}>
        <Route path="/view/:dashboardId" component={DashboardViewModule.wrapper}></Route>
      </Route>
      <Route path="/create" component={DashboardWrapper}>
        <IndexRoute component={DashboardViewModule.wrapper}></IndexRoute>
      </Route>
      <Route path="/login" component={AuthModule.wrapper}></Route>
    </Route>
  </Router>
)
export default Routes