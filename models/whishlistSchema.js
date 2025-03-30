const mongoose = require("mongoose")
const {Schema} = mongoose

const wishlistSchema = new Schema({


    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
})


const Whishlist = mongoose.model("Whishlist",wishlistSchema)
module.exports = Whishlist