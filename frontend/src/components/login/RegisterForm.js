import { Form, Formik } from "formik";
import RegisterInput from "../inputs/registerInput/RegisterInput.js";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import DateOfBirthSelect from "./DateOfBirthSelect.js";
import DotLoader from "react-spinners/DotLoader";
import GenderSelect from "./GenderSelect.js";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setVisible }) => {
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

  const years = Array.from(new Array(80), (val, index) => yearTemp - index);

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
  });

  const [genderError, setGenderError] = useState("");
  const [dateError, setdateError] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { first_name, last_name, email, password, bYear, bMonth, bDay, gender }
      );
      seterror("");
      setsuccess(data.message);
      const { message, ...rest } = data;

      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setloading(false);
      setsuccess("");
      seterror(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            className="exit_icon"
            onClick={() => {
              setVisible(false);
            }}
          ></i>
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
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (
              currentDate - pickedDate < atleast14 ||
              currentDate - pickedDate > noMoreThan70
            ) {
              setdateError(
                "It looks like you have entered wrong info . Please make sure that you use your real date of birth"
              );
            } else if (gender === "") {
              setdateError("");
              setGenderError(
                "Please Choose a gender , you can change who can see this later"
              );
            } else {
              setdateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
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
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign up , You agree to ou{" "}
                <span>Terms And Data Policy &nbsp;</span>and{" "}
                <span>Cookie Policy</span>
                You May recieve SMS notification from us and can opt out at any
                time
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>{" "}
              </div>
              <DotLoader color="#36d7b7" loading={loading} size={30} />

              {error && <div className="error_text">{error} </div>}
              {success && <div className="success_text">{success} </div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
