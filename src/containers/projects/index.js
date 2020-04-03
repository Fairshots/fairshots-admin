import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spinner, Input } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import { getAllProjects } from "../../actions";

const Projects = ({ allProjects, doGetProjects, token }) => {
    useEffect(() => {
        if (!(allProjects.length > 0)) {
            doGetProjects(token);
        }
    }, []);

    const columns = [
        "Title",
        "Organization.Name",
        "StartingDate",
        "Duration",
        "ApplicationDate",
        "City",
        "Country",
        "createdAt",
        "updatedAt"
    ].map(i => ({
        dataField: i,
        text: i,
        sort: true,
        style: {
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        filter: textFilter()
    }));
    const expandRow = {
        renderer: row => (
            <div>
                {Object.keys(row).map(key => (
                    <>
                        <h5>{key}</h5>
                        <Input type="textarea">{row[key]}</Input>
                    </>
                ))}
            </div>
        )
    };
    return Object.values(allProjects).length > 0 ? (
        <BootstrapTable
            keyField="id"
            data={Object.values(allProjects)}
            columns={columns}
            bootstrap4
            striped
            hover
            condensed
            rowStyle={{ height: "1em", overflow: "hidden" }}
            filter={filterFactory()}
            pagination={paginationFactory()}
            expandRow={expandRow}
        />
    ) : (
        <Spinner />
    );
};

const mapStateToProps = state => ({
    allProjects: state.project,
    token: state.auth.user.token
});
const mapDispatchToProps = dispatch => ({
    doGetProjects: token => dispatch(getAllProjects(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projects));
