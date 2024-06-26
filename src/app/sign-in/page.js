"use client";
import { useState } from "react";
import InputBox from "common/Inputbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setToken } from "helpers/utils";
import { toast } from "react-toastify";
import { unMountStore } from "services/user";
import { useDispatch } from "react-redux";
const initialValues = {
  email: "",
  password: "",
};

const FormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: FormSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await axios.post(`${apiUrl}users`, values);
          const token = response?.data?.token;
          setToken(token);
          dispatch(unMountStore());
          router.push("/");
        } catch (error) {
          const errMsg =
            error?.response?.data?.message ||
            "An error occurred. Please try again.";
          toast.error(errMsg);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <>
      <div className="h-screen flex justify-center items-center mx-3.5">
        <div className="w-[300px]">
          <h1 className="mb-10 text-center">Sign in</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-6">
              <InputBox
                className={`inputbox ${
                  errors.email && touched.email ? "border border-error" : ""
                }`}
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                {errors.email && touched.email ? (
                  <p className="form-error text-error mt-2 ms-1">
                    {errors.email}
                  </p>
                ) : null}
              </span>
            </div>

            <div className="mb-6 pb-5">
              <InputBox
                className={`inputbox ${
                  errors.password && touched.password
                    ? "border border-error"
                    : ""
                }`}
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                {errors.password && touched.password ? (
                  <p className="form-error text-error mt-2 ms-1">
                    {errors.password}
                  </p>
                ) : null}
              </span>
            </div>

            <button
              className="button"
              type="submit"
              disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
