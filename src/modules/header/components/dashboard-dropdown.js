import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
const DashboardDropdown = props => {
    let {dashboardsList, onDashboardDropdownListClick} = props;
    if (!dashboardsList) {
        dashboardsList = []
    }
    dashboardsList = dashboardsList.filter((dashboard) => {
        return dashboard.dashboardId
    })
    const dropdownMenus = dashboardsList.map((dashboard, index) => {
        return <li key={dashboard.dashboardId}><a href="#"
            onClick={e => {
                e.preventDefault()
                onDashboardDropdownListClick(dashboard.dashboardId);
            } }> {dashboard.dashboardName}</a></li>
    });
    return (
        <ul class="dropdown-menu">
            {dropdownMenus}
        </ul>
    );
};
const mapStateToProps = (state) => {
    return {
        dashboardsList: state.header.dashboardsList
    }
}
DashboardDropdown.propTypes = {
    dashboardsList: PropTypes.array
};
export default connect(mapStateToProps, null)(DashboardDropdown);