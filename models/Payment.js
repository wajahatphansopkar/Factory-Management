const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const paymentSchema = new Schema({

       
        partyname: {
          type: String,
          required: [true, "Please Enter the Party Name"],
          
        },

        orderid: {
          type: String,
          required: [true, "Please Enter Order Id"],
         
        },

      
        description: {
          type: String,
          required: [true, "Please Enter the Description"],
         
        },
       
        amount: {
          type: String,
          required: [true, "Please Enter the Amount"],
          
        },


        paymentdate: {
          type: Date,
          required: [true,"Please enter the Payment Date "],
         
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
      
    
    
    const paymentModel=mongoose.model("Payment", paymentSchema);

  module.exports = paymentModel;