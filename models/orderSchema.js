const mongoose = require("mongoose")
const {Schema} = mongoose
const {v4:uuidv4} = require("uuid")
const Address = require("./addressSchema")

const orderSchema = new Schema({

    orderId:{
        type:String,
        default:() => uuidv4(),
        unique:true
    },
    items:[{
      productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
      },
      qty:{
        type:Number,
        rquired: true
      },
      tprice:{
        type:Number,
        required:true
      }
    }],

    totalPrice:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        required:true
    },
    finalPrice:{
        type:Number,
        required:true
    },
    address:{
        type:Schema.Types.ObjectId,
        required:true
    },
    invoiceDate:{
        type:String,
        required:true,
        enum:["Pending", "Processing", "Shipped", "Cancelled", "Return Request", "Returned"]
    },
    status:{
        type:Schema.Types.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    couponApplied:{
        type: Boolean,
        default: false
    }
    
})


const Order = mongoose.model("Order",orderSchema)
module.exports = Order