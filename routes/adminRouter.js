const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminController");
const customerController = require("../controllers/admin/customerController");
const { userAuth, adminAuth } = require("../middlewares/auth");
const categoryController = require("../controllers/admin/categoryController");
const productController = require("../controllers/admin/productController");
const multer = require('multer');

const upload = multer();

// Login
router.get("/pageerror", adminController.pageerror);
router.get("/login", adminController.loadLogin);
router.post("/login", adminController.login);
router.get("/", adminAuth, adminController.loadDashboard);
router.get("/logout", adminController.logout);

// Customer
router.get("/users", adminAuth, customerController.customerInfo);
router.get("/blockCustomer", adminAuth, customerController.customerBlocked);
router.get("/unblockCustomer", adminAuth, customerController.customerUnBlocked);

// Category
router.get("/category", adminAuth, categoryController.categoryInfo);
router.post("/addCategory", adminAuth, categoryController.addCategory);
router.put("/editCategory/:id", adminAuth, categoryController.editCategory);
router.patch("/deleteCategory/:id", adminAuth, categoryController.deleteCategory);

// Product
router.get("/addProducts", adminAuth, productController.getProductAddPage);
router.post("/saveImage", adminAuth, upload.single("image"), productController.saveImage);
router.post("/addProducts", adminAuth, upload.fields([
    { name: "image1", maxCount: 1 }, 
    { name: "image2", maxCount: 1 },     
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    ]), productController.addProducts);

router.post("/saveImage", adminAuth, upload.single('image'), productController.saveImage);
router.get("/products",adminAuth,productController.getAllProducts);
router.get("/blockProduct",adminAuth,productController.blockProduct);
router.get("/unblockProduct",adminAuth,productController.unblockProduct);
router.get('/deleteProduct',adminAuth,productController.deleteProduct);
router.get("/editProduct",adminAuth,productController.getEditProduct)

router.post("/editProduct/:id", adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), productController.editProduct);

router.post("/deleteImage",adminAuth,productController.deleteSingleImage)


module.exports = router;
