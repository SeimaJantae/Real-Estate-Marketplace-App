import express from "express";
import * as ad from "../controllers/ad.js";
import { requireSignIn } from "../middlewares/auth.js";

const router = express.Router();
router.post("/upload-image", requireSignIn, ad.uploadImage);
router.post("/remove-image", requireSignIn, ad.removeImage);
router.post("/ad", requireSignIn, ad.create);
router.get("/ads", ad.ads);
router.get("/ad/:slug", ad.read);

router.post("/wishlist", requireSignIn, ad.addToWishlist);
router.delete("/wishlist/:adId", requireSignIn, ad.removeFromWishlist);

export default router;
