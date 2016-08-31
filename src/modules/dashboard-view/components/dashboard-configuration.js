import React, {Component} from 'react';
import {DEFAULT_DASHBOARD_NAME} from 'dashboard-app/config/axios-endpoints'
class DashboardConfiguration extends Component {
    constructor(props) {
        super(props);
        this.saveDashboardInternal = this.saveDashboardInternal.bind(this)
    }
    saveDashboardInternal() {
        let dashboardName = this.props.dashboardName;
        if (this.props.dashboardInEditMode) {
            dashboardName = this.refs._dashboardName.value ? this.refs._dashboardName.value : DEFAULT_DASHBOARD_NAME;
        }
        this.props.saveDashboard(dashboardName)
    }
    render() {
        const {dashboardInEditMode, status, dashboardName, saveDashboard, createDashboard, removeDashboard} = this.props
        const statusWrapperStyle = {
            padding: '5px',
            marginBottom: '0'
        }
        const dashboardNameLabelWrapper = {
            paddingRight: 0
        }
        return (
            <div class="row">
                <div class="col-xs-4">
                    { dashboardInEditMode ? <div class="row"><div style={dashboardNameLabelWrapper} class="col-md-4"> <label>Dashboard Name: </label></div><div class="col-md-8"><input  class="form-control custom-font-control-input" type="text" ref="_dashboardName" defaultValue={dashboardName}/> </div></div> : <label>Dashboard Name: {dashboardName} </label> }
                </div>
                <div class="col-xs-4">
                    {status.message ? <div style={statusWrapperStyle} class={status.class}> {status.message}</div> : null}
                </div>
                <div class="col-xs-4">
                    <div class="pull-right btn-toolbar" >
                        <i title="Save Dashboard" onClick={this.saveDashboardInternal} class="fa fa-floppy-o dashboard-configuration-icons"></i>
                        { !dashboardInEditMode ? <i title="Delete Dashboard" onClick={removeDashboard}  class="fa fa-trash-o dashboard-configuration-icons"></i> : null}
                        { !dashboardInEditMode ? <i title="Create Dashboard" onClick={createDashboard} class="fa fa-plus dashboard-configuration-icons"></i> : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default DashboardConfiguration;
