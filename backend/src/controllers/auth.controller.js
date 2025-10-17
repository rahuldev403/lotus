import { sendWelcomeEmail } from "../emails/emailHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all feilds are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password length must be more than 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[&\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "invalid email" });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashePassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashePassword });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      //send a welcome email to user

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL
        );
      } catch (error) {
        console.log("failed to send welcome email", error);
      }
    } else {
      return res.status(400).json({ message: "user creation failed" });
    }
  } catch (error) {
    console.log("error in signup controller");
    res.status(500).json({ message: "internal server error" });
  }
};
