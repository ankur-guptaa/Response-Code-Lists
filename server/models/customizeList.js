import mongoose from "mongoose";

const customizeListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResCodeList",
        required: true
    }]
}, { timestamps: true });

const CustomizeList = mongoose.model("CustomizeList", customizeListSchema);

export default CustomizeList;