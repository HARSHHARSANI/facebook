import { Form, Formik } from "formik";
import RegisterInput from "../inputs/registerInput/RegisterInput.js";
import { useState } from "react";

const RegisterForm = () => {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  console.log(new Date().getFullYear());
  const [user, setuser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bDay,
    bMonth,
    bYear,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  console.log(user);

  const years = Array.from(new Array(60), (val, index) => bYear - index);
  console.log(years);

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
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="other">
                    Other
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
                <div className="reg_infos">
                  By clicking Sign up , You agree to ou{" "}
                  <span>Terms And Data Policy &nbsp;</span>and{" "}
                  <span>Cookie Policy</span>You May recieve SMS notification
                  from us and can opt out at any time
                </div>
                <div className="reg_btn_wrapper">
                  <button className="blue_btn open_signup">Sign Up</button>{" "}
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
