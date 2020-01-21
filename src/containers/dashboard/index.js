import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

import "./dashboard.scss";

const Dashboard = () => (
    <Container fluid className="dashboard">
        <Row>
            <Col xl="2" md="3" className="sidebar">
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#">Charts</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Photographers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Organizations</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Projects</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Tools</NavLink>
                    </NavItem>
                </Nav>
            </Col>
            <Col xl="10" md="9" className="mainboard"></Col>
        </Row>
    </Container>
);

export default Dashboard;
