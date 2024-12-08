import mongoose from "mongoose";

const resCodeListSchema = new mongoose.Schema({
    res_code: {
        type: Number,
        required: true,
        index: true
    },
    imgLink: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ResCodeList = mongoose.model("ResCodeList", resCodeListSchema);

export default ResCodeList;