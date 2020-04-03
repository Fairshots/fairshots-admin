import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import { getAllOrgs } from "../../actions";

const Orgs = ({ allOrgs, doGetOrgs, token }) => {
    useEffect(() => {
        if (!(allOrgs.length > 0)) {
            doGetOrgs(token);
        }
    }, []);

    const columns = ["Name", "Email", "City", "Country", "createdAt", "updatedAt"].map(i => ({
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
                        <p>{JSON.stringify(row[key])}</p>
                    </>
                ))}
            </div>
        )
    };
    return Object.values(allOrgs).length > 0 ? (
        <BootstrapTable
            keyField="id"
            data={Object.values(allOrgs)}
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
    allOrgs: state.allOrgs,
    token: state.auth.user.token
});
const mapDispatchToProps = dispatch => ({
    doGetOrgs: token => dispatch(getAllOrgs(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orgs));
