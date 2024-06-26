import User from "../models/user";
import jwt from "jsonwebtoken";
import { loginValidationSchema } from "../validation/loginValidation";
import dbMiddleware from "../utils/middleware/dbMiddleware";

const handleErrors = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

const handleSuccess = (res, status, message, token = null) => {
  res.status(status).json({ success: true, message, token });
};

export default async function handler(req, res) {
  await dbMiddleware(req, res, async () => {
  if (req.method === "POST") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*"); // You might want to restrict this to a specific origin
    try {
      const { error, value } = loginValidationSchema.validate(req.body);
      if (error) {
        handleErrors(res, 400, error.details[0].message);
        return;
      }
      const { email, password } = value;

      
      const user = await User.findOne({ email });
      if (!user) {
        handleErrors(res, 401, "User Not Found, Enter valid Email");
        return;
      }
      if (user.password !== password) {
        handleErrors(res, 401, "Invalid  Password");
        return;
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      handleSuccess(res, 200, "Login successfully", token);
    } catch (error) {
      console.error(error);
      handleErrors(res, 500, "Internal Server Error");
    }
  } else {
    handleErrors(res, 405, "Method Not Allowed");
  }
})
}
