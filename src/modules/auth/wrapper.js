import React, {Component} from 'react';
import AuthComponents from './components'
import { withRouter } from 'react-router'
import {connect} from 'react-redux';
import * as Actions  from './actions'
import {userLoginThunk, userLogoutThunk} from './thunks'
class AuthContainer extends Component {
    constructor(props) {
        super(props)
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
    }
    componentDidMount() {
        this.props.dispatch(userLogoutThunk());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.Auth.active) {
            nextProps.router.push('/view')
        }
    }
    onLoginSubmit(userData) {
        this.props.dispatch(userLoginThunk(userData));
    }
    render() {
        const {active, error} = this.props.Auth;
        return (
            <AuthComponents.UserLogin active={active} error={error} onLoginSubmit={this.onLoginSubmit} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        Auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, null)(AuthContainer))