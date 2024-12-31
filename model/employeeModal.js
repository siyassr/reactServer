const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    
    salutation:{
        type: String,
        required:[true , "Please add the employee salutation"],
    },

    firstName:{
        type:String,
        required:[true , "Please add the employee firstName"],
    },
    lastName:{
        type: String,
        required:[true , "Please add the employee lastName "],
    },
    username:{
        type: String,
        required:[true ,"Please add the employee username"],
    },
    password:{
        type: String,
        required:[true , "Please add the employee password"],
    },
    email:{
        type:String,
        required:[true , "Please add the employee email"],
    },
    phone:{
        type: String,
        required:[true , "Please add the employee phone"],
    },
    dob:{
        type: String,
        required:[true , "Please add the employee dob"],
    },
    gender:{
        type: String,
        required:[true , "Please add the employee gender"],
    },
    qualifications:{
        type: String,
        required:[true ,"Please add the employee qualifications"],
    },
    address:{
        type:String,
        required:[true , "Please add the employee address"] 
    },
    country:{
        type:String,
        required:[true , "please add the employee country"]
    },
    state:{
        type:String,
        required:[true , "please add the employee state"]
    },
    city:{
        type:String,
        required:[true , "please add the employee city"]
    },
    pincode:{
        type:String,
        required:[true , "Please add the employee pinzip"]
    },
    avatar: {
        type: String, // Use String to store the file path or URL of the image
        default: "https://via.placeholder.com/150", // Placeholder image as default
      },
},{
    timestamps:true
})

module.exports = mongoose.model("employees",employeeSchema)
