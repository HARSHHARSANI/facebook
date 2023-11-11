import React from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import "./style.css";
const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img
              src={process.env.PUBLIC_URL + "/icons/facebook.svg"}
              alt="Facebook Logo"
            />
            <span>
              Excepteur nostrud consectetur eu fugiat ut laborum ut
              reprehenderit ut occaecat consectetur.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik>
                {(formik) => (
                  <Form>
                    <input type="text" />
                    <input type="text" />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgot Password ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to={"/"} className="sign_extra">
              <b>Create a Page </b>
              for a celebrity , brand or business
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
