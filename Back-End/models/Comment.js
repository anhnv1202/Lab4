import mongoose, { ObjectId, Schema } from "mongoose";
const Comment = mongoose.model("Comment", new Schema(
    {
        id: { type: ObjectId },
        userId: Number,
        text: String,
    },
    {
        timestamps: true,
    }
));
export default Comment