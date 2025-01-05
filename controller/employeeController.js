const Employees = require("../model/employeeModal")



// exports. getEmployees = async (req, res) => {
   
//     const employees = await Employees.find();
   
//     res.status(200).json(employees);
// };

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employees.find({ isDeleted: false }); 
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};


exports. createEmployee =async (req, res) => {
    try {
        const {
            salutation, firstName, lastName, username, password, email,
            phone, dob, gender, address, qualifications, country, state, city, pincode,avatar
        } = req.body;

        // console.log(salutation,firstName,lastName,username,password,email,phone,dob,gender,address,qualifications,country,state,city,pincode,avatar)

       
    
        if (!salutation || !firstName || !lastName || !username || !password || !email || 
            !phone || !dob || !address || !qualifications || !country || !state ||
            !city || !pincode) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
    
        const employee = await Employees.create({
            salutation, firstName, lastName, username, password, email,
            phone, dob, gender, address, qualifications, country, state, city, pincode,avatar
        });
    
        res.status(201).json({"Added employess":employee});
        
    } catch (error) {
        res.status(500).json({ message: "Server error create", error: error.message });
    }
    
}; 


// exports.updateEmployee =async (req, res) => {
//     console.log("sdfsdfvsd");
//     const employee = await Employees.findById(req.params.id);
//     if (!employee) {
//      res.status(404)
//      throw new Error("Employee not found");
//     }
//     const updatedEmployee = await Employees.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     );
//     res.status(200).json(updatedEmployee);
// };

exports.updateEmployee =  async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

  
    try {
      const updatedEmployee = await Employees.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: "Error updating employee" });
    }
  };
  

  exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employees.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        employee.isDeleted = true; 
        await employee.save();

        res.status(200).json({ message: "Employee soft deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error soft deleting employee", error: error.message });
    }
};


exports.getEmployee = async (req, res) => {
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
     res.status(404)
     throw new Error("Employee not found");
    }
    res.status(200).json(employee);
};

// exports.search =  async (req, res) => {
//     const { query } = req.query; 
  
//     try {
      
//       const employees = await Employees.find({
//         $or: [
//           { firstName: { $regex: query, $options: 'i' } }, 
//           { lastName: { $regex: query, $options: 'i' } },
//           { email: { $regex: query, $options: 'i' } },
//           { phone: { $regex: query, $options: 'i' } },
//           { username: { $regex: query, $options: 'i' } },
//         ],
//       });
  
//       res.json(employees);  // Return filtered employees
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error fetching employees' });
// }
//   };
