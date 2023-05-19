const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const machinerystatusSchema = new Schema({

       
        status: {
          type: String,
          required: [true, "Please Enter the Status"],
          
        },
      
        problem: {
          type: String,
          required: [true, "Please Enter the Problem"],
         
        },
       
        machineryname: {
          type: String,
          required: [true, "Please Enter the Name of the Machine"],
        
        },


        breakdowndate: {
          type: Date,
          required: [true,"Please enter the Date of Breakdown "],
         
        },

        repairdate: {
          type: Date,
          required: [true,"Please enter the Date of Repair "],
         
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
      
    
    
    const machinerystatusModel=mongoose.model("Machinery_Status", machinerystatusSchema);

  module.exports = machinerystatusModel;