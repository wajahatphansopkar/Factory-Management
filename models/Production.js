const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const productionSchema = new Schema({

       
        productname: {
          type: String,
          required: [true, "Please Enter the Name of Item"],
          
        },
      
        quantity: {
          type: String,
          required: [true, "Please Enter the Quantity"],
         
        },
       
        status: {
          type: String,
          required: [true, "Please Enter the Status"],
          
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
      
    
    
    const productionModel=mongoose.model("Production", productionSchema);

  module.exports = productionModel;