import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {strings} from '../utils/strings';
import * as userActionCreators from '../actions/user-actions';
import Services from '../utils/services';

const actionCreators = {...userActionCreators};

class Dashboard extends Component {
    
    componentDidUpdate() {
        const {user} = this.props;
        if (!user.isUserLogged) {
            this.goToLogin();
        }
    }

    render() {
        const {logout, user} = this.props;
        return (
            <div className="dashboard">
                <div className="container-fluid">
                    <div className="row-fluid">
                        <div className="col-md-12">
                            <nav className="navbar navbar-default">
                                <div className="container-fluid">
                                    <div className="navbar-header">
                                        <a className="navbar-brand" href="#">
                                            <img alt="Brand" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAB+0lEQVR4AcyYg5LkUBhG+1X2PdZGaW3btm3btm3bHttWrPomd1r/2Jn/VJ02TpxcH4CQ/dsuazWgzbIdrm9dZVd4pBz4zx2igTaFHrhvjneVXNHCSqIlFEjiwMyyyOBilRgGSqLNF1jnwNQdIvAt48C3IlBmHCiLQHC2zoHDu6zG1iXn6+y62ScxY9AODO6w0pvAqf23oSE4joOfH6OxfMoRnoGUm+de8wykbFt6wZtA07QwtNOqKh3ZbS3Wzz2F+1c/QJY0UCJ/J3kXWJfv7VhxCRRV1jGw7XI+gcO7rEFFRvdYxydwcPsVsC0bQdKScngt4iUTD4Fy/8p7PoHzRu1DclwmgmiqgUXjD3oTKHbAt869qdJ7l98jNTEblPTkXMwetpvnftA0LLHb4X8kiY9Kx6Q+W7wJtG0HR7fdrtYz+x7iya0vkEtUULIzCjC21wY+W/GYXusRH5kGytWTLxgEEhePPwhKYb7EK3BQuxWwTBuUkd3X8goUn6fMHLyTT+DCsQdAEXNzSMeVPAJHdF2DmH8poCREp3uwm7HsGq9J9q69iuunX6EgrwQVObjpBt8z6rdPfvE8kiiyhsvHnomrQx6BxYUyYiNS8f75H1w4/ISepDZLoDhNJ9cdNUquhRsv+6EP9oNH7Iff2A9g8h8CLt1gH0Qf9NMQAFnO60BJFQe0AAAAAElFTkSuQmCC"/>
                                        </a>
                                    </div>
                                    <div className="collapse navbar-collapse" id="navbar">
                                        <p className="navbar-text">Welcome {user.attributes.username}</p>
                                        <p className="navbar-text navbar-right">
                                            <a href="#" onClick={_ => logout()} className="navbar-link">{strings.buttonLabelLogout}</a></p>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="row-fluid">
                        <div className="col-md-3">
                            <ul className="nav nav-pills nav-stacked">
                                <li className="active"><a href="#">Home</a></li>
                                <li><a href="#">Organizations</a></li>
                                <li><a href="#">Profile</a></li>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    goToLogin() {
        this.props.history.push('/');
    }
}

function mapStateToProps(state) { // maps redux state to MyProfile component props
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) { // maps redux actions to MyProfile component props
     return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));