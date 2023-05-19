const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const rawmaterialSchema = new Schema({

       
        materialtype: {
          type: String,
          required: [true, "Please Enter the Type of Material"],
          
        },
      
        initialstock: {
          type: String,
          required: [true, "Please Enter the Initial Stock"],
        
        },
       
        finalstock: {
          type: String,
          required: [true, "Please Enter the Final Stock"],
         
        },

        newstock: {
          type: String,
          required: [true, "Please Enter the New Stock"],
         
        },



        stockdate: {
          type: Date,
          required: [true,"Please enter the Stock Date "],
         
        },

        quantityconsumed: {
          type: String,
          required: [true, "Please Enter the Quantity that has been consumed"],
          
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
      
    
    
    const rawmaterialModel=mongoose.model("Raw_Material", rawmaterialSchema);

  module.exports = rawmaterialModel;