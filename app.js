const express = require("express");
const app = express();
const path = require("path")
const env = require("dotenv").config();
const passport = require("./config/passport")

const session = require("express-session")
const connectDB = require('./config/db'); // Import the connectDB function
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
const userRouter = require("./routes/userRouter")
const adminRouter = require("./routes/adminRouter")
// const MongoStore = require('connect-mongo');


// Check if dotenv loaded correctly
if (env.error) {
    console.error("Error loading .env file:", env.error);
    process.exit(1); // Exit the process if .env file is not loaded
}

// Log MongoDB URI for debugging
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Connect to the database
connectDB();



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
    }
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Make user available in all views
    next();
});


app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views/user'), path.join(__dirname, 'views/admin')]);
app.use(express.static(path.join(__dirname, 'public')));


app.use("/",userRouter)
app.use("/admin",adminRouter)
// Serve the 'uploads' directory as a static folder
app.use('/uploads', express.static('uploads'));





// Start the server
const _PORT = process.env.PORT || 7000;
app.listen(_PORT, () => {
    console.log(`SERVER Running Successfully On PORT: ${_PORT}`);
});

// Export the app for testing or other modules
module.exports = app;