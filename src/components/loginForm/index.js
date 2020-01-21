import React from "react";
import { Input, Form, FormGroup, FormFeedback, Button, Row } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginForm(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Row className="justify-content-center">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-2" style={{ width: "50%" }}>
                    <Input
                        type="email"
                        name="email"
                        id="Email"
                        placeholder="E-mail"
                        value={props.email}
                        onChange={props.handleChange}
                        invalid={props.errorMessage !== ""}
                    />
                </FormGroup>
            </Row>
            <Row className="justify-content-center">
                <FormGroup className="form-group mb-2 mr-sm-2 mb-sm-2" style={{ width: "50%" }}>
                    {!props.forgotPass && (
                        <Input
                            type="password"
                            name="password"
                            id="Password"
                            placeholder="Password"
                            value={props.password}
                            onChange={props.handleChange}
                            invalid={props.errorMessage !== ""}
                        />
                    )}
                    <FormFeedback>{props.errorMessage}</FormFeedback>
                </FormGroup>
            </Row>
            <Row className="justify-content-center">
                {props.forgotPass && (
                    <p
                        className={props.notification ? "text-success" : "text-danger"}
                    >{`${props.notification || props.errorMessage}`}</p>
                )}
            </Row>
            <Row className="justify-content-center m-2">
                <Button className="col-6" type="submit" color="success" style={{ width: "50%" }}>
                    {props.forgotPass ? "Send me an e-mail" : "Login"}
                </Button>
            </Row>
        </Form>
    );
}
