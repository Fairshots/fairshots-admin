/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spinner, UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import { getAllPhotographers } from "../../actions";

const Photographers = ({ allPhotographers, doGetPhotographers, token }) => {
    useEffect(() => {
        if (!(allPhotographers.length > 0)) {
            doGetPhotographers(token);
        }
    }, []);

    const columns = ["Name", "Email", "Skill", "City", "Country", "createdAt", "lastLogin"].map(
        i => ({
            dataField: i,
            text: i,
            sort: true,
            style: {
                overflow: "hidden",
                whiteSpace: "nowrap"
            },
            filter: textFilter()
        })
    );
    const expandRow = {
        renderer: row => (
            <div>
                <div className="d-inline-flex">
                    <Button
                        className="btn btn-success"
                        id="toggler"
                        style={{ marginRight: "1rem" }}
                    >
                        See profile detailed info below
                    </Button>
                    <Button className="btn btn-success" style={{ marginRight: "1rem" }}>
                        Suspend user
                    </Button>
                    <Button className="btn btn-success" style={{ marginRight: "1rem" }}>
                        Delete permanently
                    </Button>
                </div>
                <UncontrolledCollapse toggler="#toggler">
                    <Card>
                        <CardBody>
                            <ul>
                                {Object.keys(row).map(key => (
                                    <li>
                                        <h5>{key}</h5>
                                        <p>
                                            {key === "createdAt" ||
                                            key === "updatedAt" ||
                                            key === "lastLogin"
                                                ? new Date(row[key]).toLocaleString()
                                                : typeof row[key] === "string"
                                                ? row[key]
                                                : JSON.stringify(row[key])}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>
            </div>
        )
    };
    return Object.values(allPhotographers).length > 0 ? (
        <BootstrapTable
            keyField="id"
            data={Object.values(allPhotographers)}
            columns={columns}
            bootstrap4
            striped
            hover
            condensed
            rowStyle={{ height: "1em", overflow: "hidden", cursor: "pointer" }}
            filter={filterFactory()}
            pagination={paginationFactory()}
            expandRow={expandRow}
        />
    ) : (
        <Spinner />
    );
};

const mapStateToProps = state => ({
    allPhotographers: state.allPhotographers,
    token: state.auth.user.token
});
const mapDispatchToProps = dispatch => ({
    doGetPhotographers: token => dispatch(getAllPhotographers(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Photographers));
