const BigPromise = require("../middleware/BigPromise");
const Order = require("../model/order");
exports.addorder=BigPromise((req,res,next)=>{
    const order = await Order.create({...req.body,orderBy:req.user._id})
    
    

})