import mongoose, { ObjectId, Schema } from "mongoose";

const Image = mongoose.model("Image", new Schema(
    {
        id: { type: ObjectId },
        url: String,
        caption: String,
    },
    {
        timestamps: true,
    }
));
export default Image