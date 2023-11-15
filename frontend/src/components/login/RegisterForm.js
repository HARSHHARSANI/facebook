import { Form, Formik } from "formik";
import RegisterInput from "../inputs/registerInput/RegisterInput.js";
import { useState } from "react";

const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};

const RegisterForm = () => {
  const [user, setuser] = useState(userInfos);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik>
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  placeholder="Mobile Number or Email Address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date Of Birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay">
                    <option value="">15</option>
                  </select>
                  <select name="bMonth">
                    <option value="">15</option>
                  </select>
                  <select name="bYear">
                    <option value="">15</option>
                  </select>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
