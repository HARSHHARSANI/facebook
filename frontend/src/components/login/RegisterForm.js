import { Form, Formik } from "formik";
import RegisterInput from "../inputs/registerInput/RegisterInput.js";
import { useState } from "react";
import * as Yup from "yup";

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

  // console.log(new Date().getFullYear());
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

  // console.log(user);
  const yearTemp = new Date().getFullYear();

  const years = Array.from(new Array(60), (val, index) => yearTemp - index);

  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  // console.log(getDays());

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("First name is Required")
      .min(2, "First must be between 2 and 16 charecters")
      .max(16, "first must be between 2 and 16 charecters")
      .matches(/^[aA-zZ]+$/, "Numbers and Special charecters are not allowed"),

    last_name: Yup.string()
      .required("Last name is Required")
      .min(2, "last must be between 2 and 16 charecters")
      .max(16, "last must be between 2 and 16 charecters")
      .matches(/^[aA-zZ]+$/, "Numbers and Special charecters are not allowed"),

    email: Yup.string()
      .required(
        "you will need this to login and you ever need to reset your password"
      )
      .email("Must Be a Valid Email")
      .max(50),

    password: Yup.string()
      .required("Password Is Required")
      .min(
        6,
        "password must be atleast 6 charecter long and maximum 35 charecter long"
      )
      .max(
        35,
        "password must be atleast 6 charecter long and maximum 35 charecter long"
      ),

    bDay: Yup.string().required("bDay Is Required"),

    bMonth: Yup.string().required("bMonth Is Required"),

    bYear: Yup.string().required("bYear Is Required"),

    gender: Yup.string().required("gender Is Required"),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bDay,
            bMonth,
            bYear,
            gender,
          }}
          validationSchema={registerValidation}
        >
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
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
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
