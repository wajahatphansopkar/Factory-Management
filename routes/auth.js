const express = require('express');
const router = express.Router();
const Accountant = require('../models/Accountant');
const Manager = require('../models/Manager');
const Supervisor = require('../models/Supervisor');
const Technician = require('../models/Technician');
const SalesAndPurchaseOfficer = require('../models/Sales and purchase officer')



const MachineryStatus = require('../models/Machinery_Status')
const Order = require('../models/Order')
const Payment = require('../models/Payment')
const Production = require('../models/Production')
const RawMaterial = require('../models/Raw_Material')
const Receipt = require('../models/Receipt')
const Salary = require('../models/Salary')


const ManageExpenses = require("../models/ManageExpenses")

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const alert = require('alert');

const { json } = require('express');




// Accountant router

//ROUTE 1: create a user using :Post "/api/auth/createuser". No login require
router.post('/Accountant', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('post', 'Enter a valid post').isLength({ min: 4 }),
    body('username', 'Enter a valid username').isLength({min: 4}),
    body('email', 'Enter a valid email').isLength({ min: 4 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('salary', "Enter a valid salary").isLength({ min: 4 }),
    body('dateofjoining', "Enter the dateofjoining").isLength({ min: 1 }),
], async (req, res) => {
    let success = false;
    // if there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check wheather the user with this username already exist
    try {

        let accountants = await Accountant.findOne({ username: req.body.username });
        if (accountants) {
            return res.status(400).json({success, error: alert("Sorry a user with this UserName already exist") })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt); 
        const newAccountant = await Accountant.create({
            name: req.body.name,
            post: req.body.post,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            salary: req.body.salary,
            dateofjoining: req.body.dateofjoining,
        })
        //   .then(user => res.json(user))
        //   .catch(err=>{console.log(err)
        //     res.json({error: 'Please enter a unique value for email', message: err.message})});

       const accountant = newAccountant.save();
       res.status(200).json(accountant);
        

       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


// ROUTE 2: Authenticate user using :Post "/api/auth/login". No login require
router.post('/login', [
   
    body('username', 'Enter a valid username').isLength(),
    body('password', 'Password cannot be blank').exists(),
    
], async (req, res) => {
    let success = false;
     // if there are errors return Bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    //  const {username,password} = req.body;
     try {
         let accountant = await Accountant.findOne({username: req.body.username});
         if(!accountant){
            success= false;
            
             return  res.status(400).json({success, error:alert("Username in not valid Please try to login with correct credentials")});
         }

         const passwordCompare = await bcrypt.compare(req.body.password,accountant.password);
         if(!passwordCompare){
             success= false;
            return  res.status(400).json({success ,error:alert(" Password Incorrect Please try to login with correct credentials")});
         }

         
         const { password, ...Accountants } = accountant._doc;
         success = true;
         res.status(200).json(Accountants);
     
     } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin user details using :Post "/api/auth/getuser". login require
router.get('/Accountant/:id',async (req, res) => {


try {
    const accountant =await Accountant.findById(req.params.id);
   const { password, ...others} = accountant._doc;
    res.status(200).json(others);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


// to get Accountant and display in chairman account to perform operation like update ,read and delete

router.get("/Accountant",async (req,res)=>{
    let Accountants=await Accountant.find();
    res.send(Accountants);
})

router.get("/Accountant/:username",async (req,res)=>{
  let Accountants=await Accountant.find();
  res.send(Accountants);
})


router.put("/Accountant/:id",(req,res)=>{

    Accountant.findByIdAndUpdate(req.params.id,req.body)
    .then((info)=>{
        res.send({message:("Accountant Updated Successfully")});
    })


})

router.delete("/Accountant/:id",(req,res)=>{
    Accountant.findByIdAndDelete(req.params.id)
    .then((info)=>{
        res.send({message:("Accountant Deleted Successfully")});
    })

})






// Manager Router


//ROUTE 1: create a user using :Post "/api/auth/createChairman". No login require
router.post('/Manager', [
    
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('post', 'Enter a valid post').isLength({ min: 4 }),
    body('username', 'Enter a valid username').isLength({min: 4}),
    body('email', 'Enter a valid email').isLength({ min: 4 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('salary', "Enter a valid salary").isLength({ min: 4 }),
    body('dateofjoining', "Enter the dateofjoining").isLength({ min: 1 }),

], async (req, res) => {
    let success = false;
    // if there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check wheather the user with this email already exist
    try {

        let managers = await Manager.findOne({ username: req.body.username });
        if (managers) {
            return res.status(400).json({success, error: alert("Sorry a user with this UserName already exist") })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt); 
        const newManager = await Manager.create({
          
            name: req.body.name,
            post: req.body.post,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            salary: req.body.salary,
            dateofjoining: req.body.dateofjoining,
           
        })
        
    const manager = await newManager.save();
    res.status(200).json(manager);

        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured", error);
    }
})


// ROUTE 2: Authenticate user using :Post "/api/auth/login". No login require
router.post('/ManagerLogin', [
   
    body('username', 'Enter a valid username').isLength(),
    body('password', 'Password cannot be blank').exists(),
    
], async (req, res) => {
    let success = false;
     // if there are errors return Bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    //  const {username,password} = req.body;
     try {
         let manager = await Manager.findOne({username: req.body.username});
         if(!manager){
            success= false;
             return  res.status(400).json({success, error:alert("Username in not valid Please try to login with correct credentials")});
         }

         const passwordCompare = await bcrypt.compare(req.body.password, manager.password);
         if(!passwordCompare){
             success= false;
            return  res.status(400).json({success ,error:alert(" Password Incorrect Please try to login with correct credentials")});
         }

         const { password, ...Managers } = manager._doc;
         success = true;
         res.status(200).json(Managers);
     } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin user details using :Post "/api/auth/getuser". login require
router.post('/Manager/:id',async (req, res) => {


try {
    const manager = await Manager.findById(req.params.id);
    const { password, ...others } = manager._doc;
    res.status(200).json(others);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})







// Technician router

//ROUTE 1: create a user using :Post "/api/auth/createuser". No login require
router.post('/Technician', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('post', 'Enter a valid post').isLength({ min: 4 }),
    body('username', 'Enter a valid username').isLength({min: 4}),
    body('email', 'Enter a valid email').isLength({ min: 4 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('salary', "Enter a valid salary").isLength({ min: 4 }),
    body('contactNo', "Enter a valid contactNo").isLength({ min: 10 }),
    body('dateofjoining', "Enter the dateofjoining").isLength({ min: 1 }),
], async (req, res) => {
    let success = false;
    // if there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check wheather the user with this username already exist
    try {

        let technicians = await Technician.findOne({ username: req.body.username });
        if (technicians) {
            return res.status(400).json({success, error: alert("Sorry a user with this UserName already exist") })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt); 
        const newTechnician = await Technician.create({
            name: req.body.name,
            post: req.body.post,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            salary: req.body.salary,
            contactNo: req.body.contactNo,
            dateofjoining: req.body.dateofjoining,
        })
        //   .then(user => res.json(user))
        //   .catch(err=>{console.log(err)
        //     res.json({error: 'Please enter a unique value for email', message: err.message})});

       const technician = newTechnician.save();
       res.status(200).json(technician);
        

       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


// ROUTE 2: Authenticate user using :Post "/api/auth/login". No login require
router.post('/login', [
   
    body('username', 'Enter a valid username').isLength(),
    body('password', 'Password cannot be blank').exists(),
    
], async (req, res) => {
    let success = false;
     // if there are errors return Bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    //  const {username,password} = req.body;
     try {
         let technician = await Technician.findOne({username: req.body.username});
         if(!technician){
            success= false;
            
             return  res.status(400).json({success, error:alert("Username in not valid Please try to login with correct credentials")});
         }

         const passwordCompare = await bcrypt.compare(req.body.password,technician.password);
         if(!passwordCompare){
             success= false;
            return  res.status(400).json({success ,error:alert(" Password Incorrect Please try to login with correct credentials")});
         }

         
         const { password, ...Technicians } = technician._doc;
         success = true;
         res.status(200).json(Technicians);
     
     } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin user details using :Post "/api/auth/getuser". login require
router.get('/Technician/:id',async (req, res) => {


try {
    const technician =await Technician.findById(req.params.id);
   const { password, ...others} = technician._doc;
    res.status(200).json(others);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


// to get Technician and display in chairman account to perform operation like update ,read and delete

router.get("/Technician",async (req,res)=>{
    let Technicians=await Technician.find();
    res.send(Technicians);
})

router.get("/Technician/:username",async (req,res)=>{
  let Technicians=await Technician.find();
  res.send(Technicians);
})


router.put("/Technician/:id",(req,res)=>{

    Technician.findByIdAndUpdate(req.params.id,req.body)
    .then((info)=>{
        res.send({message:("Technician Updated Successfully")});
    })


})

router.delete("/Technician/:id",(req,res)=>{
    Technician.findByIdAndDelete(req.params.id)
    .then((info)=>{
        res.send({message:("Technician Deleted Successfully")});
    })

})








// Supervisor router

//ROUTE 1: create a user using :Post "/api/auth/createuser". No login require
router.post('/Supervisor', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('post', 'Enter a valid post').isLength({ min: 4 }),
    body('username', 'Enter a valid username').isLength({min: 4}),
    body('email', 'Enter a valid email').isLength({ min: 4 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('salary', "Enter a valid salary").isLength({ min: 4 }),
    body('dateofjoining', "Enter the dateofjoining").isLength({ min: 1 }),
], async (req, res) => {
    let success = false;
    // if there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check wheather the user with this username already exist
    try {

        let supervisors = await Supervisor.findOne({ username: req.body.username });
        if (supervisors) {
            return res.status(400).json({success, error: alert("Sorry a user with this UserName already exist") })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt); 
        const newSupervisor = await Supervisor.create({
            name: req.body.name,
            post: req.body.post,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            salary: req.body.salary,
            dateofjoining: req.body.dateofjoining,
        })
        //   .then(user => res.json(user))
        //   .catch(err=>{console.log(err)
        //     res.json({error: 'Please enter a unique value for email', message: err.message})});

       const supervisor = newSupervisor.save();
       res.status(200).json(supervisor);
        

       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


// ROUTE 2: Authenticate user using :Post "/api/auth/login". No login require
router.post('/login', [
   
    body('username', 'Enter a valid username').isLength(),
    body('password', 'Password cannot be blank').exists(),
    
], async (req, res) => {
    let success = false;
     // if there are errors return Bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    //  const {username,password} = req.body;
     try {
         let supervisor = await Supervisor.findOne({username: req.body.username});
         if(!supervisor){
            success= false;
            
             return  res.status(400).json({success, error:alert("Username in not valid Please try to login with correct credentials")});
         }

         const passwordCompare = await bcrypt.compare(req.body.password,supervisor.password);
         if(!passwordCompare){
             success= false;
            return  res.status(400).json({success ,error:alert(" Password Incorrect Please try to login with correct credentials")});
         }

         
         const { password, ...Supervisors } = supervisor._doc;
         success = true;
         res.status(200).json(Supervisors);
     
     } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin user details using :Post "/api/auth/getuser". login require
router.get('/Supervisor/:id',async (req, res) => {


try {
    const supervisor =await Supervisor.findById(req.params.id);
   const { password, ...others} = supervisor._doc;
    res.status(200).json(others);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


// to get Supervisor and display in chairman account to perform operation like update ,read and delete

router.get("/Supervisor",async (req,res)=>{
    let Supervisors=await Supervisor.find();
    res.send(Supervisors);
})

router.get("/Supervisor/:username",async (req,res)=>{
  let Supervisors=await Supervisor.find();
  res.send(Supervisors);
})


router.put("/Supervisor/:id",(req,res)=>{

    Supervisor.findByIdAndUpdate(req.params.id,req.body)
    .then((info)=>{
        res.send({message:("Supervisor Updated Successfully")});
    })


})

router.delete("/Supervisor/:id",(req,res)=>{
    Supervisor.findByIdAndDelete(req.params.id)
    .then((info)=>{
        res.send({message:("Supervisor Deleted Successfully")});
    })

})






// Sales and purchase officer router

//ROUTE 1: create a user using :Post "/api/auth/createuser". No login require
router.post('/Sales and purchase officer', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('post', 'Enter a valid post').isLength({ min: 4 }),
    body('username', 'Enter a valid username').isLength({min: 4}),
    body('email', 'Enter a valid email').isLength({ min: 4 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('salary', "Enter a valid salary").isLength({ min: 4 }),
    body('dateofjoining', "Enter the dateofjoining").isLength({ min: 1 }),
], async (req, res) => {
    let success = false;
    // if there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check wheather the user with this username already exist
    try {

        let salesandpurchaseofficers = await SalesAndPurchaseOfficer.findOne({ username: req.body.username });
        if (salesandpurchaseofficers) {
            return res.status(400).json({success, error: alert("Sorry a user with this UserName already exist") })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt); 
        const newSalesAndPurchaseOfficer = await SalesAndPurchaseOfficer.create({
            name: req.body.name,
            post: req.body.post,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            salary: req.body.salary,
            dateofjoining: req.body.dateofjoining,
        })
        //   .then(user => res.json(user))
        //   .catch(err=>{console.log(err)
        //     res.json({error: 'Please enter a unique value for email', message: err.message})});

       const salesandpurchaseofficer = newSalesAndPurchaseOfficer.save();
       res.status(200).json(salesandpurchaseofficer);
        

       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


// ROUTE 2: Authenticate user using :Post "/api/auth/login". No login require
router.post('/login', [
   
    body('username', 'Enter a valid username').isLength(),
    body('password', 'Password cannot be blank').exists(),
    
], async (req, res) => {
    let success = false;
     // if there are errors return Bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

    //  const {username,password} = req.body;
     try {
         let salesandpurchaseofficer = await SalesAndPurchaseOfficer.findOne({username: req.body.username});
         if(!salesandpurchaseofficer){
            success= false;
            
             return  res.status(400).json({success, error:alert("Username in not valid Please try to login with correct credentials")});
         }

         const passwordCompare = await bcrypt.compare(req.body.password,salesandpurchaseofficer.password);
         if(!passwordCompare){
             success= false;
            return  res.status(400).json({success ,error:alert(" Password Incorrect Please try to login with correct credentials")});
         }

         
         const { password, ...SalesAndPurchaseOfficers } = salesandpurchaseofficer._doc;
         success = true;
         res.status(200).json(SalesAndPurchaseOfficers);
     
     } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin user details using :Post "/api/auth/getuser". login require
router.get('/Sales and purchase officer/:id',async (req, res) => {


try {
    const salesandpurchaseofficer =await SalesAndPurchaseOfficer.findById(req.params.id);
   const { password, ...others} = salesandpurchaseofficer._doc;
    res.status(200).json(others);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


// to get sales and purchase officer and display in chairman account to perform operation like update ,read and delete

router.get("/Sales and purchase officer",async (req,res)=>{
    let SalesAndPurchaseOfficers=await SalesAndPurchaseOfficer.find();
    res.send(SalesAndPurchaseOfficers);
})

router.get("/Sales and purchase officer/:username",async (req,res)=>{
  let SalesAndPurchaseOfficers=await SalesAndPurchaseOfficer.find();
  res.send(SalesAndPurchaseOfficers);
})


router.put("/Sales and purchase officer/:id",(req,res)=>{

    SalesAndPurchaseOfficer.findByIdAndUpdate(req.params.id,req.body)
    .then((info)=>{
        res.send({message:("Sales and purchase officer Updated Successfully")});
    })


})

router.delete("/Sales and purchase officer/:id",(req,res)=>{
    SalesAndPurchaseOfficer.findByIdAndDelete(req.params.id)
    .then((info)=>{
        res.send({message:("Sales and purchase officer Deleted Successfully")});
    })

})







// to get Machinery Status and display in chairman account 


router.get("/Machinery_Status",async (req,res)=>{
    let Machinery_Status=await MachineryStatus.find();
    res.send(Machinery_Status);
})




// to get Order and display in chairman account


router.get("/Order",async (req,res)=>{
    let Orders=await Order.find();
    res.send(Orders);
})



// to get Payment and display in chairman account

router.get("/Payment",async (req,res)=>{
    let Payments=await Payment.find();
    res.send(Payments);
})


// to get Production and display in chairman account

router.get("/Production",async (req,res)=>{
    let Productions=await Production.find();
    res.send(Productions);
})


// to get Raw Material and display in chairman account

router.get("/Raw_Material",async (req,res)=>{
    let RawMaterials=await RawMaterial.find();
    res.send(RawMaterials);
})


// to get Receipt and display in chairman account

router.get("/Receipt",async (req,res)=>{
    let Receipts=await Receipt.find();
    res.send(Receipts);
})

// to get Salary and display in chairman account

router.get("/Salary",async (req,res)=>{
    let Salarys=await Salary.find();
    res.send(Salarys);
})










module.exports = router