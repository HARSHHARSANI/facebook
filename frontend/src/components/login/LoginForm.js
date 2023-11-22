import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput/Logininput.js";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import GenderSelect from "./GenderSelect.js";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = ({ setVisible }) => {
  const [login, setlogin] = useState(loginInfos);
  const { email, password } = login;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  // console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string().required().email("Must Be a Valid Email").max(50),
    password: Yup.string().required("Password IS Required"),
  });

  const loginSubmit = async () => {
    try {
      setloading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );

      console.log(data);

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error.response.data.message);
    }
  };

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
            onSubmit={() => {
              loginSubmit();
            }}
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
          {error && <div className="error_text">{error}</div>}
          <DotLoader color="#36d7b7" loading={loading} size={30} />

          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
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
