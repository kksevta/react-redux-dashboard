import React, {Component} from 'react';
import HeaderComponents from './components'
import {connect} from 'react-redux';
import * as Actions  from './actions'
import {getDashboardsListThunk} from './thunks'
import { withRouter} from 'react-router'
import DashboardViewModule from 'dashboard-app/dashboard-view'
import {generateUUID} from 'dashboard-app/utils/generic-collection'
class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.onDashboardDropdownListClick = this.onDashboardDropdownListClick.bind(this)
        this.onLogOutClick = this.onLogOutClick.bind(this)
        this.updateDashboardModel = this.updateDashboardModel.bind(this)
        this.getdashboardListAndDefineRoute = this.getdashboardListAndDefineRoute.bind(this)
    }
    onDashboardDropdownListClick(dashboardId) {
        this.props.router.push('/view/' + dashboardId)
    }
    onLogOutClick() {
        this.props.router.push('/login')
    }
    updateDashboardModel(dashboardId, dashboardInEditMode) {
        if (dashboardInEditMode && !dashboardId) {
            dashboardId = generateUUID();
        }
        this.props.dispatch(DashboardViewModule.thunks.updateDashboardModelThunk({ dashboardId: dashboardId, dashboardInEditMode: dashboardInEditMode }));
    }
    componentDidMount() {
        let {dashboardId} = this.props;
        this.getdashboardListAndDefineRoute(dashboardId)
    }
    getdashboardListAndDefineRoute(dashboardId) {
        this.props.dispatch(getDashboardsListThunk()).then((response) => {
            if (this.props.routePath == '/create') {
                this.updateDashboardModel(undefined, true)
            }
            else {
                if (response.data.data.length > 0) {
                    if (!dashboardId) {
                        dashboardId = response.data.data[0].dashboardId;
                        this.props.router.push('/view/' + dashboardId);
                    } else {
                        let dashboadIdFound = _.some(response.data.data, (dashboard) => {
                            return dashboard.dashboardId == dashboardId
                        })
                        if (!dashboadIdFound) {
                            dashboardId = response.data.data[0].dashboardId;
                            this.props.router.replace('/view/' + dashboardId);
                        }
                        else {
                            this.updateDashboardModel(dashboardId, false)
                        }
                    }
                }
                else {
                    this.props.router.push('/create');
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("header will recieve", this.props, nextProps)
        let dashboardId = nextProps.dashboardId;

        if (nextProps.routePath == '/create') {
            this.updateDashboardModel(undefined, true)
        }

        //this condition when user login and directly shifted here
        if (nextProps.routePath == '/view' && this.props.routePath == '/view' && !this.props.dashboardId && nextProps.dashboardId) {
            this.updateDashboardModel(nextProps.dashboardId, false)
        }


        //this condition when user changes dashbioard from dashboardlist 
        if (nextProps.routePath == '/view' && this.props.routePath == '/view' && this.props.dashboardId && nextProps.dashboardId && this.props.dashboardId != nextProps.dashboardId) {
            this.updateDashboardModel(nextProps.dashboardId, false)
        }


        //this condition when user saves new dashboard
        if (nextProps.routePath == '/view' && this.props.routePath == '/create') {
            this.getdashboardListAndDefineRoute(nextProps.dashboardId)
        }


        //this condition occure when user remove dashboard
        if (nextProps.routePath == '/view' && this.props.routePath == '/view' && this.props.dashboardId && !nextProps.dashboardId) {
            this.getdashboardListAndDefineRoute(nextProps.dashboardId)
        }
    }
    render() {
        return (
            <HeaderComponents.Navbar onLogOutClick={this.onLogOutClick}>
                <HeaderComponents.DashboardDropdown onDashboardDropdownListClick={this.onDashboardDropdownListClick}/>
            </HeaderComponents.Navbar>
        )
    }
}
export default withRouter(connect(null, null)(HeaderContainer))
