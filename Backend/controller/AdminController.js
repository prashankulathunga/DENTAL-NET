import AdminSchema from "../model/AdminSchema.js";
import bcrypt from "bcrypt";
import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();

const secretKey = process.env.SECRET_KEY;
const salt = 10;

const signup = async (req, resp) => {
  try {
    // Check if the email already exists
    await AdminSchema.findOne({ email: req.body.email }).then((user) => {
      if (user) return resp.status(400).send("Email already exists");
    });

    const hash = await bcrypt.hash(req.body.password, salt);

    const admin = new AdminSchema({
      fullname: req.body.password,
      email: req.body.email,
      password: hash,
    });
    await admin
      .save()
      .then(() => {
        resp.status(201).send("Admin created successfully");
      })
      .catch((error) => {
        resp.status(400).send(error.message);
      });
  } catch (error) {
    return resp.status(500).send(error.message);
  }
};

const login = async (req, resp) => {
  // TODO: Implement login functionality

  // Check if the email exists

  // Compare the password
  // If passwords match, generate a token and send it to the user
  // If passwords don't match, send an error message
  // If the email doesn't exist, send an error message
  // If there's an error, send an error message

  try {
    const existsEmail = await AdminSchema.findOne({ email: req.body.email });

    if (!existsEmail) return resp.status(400).send("Email not found");

    const isConfirm = await bcrypt.compare(
      req.body.password,
      existsEmail.password
    );
    if (isConfirm) {
      const token = jwt.sign(
        {
          id: existsEmail._id,
          email: existsEmail.email,
          fullname: existsEmail.fullname,
        },
        secretKey,
        { expiresIn: "2h" }
      );
      return resp.status(200).json({ token: token });
    } else {
      return resp.status(401).json({ message: "Invalid credentials" });
    }

    if (!isConfirm) {
      return resp(400).json({ message: "password is not match" });
    }
  } catch (e) {
    return resp.status(500).send(e.message);
  }
};

export default { signup, login };
