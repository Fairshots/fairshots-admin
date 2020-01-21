import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import LoginForm from "../../components/loginForm";
import { login } from "../../actions";

import "./home.scss";

class Home extends Component {
    state = {
        item: "images/hero-shot.jpg",
        item_mobile: "images/Fairshots-mobile-slideshow-02.jpg",
        screenSize: 1024,
        email: "",
        password: ""
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
        if (this.props.errorMessage || this.props.notification) {
            setTimeout(() => this.props.clearMessages(), 5000);
        }
    }

    updateWindowDimensions = () => {
        this.setState({ screenSize: window.innerWidth });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const form = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.doLogin(form);
    };

    render() {
        return (
            <div className="hero-slider">
                {this.state.screenSize > 768 && <div className="darken" />}
                <Container fluid>
                    <img
                        src={this.state.screenSize > 768 ? this.state.item : this.state.item_mobile}
                    />
                </Container>

                <div className="hero-text-holder justify-content-center row w-50">
                    {this.state.screenSize > 768 && (
                        <div>
                            <h1 className="hero-sentence">Admin Page</h1>
                            <h2 className="hero-undertitle mb-5">Enter Dashboard</h2>
                        </div>
                    )}
                    <LoginForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        errorMessage={this.props.errorMessage}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
    notification: state.auth.notification
});

const mapDispatchToProps = dispatch => ({
    doLogin: formProps => {
        dispatch(login(formProps));
    },

    clearMessages: () => dispatch({ type: "AUTH_RESETMESSAGES" }),
    notify: message => dispatch({ type: "AUTH_ERROR", payload: message })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
