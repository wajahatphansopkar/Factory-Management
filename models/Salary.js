const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const salarySchema = new Schema({

       
        employeename: {
          type: String,
          required: [true, "Please Enter the name of Employee"],
          
        },

        post: {
          type: String,
          required: [true, "Please Enter the post"],
         
        },


        date: {
          type: Date,
          required: [true,"Please enter the  Date "],
         
        },

      
       
        time: {
          type: Date,
          required: [true,"Please enter the time "],
         
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
      
    
    
    const salaryModel=mongoose.model("Salary", salarySchema);

  module.exports = salaryModel;