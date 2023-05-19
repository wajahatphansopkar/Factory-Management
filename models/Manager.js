const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const managerSchema = new Schema({

       
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


        
      
        
        createdAt: {
          type: String,
          default: now,
        },
        updateAt:{
            type: String,
            default: now,
          },
        
      
      });{timestamps:true};
      
    
    
    const managerModel=mongoose.model("Manager", managerSchema);

  module.exports = managerModel;