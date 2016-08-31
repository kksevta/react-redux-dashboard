import React, {Component} from 'react';
import WidgetsContainerModule from 'dashboard-app/widgets-container';
import {saveDashboardThunk, getWidgetsConfigurationThunk, removeDashboardThunk} from './thunks'
import {connect} from 'react-redux'
import Constants from 'dashboard-app/config/axios-endpoints'
import * as Actions from './actions'
import { withRouter } from 'react-router'
import DashboardViewComponents from './components'
class ViewDashboardWrapper extends Component {
    constructor(props) {
        super(props)
        this.saveDashboard = this.saveDashboard.bind(this)
        this.createDashboard = this.createDashboard.bind(this);
        this.removeDashboard = this.removeDashboard.bind(this);
    }
    saveDashboard(dashboardName) {
        let {dashboardId} = this.props.dashboardModel
        this.props.dispatch(saveDashboardThunk({ dashboardId: dashboardId, dashboardName: dashboardName })).then(() => {
            this.props.router.push('/view/' + dashboardId)
        })
    }
    removeDashboard() {
        let {dashboardId} = this.props.dashboardModel
        this.props.dispatch(removeDashboardThunk({ dashboardId: dashboardId })).then(() => {
            this.props.router.push('/view')
        })
    }
    createDashboard() {
        this.props.router.push('/create')
    }
    render() {
        const {dashboardName, dashboardId, dashboardInEditMode, loader, status} = this.props.dashboardModel
        return (
            <div>
                <DashboardViewComponents.DashboardConfiguration  dashboardName={dashboardName}
                    dashboardInEditMode={dashboardInEditMode} status={status} createDashboard={this.createDashboard} saveDashboard={this.saveDashboard} removeDashboard={this.removeDashboard}/>
                <hr/>
                <WidgetsContainerModule.wrapper/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dashboardModel: state.dashboardModel,
    }
}
export default withRouter(connect(mapStateToProps, null)(ViewDashboardWrapper))