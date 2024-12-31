const Employees = require("../model/employeeModal")



exports. getEmployees = async (req, res) => {
   
    const employees = await Employees.find();
   
    res.status(200).json(employees);
};

exports. createEmployee =async (req, res) => {
    const {
        salutation, firstName, lastName, username, password, email,
        phone, dob, gender, address, qualifications, country, state, city, pincode
    } = req.body;
   

    if (!salutation || !firstName || !lastName || !username || !password || !email ||
        !phone || !dob || !address || !qualifications || !country || !state ||
        !city || !pincode) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const employee = await Employees.create({
        salutation, firstName, lastName, username, password, email,
        phone, dob, gender, address, qualifications, country, state, city, pincode
    });

    res.status(201).json({"Added employess":employee});
}; 


exports.updateEmployee =async (req, res) => {
    console.log("sdfsdfvsd");
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
     res.status(404)
     throw new Error("Employee not found");
    }
    const updatedEmployee = await Employees.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedEmployee);
};

exports.deleteEmployee = async (req, res) => {
    try {
        // Find the employee by ID
        const employee = await Employees.findById(req.params.id);

        if (!employee) {
            // If employee is not found, return a 404 error
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        // Delete the employee from the database
        await Employees.findByIdAndDelete(req.params.id);

        // Return a success message
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        // If any error occurs, return a 500 error
        res.status(500).json({ message: "Server error", error: error.message });
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
