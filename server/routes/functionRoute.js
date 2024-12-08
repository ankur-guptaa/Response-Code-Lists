import express from "express";
import ResCodeList from "../models/resCodeList.js";
import protectedRoute from "../middleware/protectedRoute.js";
import CustomizeList from "../models/customizeList.js";
import User from "../models/userModel.js";

const router = express.Router();

let resCodeList = [];

const add_digit = (list, digit) => {
    let temp_list = [...list];
    for (let i = 0; i < temp_list.length; i++)
        temp_list[i] = (temp_list[i] * 10) + Number(digit);

    return temp_list;
}

router.post("/search", protectedRoute, async (req, res) => {
    try {
        const res_codes = req.body.res_codes;
        let finalList = [];

        for (let i = 0; i < res_codes.length; i++) {
            if (res_codes[i].length == 3) {
                let list = [0];

                for (let j = 0; j < res_codes[i].length; j++) {
                    if (res_codes[i][j] >= '0' && res_codes[i][j] <= '9') {
                        list = add_digit(list, res_codes[i][j]);
                    }
                    else if (res_codes[i][j] == 'x') {
                        const temp_list = [...list];
                        for (let k = 0; k <= 9; k++) {
                            if (k == 0)
                                list = add_digit(list, k);
                            else
                                list = list.concat(add_digit(temp_list, k));
                        }
                    }
                    else {
                        throw new Error("Response Code is invalid.");
                    }
                }
                finalList = finalList.concat(list);
            }
        }

        resCodeList = await ResCodeList.find({ res_code: { $in: finalList } });
        if (resCodeList.length == 0)
            throw new Error("The corresponding response code doesn't exist in the Database.");

        let customizeList = [];
        resCodeList.forEach((element, index) => {
            customizeList.push(element._id);
        })
        res.status(200).send({ resCodeList, customizeList });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/savelist", protectedRoute, async (req, res) => {
    try {
        const name = req.body.listName;
        const customizeList = req.body.customizeList;
        if (customizeList.length == 0)
            throw new Error("First create the list and then try to save it.");
        if (!name)
            throw new Error("Please enter the list name.");

        const newCustomizeList = new CustomizeList({ name, list: customizeList });
        await newCustomizeList.save();
        const updateUser = await User.updateOne({ _id: req.user._id }, { $push: { lists: newCustomizeList._id } });
        res.status(200).send(newCustomizeList);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/lists", protectedRoute, async (req, res) => {
    try {
        const populatedList = await User.findById(req.user._id).populate({
            path: "lists",
            populate: {
                path: "list"
            }
        });
        res.status(200).send({ userName: populatedList.userName, lists: populatedList.lists });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/delete", protectedRoute, async (req, res) => {
    try {
        const objectId = req.query.objectId;
        const deleteList = await CustomizeList.deleteOne({ _id: objectId });
        if (deleteList.deletedCount == 1) {
            const updateUserList = await User.updateOne({ _id: req.user._id }, { $pull: { lists: objectId } });
        }

        const populatedList = await User.findById(req.user._id).populate({
            path: "lists",
            populate: {
                path: "list"
            }
        });
        res.status(200).send({ userName: populatedList.userName, lists: populatedList.lists });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

export default router;