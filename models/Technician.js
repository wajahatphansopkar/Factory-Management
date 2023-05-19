const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const technicianSchema = new Schema({

       
        name: {
          type: String,
          required: [true, "Please Enter Your name"],
          
        },
      
        username: {
          type: String,
          required: [true, "Please Enter Your username"],
          
        },
       
        password: {
          type: String,
          required: [true, "Please Enter Your Password"],
         
        },

        post: {
          type: String,
          required: [true, "Please Enter Your Post"],
         
        },

        dateofjoining: {
          type: Date,
          required: [true,"Please enter your Date Of Joining"],
         
        },

        email: {
          type: String,
          required: [true, "Please Enter Your Email"],
         
        },

        contactno: {
          type: String,
          required: [true, "Please Enter Your Contact Number"],
         
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
      
    
    
    const technicianModel=mongoose.model("Technician", technicianSchema);

  module.exports = technicianModel;