import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    passworld: {
      type: String,
      required: true,
      maxLenght: 256,
    },
    address: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    photo: {},
    role: {
      type: [String],
      default: ["Buyer"],
      enum: ["Buyer", "Seller", "Admin"],
    },
    enquiredProperties: [{ type: ObjectId, ref: "Ad" }],
    wishList: [{ type: ObjectId, ref: "Ad" }],
    resetCode: "",
  },
  { timestamps: true }
);

export default model("User", schema);
