import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decrypt = jwt.verify(token, process.env.KEY);
        if (!decrypt)
            throw new Error("Unauthorized Access.");
        const user = await User.findOne({ userName: decrypt.userName });
        if (!user)
            throw new Error("User doesn't exist.");
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

export default protectedRoute;