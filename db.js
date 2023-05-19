const mongoose = require('mongoose');


const mongoURI = "mongodb://localhost:27017/HousingSociety?readPreference=primary&appname=MongoDB%20Compass&ssl=false"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("MongoBD Listening To Housing Society Management System");
    })
}

module.exports = connectToMongo;