import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput/Logininput.js";
import * as Yup from "yup";

const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [login, setlogin] = useState(loginInfos);
  const { email, password } = login;
  // console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string().required().email("Must Be a Valid Email").max(50),
    password: Yup.string().required("Password IS Required"),
  });

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img
          src={process.env.PUBLIC_URL + "/icons/facebook.svg"}
          alt="Facebook Logo"
        />
        <span>
          Excepteur nostrud consectetur eu fugiat ut laborum ut reprehenderit ut
          occaecat consectetur.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email Address or Phone No."
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
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
  );
};

export default LoginForm;
