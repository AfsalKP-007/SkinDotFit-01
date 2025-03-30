const express = require("express");
const router = express.Router();
const passport = require("passport")
const userController = require("../controllers/user/userController");
const profileController = require("../controllers/user/profileController")
const productController = require("../controllers/user/productController")
const staticController = require("../controllers/user/staticController")


router.get("/pageNotFound", userController.pageNotFound);

router.get("/", userController.loadHomePage);
router.get("/shop", userController.loadShoppingPage);
router.get("/contactUs", userController.loadShoppingPage);

router.get("/signup", userController.loadSignup);
router.post("/signup",userController.signup)

router.get("/verifyOtp",userController.loadOtp)
router.post("/verify-otp",userController.verifyOtp)

router.post("/resend-otp",userController.resendOtp)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signup' }), async (req, res) => {
    try {
        req.session.user = req.user._id;
        res.redirect('/');
    } catch (error) {
        console.log("Google login error:", error);
        res.redirect('/signup');
        }
});


router.get("/login", userController.loadLoginPage )
router.post("/login", userController.login )
router.get("/logout", userController.logout )

router.get("/forgot-password", profileController.getForgotPassPage )
router.post("/forgot-email-valid",profileController.forgotEmailValid)
router.post("/verify-passForgot-otp",profileController.verifyForgotPassOtp)

router.get("/reset-password",profileController.getResetPassPage)
router.post("/resend-forgot-otp",profileController.resendOtp);
router.post("/reset-password",profileController.postNewPassword);



router.get("/productDetails",productController.productDetails);


// Static Pages

router.get("/about",staticController.loadAbout)
router.get("/contact",staticController.loadContact)



router.get("/shop",userController.loadShoppingPage);
router.get('/shop/search', userController.searchProducts);
router.get('/shop/filter', userController.filterProduct);









module.exports = router;

