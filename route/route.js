const express = require('express');
const router = express.Router();
const {signin,signup,getAllUser,getLoggedInUser,refreshToken,searchUser,logout} = require('../controller/userController')
const EmployeeModel = require("../controller/employeeController")
const User = require('../model/userModal');
const { authenticate } = require('../middileware/authenticate');

router.post("/signup", signup);


router.post('/signin', signin);

router.post("/logout",logout)

router.get("/users",authenticate, getAllUser);

router.post('/refresh-token', refreshToken);

router.post('/Dashboard',EmployeeModel.createEmployee)
router.get("/Dashboard",EmployeeModel.getEmployees)
router.put("/Dashboard/:id",EmployeeModel.updateEmployee)
router.delete("/Dashboard/:id",EmployeeModel.deleteEmployee)
router.get("/profile/:id",EmployeeModel.getEmployee)



module.exports = router;
