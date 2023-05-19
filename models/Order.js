const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const orderSchema = new Schema({

       
        item: {
          type: String,
          required: [true, "Please Enter the name of item"],
         
        },


        customername: {
          type: String,
          required: [true, "Please Enter the Name of Customer"],
          
        },
      
        quantity: {
          type: String,
          required: [true, "Please Enter the quantity"],
          
        },
       
        rate: {
          type: String,
          required: [true, "Please Enter the rate"],
         
        },


        status: {
          type: String,
          required: [true, "Please Enter the Status"],
          
        },

        payment: {
          type: String,
          required: [true, "Please Enter the payment"],
        
        },

        
        Amount: {
          type: String,
          required: [true, "Please Enter the Amount"],
          
        },
        
      
        orderdate: {
          type: Date,
          required: [true,"Please enter the  Order Date "],
         
        },

        
      
        
        createdAt: {
          type: String,
          default: now,
        },
        updateAt:{
            type: String,
            default: now,
          },
        
      
      });{timestamps:true};
      
    
    
    const orderModel=mongoose.model("Order", orderSchema);

  module.exports = orderModel;