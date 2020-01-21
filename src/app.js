import React, { Component } from "react";
import { hot, setConfig } from "react-hot-loader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Navbar, DonutSpin } from "./components/UI";
import Notifications from "./containers/notifications";
import Main from "./components/main";

class App extends Component {
    render() {
        const { isAuthenticated, loading, history, userType } = this.props;
        return (
            <div>
                <Navbar history={history} isAuthenticated={isAuthenticated} userType={userType} />
                <Main isAuthenticated={isAuthenticated} userType={userType} />
                <DonutSpin spinshow={loading} />
                <Notifications />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    isAuthenticated: state.auth.isAuthenticated,
    userType: state.auth.user.userType
});
setConfig({ pureSFC: true });
export default hot(module)(withRouter(connect(mapStateToProps)(App)));
