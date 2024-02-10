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
router.post("/contact-seller", requireSignIn, ad.contactSeller);

router.get("/user-ads", requireSignIn, ad.userAds);
router.put("/ad/:adId", requireSignIn, ad.update);
router.delete("/ad/:adId", requireSignIn, ad.remove);

router.get("/enquired-ads", requireSignIn, ad.enquiredAds);
router.get("/wishlist-ads", requireSignIn, ad.wishlistAds);

router.get("/ad/search/:searchWord", ad.search);

export default router;
