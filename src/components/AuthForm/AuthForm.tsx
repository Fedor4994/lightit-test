import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { useAppDispatch } from "../../redux/store";
import { selectIsLoading } from "../../redux/auth/auth-selectors";
import { login, register } from "../../redux/auth/auth-operations";

import { FormType } from "../../views/LoginPage/LoginPage";
import ValidityIcon from "../ValidityIcon/ValidityIcon";
import s from "./AuthForm.module.scss";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "At least 2 characters")
    .max(20, "At most 20 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .max(20, "At most 20 characters")
    .required("Password is required"),
});

const AuthForm = ({
  formType,
  handleFormChange,
}: {
  formType: FormType;
  handleFormChange: (formType: FormType) => void;
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      formType === "Login"
        ? dispatch(login(values)).then((data) => {
            if (data.meta.requestStatus === "rejected") {
              alert("Incorrect email or password");
              resetForm({
                values: {
                  username: values.username,
                  password: "",
                },
              });
            }
          })
        : dispatch(register(values)).then((data) => {
            if (data.meta.requestStatus === "rejected") {
              alert("A user with the same email already exists");
              resetForm({
                values: {
                  username: "",
                  password: "",
                },
              });
            }
          });
    },
  });

  return (
    <>
      <div className={s.background}>
        <div className={s.shape}></div>
        <div className={s.shape}></div>
      </div>

      <form onSubmit={handleSubmit} className={s.loginForm} autoComplete="off">
        <h3 className={s.loginTitle}>{formType} here</h3>
        <label className={s.loginLable}>
          Username
          <input
            className={
              values.username
                ? errors.username
                  ? s.invalidInput
                  : s.validInput
                : s.emptyInput
            }
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            type="text"
            placeholder="Enter username"
            id="username"
          />
          {values.username ? (
            errors.username ? (
              <>
                <ValidityIcon isError={true} />
                <p className={s.tooltipError}>{errors.username}</p>
              </>
            ) : (
              <>
                <ValidityIcon isError={false} />
                <p className={s.tooltipSuccess}>{"Username is valid!"}</p>
              </>
            )
          ) : (
            ""
          )}
        </label>

        <label className={s.loginLable} htmlFor="password">
          Password
          <input
            className={
              values.password
                ? errors.password
                  ? s.invalidInput
                  : s.validInput
                : s.emptyInput
            }
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type="password"
            placeholder="Enter password"
            id="password"
          />
          {values.password ? (
            errors.password ? (
              <>
                <ValidityIcon isError={true} />
                <p className={s.tooltipError}>{errors.password}</p>
              </>
            ) : (
              <>
                <ValidityIcon isError={false} />
                <p className={s.tooltipSuccess}>{"Password is valid!"}</p>
              </>
            )
          ) : (
            ""
          )}
        </label>

        <button
          disabled={
            values.username === "" ||
            Object.values(errors).length !== 0 ||
            isLoading
          }
          type="submit"
          className={s.loginButton}
        >
          {formType}
        </button>

        {formType === "Login" ? (
          <p className={s.changeFormLable}>
            Not a member?
            <button
              type="button"
              className={s.changeFormButton}
              onClick={() => handleFormChange("Register")}
            >
              Sing up now!
            </button>
          </p>
        ) : (
          <p className={s.changeFormLable}>
            Already have an account?
            <button
              type="button"
              className={s.changeFormButton}
              onClick={() => handleFormChange("Login")}
            >
              Login now!
            </button>
          </p>
        )}
      </form>
    </>
  );
};

export default AuthForm;
