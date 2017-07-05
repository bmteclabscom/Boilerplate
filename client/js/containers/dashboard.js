import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../actions/user-actions';
import Services from '../utils/services';

const actionCreators = {...userActionCreators};

class Dashboard extends Component {

    componentDidMount() {
        Services.isAuthenticated().then(res => console.log(res)).catch(_ => this.goToLogin());
    }
    
    render() {
        const {logout} = this.props;
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <button onClick={_ => logout()}>logout</button>
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