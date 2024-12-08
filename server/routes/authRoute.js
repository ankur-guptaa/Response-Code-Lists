import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, userName, password, confirmPassword } = req.body;
        if (name == "" || password == "" || userName == "")
            throw new Error("Please enter the all the info.");
        if (password != confirmPassword)
            throw new Error("Password should match the Confirm Password.");
        const user = await User.findOne({ userName });
        if (user)
            throw new Error("User already exits.");

        const salt = await bcrypt.genSalt(10);
        const encryptPass = await bcrypt.hash(password, salt);

        const newUser = new User({ name, userName, password: encryptPass, lists: [] });
        await newUser.save()
        const token = jwt.sign({ userName }, process.env.KEY, { expiresIn: "6h" });
        res.status(200).send({ userName, token });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName })
        if (!user)
            throw new Error("User doesn't exist.")
        const encryptPass = await bcrypt.compare(password, user.password);
        if (!encryptPass)
            throw new Error("Please enter correct password.");
        const token = jwt.sign({ userName }, process.env.KEY, { expiresIn: "6h" });
        res.status(200).send({ userName, token });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/me", protectedRoute, (req, res) => {
    res.status(200).send({ userName: req.user.userName });
});

export default router;