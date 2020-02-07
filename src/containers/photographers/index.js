import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
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

    const columns = ["Name", "Email", "Skill", "City", "Country", "createdAt", "updatedAt"].map(
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
                {Object.keys(row).map(key => (
                    <>
                        <h5>{key}</h5>
                        <p>{JSON.stringify(row[key])}</p>
                    </>
                ))}
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
    allPhotographers: state.allPhotographers,
    token: state.auth.user.token
});
const mapDispatchToProps = dispatch => ({
    doGetPhotographers: token => dispatch(getAllPhotographers(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Photographers));
