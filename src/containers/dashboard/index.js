import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Photographers from "../photographers";
import Organizations from "../organizations";
import Projects from "../projects";
import Tools from "../tools";
import Charts from "../charts";
import "./dashboard.scss";

const Dashboard = () => {
    const { path, url } = useRouteMatch();
    return (
        <Container fluid className="dashboard">
            <Row>
                <Col xl="2" md="3" className="sidebar">
                    <Nav vertical>
                        <NavItem>
                            <Link to={`${url}/charts`} href="#">
                                Charts
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${url}/photographers`} href="#">
                                Photographers
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${url}/organizations`} href="#">
                                Organizations
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${url}/projects`} href="#">
                                Projects
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${url}/tools`} href="#">
                                Tools
                            </Link>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xl="10" md="9" className="mainboard">
                    <Switch>
                        <Route path={`${path}/charts`}>
                            <Charts />
                        </Route>
                        <Route path={`${path}/photographers`}>
                            <Photographers />
                        </Route>
                        <Route path={`${path}/organizations`}>
                            <Organizations />
                        </Route>
                        <Route path={`${path}/projects`}>
                            <Projects />
                        </Route>
                        <Route path={`${path}/tools`}>
                            <Tools />
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
