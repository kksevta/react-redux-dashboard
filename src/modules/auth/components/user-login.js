import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
        this.onInputPasswodKeyUp = this.onInputPasswodKeyUp.bind(this)
    }
    onLoginSubmit() {
        var userData = {
            username: this.refs._username.value,
            password: this.refs._password.value
        }
        this.props.onLoginSubmit(userData);
    }
    onInputPasswodKeyUp(event) {
        if (event.keyCode == '13') {
            this.onLoginSubmit();
        }
    }
    render() {
        const {error, active} = this.props;
        let status;
        if (error.errorText) {
            status = <div class="alert alert-danger">{error.errorText}</div>
        }
        return (
            <div class="row">
                <div class="col-sm-6 col-md-4 col-md-offset-4">
                    <h1 class="text-center login-title">Sign in to continue</h1>
                    <div class="account-wall text-center">
                        <i class="fa fa-exclamation-triangle fa-4x"></i>
                        <div class="form-signin">
                            <input type="text" class="form-control" ref="_username" placeholder="Username" required/>
                            <input type="password" onKeyUp={this.onInputPasswodKeyUp} class="form-control" ref="_password" placeholder="Password" required/>
                            <button class="btn btn-lg btn-primary btn-block" onClick={this.onLoginSubmit}>
                                Sign in</button>
                        </div>
                        {status}
                    </div>
                </div>
            </div>
        )
    }
}
export default UserLogin