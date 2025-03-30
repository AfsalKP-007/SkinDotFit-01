
const User = require("../models/userSchema");

const userAuth = (req, res, next) => {
    User.findById(req.user?.id)
        .then((user) => {
            if (user) {
                next();
            } else {
                res.redirect("/login");
            }
        })
        .catch((error) => {
            console.log("Error in user auth middleware:", error);
            res.status(500).send("Internal Server Error");
        });
};

  const adminAuth = (req, res, next) => {
    User.findOne({ isAdmin: true })
        .then((data) => {
            if (data) {
                next();
            } else {
                res.redirect("/admin/login");
            }
        })
        .catch((error) => {
            console.log("Error in adminAuth middleware", error);
            res.status(500).send("Internal Server Error");
        });
};







module.exports = {
    userAuth,
    adminAuth,
    
}