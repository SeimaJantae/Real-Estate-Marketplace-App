import mongoose from "mongoose";
const { Schema, ObjectId, model } = mongoose;

const adSchema = new Schema(
  {
    photos: [{}],
    price: {
      type: Number,
      maxLength: 255,
    },
    address: {
      type: String,
      required: true,
      maxLength: 255,
    },

    title: {
      type: String,
      maxLength: 255,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {},
    postedBy: { type: ObjectId, ref: "User" },
    sold: { type: Boolean, default: false },
    published: { type: Boolean, default: true },

    type: {
      type: String,
      default: "Other", // House, Land, Appartment
    },
    action: {
      type: String,
      default: "Sell",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model("Ad", adSchema);
