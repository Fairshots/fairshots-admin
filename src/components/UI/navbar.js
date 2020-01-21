import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavbarToggler, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import "./navbar.scss";

class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    redirect = adress => () => {
        this.props.history.push(adress);
    };

    render() {
        return (
            <Navbar color="#444444" dark expand="md">
                <Link to="/" className="navbar-brand">
                    <img src="images/Fair-shotsV3.png" width="250" />
                </Link>
                <NavbarToggler onClick={this.toggleCollapse} />
                <Collapse
                    className="justify-content-between"
                    id="navbarCollapse3"
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <Nav className="align-items-center">
                        <NavItem className="navbarlink">
                            <a
                                href="https://fairshots.org"
                                className="nav-link"
                                onClick={this.toggleCollapse}
                            >
                                GO TO SITE
                            </a>
                        </NavItem>
                    </Nav>
                    <Nav className="login-handler"></Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavbarPage;
