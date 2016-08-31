import React, {Component} from 'react';
import { withRouter } from 'react-router'
import AuthModule from  './auth'
class AppWrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    AuthModule.model.isAuthenticated().then((response) => {
      if (response.data.authenticated) {
        if (window.location.pathname == "/") {  
          this.props.router.push('/view')
        }
      } else {
        this.props.router.push('/login')
      }
    }).catch((response) => {
      console.log(response)
      this.props.router.push('/login')
    })
  }

  render() {
    return (
      <div id="container" class="container-fluid">
        {this.props.children}
      </div>
    );
  }
}
export default withRouter(AppWrapper);