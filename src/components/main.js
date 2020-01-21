import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from "../containers/home";
import Dashboard from "../containers/dashboard";

export default function Main(props) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <main>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
        </main>
    );
}
