import React, {PropTypes} from 'react';
const Navbar = props => {
    const {onLogOutClick} = props;
    return (
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">DASHBOARDS</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dashboards <span class="caret"></span></a>
                            {props.children}
                        </li>
                        <li><a href="#" onClick={e => {
                            e.preventDefault()
                            onLogOutClick();
                        } }>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
Navbar.propTypes = {

};
export default Navbar;