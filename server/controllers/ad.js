// controllers/ad.js
import { nanoid } from "nanoid";
import * as config from "../config.js";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import slugify from "slugify";
import { emailTemplate } from "../helpers/email.js";
import ad from "../models/ad.js";

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

export const contactSeller = async (req, res) => {
  try {
    const { name, email, message, phone, adId } = req.body;
    const ad = await Ad.findById(adId).populate("postedBy", "email");

    const user = await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enquiredProperties: adId },
    });

    if (!user) {
      return res.json({ error: "Could not find user with that email" });
    } else {
      // send email
      config.AWSSES.sendEmail(
        emailTemplate(
          ad.postedBy.email,
          ` <h4> Customer details </h4>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p> 
          <p>Phone: ${phone}</p>
          <p>Message: ${message}</p>
          <p>You have received a new consumer contact</p>
        <a href = "${config.CLIENT_URL}/ad/${ad.slug}">View property ${ad.type} for ${ad.action}: ${ad.title}</a>`,
          email,
          "New contact received"
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ ok: false });
          } else {
            console.log(data);
            return res.json({ ok: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const userAds = async (req, res) => {
  try {
    const ads = await Ad.find({ postedBy: req.user._id })
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 });

    res.json({ ads, total: ads.length });
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req, res) => {
  try {
    const { photos, address, price, title, description, type } = req.body;
    const ad = await Ad.findById(req.params.adId);
    const owner = req.user._id == ad?.postedBy;
    if (!owner) {
      return res.json({ error: "Permission denide" });
    } else {
      // validation
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
      await ad.updateOne({ ...req.body, slug: ad.slug });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.adId);
    const owner = req.user._id == ad?.postedBy;

    if (!owner) {
      return res.json({ error: "Permission denied" });
    } else {
      await Ad.findByIdAndRemove(ad._id);
      return res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const enquiredAds = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const ads = await Ad.find({ _id: user.enquiredProperties }).sort({ createdAt: -1 });
    res.json({ ads: ads });
  } catch (error) {
    console.log(error);
  }
};

export const wishlistAds = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const ads = await Ad.find({ _id: user.wishList }).sort({ createdAt: -1 });
    res.json({ ads: ads });
  } catch (error) {
    console.log(error);
  }
};

export const search = async (req, res) => {
  try {
    const { searchWord } = req.params;
    console.log(searchWord);
    const adsForSell = await Ad.find({ $text: { $search: searchWord }, action: "Sell" })
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket")
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 })
      .limit(12);

    const adsForRent = await Ad.find({ $text: { $search: searchWord }, action: "Rent" })
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket")
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({ adsForSell, adsForRent });
  } catch (err) {
    console.log(err);
  }
};
