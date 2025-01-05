const express = require('express');
const router = express.Router();
const {signin,signup,getAllUser,getLoggedInUser,refreshToken,searchUser,logout,Verify} = require('../controller/userController')
const { uploadAvatar } = require("../controller/avatarController");
const EmployeeModel = require("../controller/employeeController");
const upload = require('../config/multer')
const User = require('../model/userModal');
const { authenticate } = require('../middileware/authenticate');

router.post("/signup", signup);


router.post('/signin', signin);

router.post("/logout",logout)

router.get("/users",authenticate, getAllUser);

router.post('/refresh-token', refreshToken);

router.post('/Employees',EmployeeModel.createEmployee)
router.get("/Employees",EmployeeModel.getEmployees)
router.put("/Employees/:id",EmployeeModel.updateEmployee)
router.delete("/Employees/:id",EmployeeModel.deleteEmployee)
router.get("/profile/:id",EmployeeModel.getEmployee)

router.post('/verify-token',Verify)
// router.get('/search',EmployeeModel.search)




module.exports = router;
