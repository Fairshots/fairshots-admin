import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllPhotographers } from "../../actions";

const Photographers = ({ allPhotographers, doGetPhotographers, token }) => {
    useEffect(() => {
        if (!allPhotographers.photographers) {
            doGetPhotographers(token);
        }
    }, []);

    return ({allPhotographers.photographers && <div>{allPhotographers.photographers}</div>});
};

const mapStateToProps = state => ({
    allPhotographers: state.allPhotographers,
    token: state.auth.user.token
});
const mapDispatchToProps = dispatch => ({
    doGetPhotographers: token => dispatch(getAllPhotographers(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Photographers));
