// controllers/ad.js
import { nanoid } from "nanoid";
import * as config from "../config.js";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import slugify from "slugify";

export const uploadImage = async (req, res) => {
  try {
    //console.log(req.body);
    const { image } = req.body;
    if (!image) return res.status(400).send("No image");

    // prepare the image
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const type = image.split(";")[0].split("/")[1];

    // image params
    const params = {
      Bucket: "remp-real-estate-app",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload to s3
    config.AWSS3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        // console.log(data);
        res.send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Upload failed. Try again." });
  }
};

export const removeImage = async (req, res) => {
  try {
    const { Key, Bucket } = req.body;
    // upload to s3
    config.AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        // console.log(data);
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req, res) => {
  try {
    const { photos, description, address, price, type } = req.body;

    if (!photos?.length) {
      return res.json({ error: "Photos are required" });
    }
    if (!price) {
      return res.json({ error: "Price is required" });
    }
    if (!type) {
      return res.json({ error: "Is property house or land?" });
    }
    if (!address) {
      return res.json({ error: "Address is required" });
    }
    if (!description) {
      return res.json({ error: "Description is required" });
    }

    const ad = await new Ad({
      ...req.body,
      slug: slugify(`${type}-${address}-${price}-${nanoid(6)}`),
      postedBy: req.user._id,
    }).save();

    // make user role to Seller

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { role: "Seller" },
      },
      { new: true }
    );
    user.password = undefined;
    user.resetCode = undefined;
    res.json({
      ad,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try later." });
  }
};

export const ads = async (req, res) => {
  try {
    const adsForSell = await Ad.find({ action: "Sell", published: true })
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket")
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 })
      .limit(12);

    const adsForRent = await Ad.find({ action: "Rent", published: true })
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket")
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({ adsForSell, adsForRent });
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const { slug } = req.params;

    const ad = await Ad.findOne({ slug })
      // .select("-photos.Key -photos.key -photos.ETag -photos.Bucket")
      .populate("postedBy", "name username email phone company photo.Location");

    res.json({ ad });
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { wishList: req.body.adId },
      },
      { new: true }
    );
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (error) {
    console.log(err);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishList: req.params.adId },
      },
      { new: true }
    );
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (error) {
    console.log(err);
  }
};
