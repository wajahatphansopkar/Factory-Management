const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const receiptSchema = new Schema({

       
        item: {
          type: String,
          required: [true, "Please Enter the name of item"],
          
        },

        orderid: {
          type: String,
          required: [true, "Please Enter Order Id"],
         
        },

      
        quantity: {
          type: String,
          required: [true, "Please Enter the quantity"],
         
        },
       
        rate: {
          type: String,
          required: [true, "Please Enter the rate"],
          
        },


        receiptdate: {
          type: Date,
          required: [true,"Please enter the Receipt Date "],
         
        },

        total: {
          type: String,
          required: [true, "Please Enter Your Total"],
         
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
      
    
    
    const receiptModel=mongoose.model("Receipt", receiptSchema);

  module.exports = receiptModel;