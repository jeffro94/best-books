import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { authenticationService, userService } from "../_services";

class Register extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) { 
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    document.title = "Best Books! - Register";
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h2>Register</h2>
          <hr />
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            validationSchema={Yup.object().shape({ /* https://github.com/jaredpalmer/formik/issues/90 */
              username: Yup.string().required("Username is required"),
              email: Yup.string().email("Email address is not valid"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .required("Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required")
            })}
            onSubmit={async ({ username, email, password }, { setStatus, setSubmitting }) => {
              setStatus();
              try {
                await userService.register(username, email, password);
                await authenticationService.login(username, password);
                this.props.history.push("/");
              }
              catch(error) {
                setSubmitting(false);
                setStatus(error.message);
              }
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className={"form-control" + (errors.username && touched.username ? " is-invalid" : "")} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address (optional)</label>
                  <Field name="email" type="email" className={"form-control" + (errors.email && touched.email ? " is-invalid" : "")} />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className={"form-control" + (errors.password && touched.password ? " is-invalid" : "")} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirm password</label>
                  <Field name="confirmPassword" type="password" className={"form-control" + (errors.confirmPassword && touched.confirmPassword ? " is-invalid" : "")} />
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                  {isSubmitting &&
                    <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                </div>
                {status &&
                  <div className={"alert alert-danger"}>{status}</div>
                }
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Register; 