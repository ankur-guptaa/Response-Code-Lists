import express from "express";
import axios from "axios";
import ResCodeList from "../models/resCodeList.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/", protectedRoute, async (req, res) => {
    try {
        let list = [];
        const deleteAll = await ResCodeList.deleteMany({});
        console.log(deleteAll);

        for (let res_code = 100; res_code < 600; res_code++) {
            try {
                const res_api = await axios.get(`https://http.dog/${res_code}.jpg`);
                const newResCode = new ResCodeList({ res_code, imgLink: `https://http.dog/${res_code}.jpg` });
                await newResCode.save();
                list.push(res_code);
            }
            catch (error) { }
        }
        try {
            const res_api = await axios.get("https://http.dog/999.jpg");
            const newResCode = new ResCodeList({ res_code: 999, imgLink: "https://http.dog/999.jpg" });
            await newResCode.save();
            list.push(999);
        }
        catch (error) { }

        res.status(200).send({ list });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

export default router;