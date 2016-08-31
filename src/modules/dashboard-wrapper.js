import React, {Component} from 'react';
import HeaderModule from 'dashboard-app/header'
class DashboardWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {dashboardId} = this.props.params;
    return (
      <div >
        <HeaderModule.wrapper dashboardId={dashboardId} routePath={this.props.route.path}/>
        <br/><br/><br/><br/>
        {this.props.children}
      </div>
    );
  }
}
export default DashboardWrapper
