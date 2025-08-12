const express = require('express');
const cors = require('cors'); 
const app = express();


app.use(cors()); 
app.use(express.json()); 

const PORT = 3000;


let employees = [
    { id: 1, name: 'Anika Sharma', email: 'anika.sharma@example.com', department: 'Engineering', joiningDate: new Date('2023-01-15'), leaveBalance: 24 },
    { id: 2, name: 'Rohan Mehra', email: 'rohan.mehra@example.com', department: 'Marketing', joiningDate: new Date('2022-11-01'), leaveBalance: 18 },
    { id: 3, name: 'Priya Singh', email: 'priya.singh@example.com', department: 'HR', joiningDate: new Date('2023-05-20'), leaveBalance: 22 },
];
let leaves = [
    { id: 1, employeeId: 2, startDate: new Date('2024-08-15'), endDate: new Date('2024-08-16'), reason: 'Family function', status: 'APPROVED' },
    { id: 2, employeeId: 1, startDate: new Date('2024-09-02'), endDate: new Date('2024-09-02'), reason: 'Personal work', status: 'PENDING' },
];
let employeeIdCounter = 4;
let leaveIdCounter = 3;


app.get('/api/employees', (req, res) => {
    res.status(200).json(employees);
});


app.get('/api/leaves', (req, res) => {
    res.status(200).json(leaves);
});



app.post('/api/employees', (req, res) => {
    const { name, email, department, joiningDate } = req.body;

    if (!name || !email || !department || !joiningDate) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const newEmployee = {
        id: employeeIdCounter++,
        name,
        email,
        department,
        joiningDate: new Date(joiningDate),
        leaveBalance: 24 
    };

    employees.push(newEmployee);
    console.log('Added Employee:', newEmployee);
    res.status(201).json(newEmployee);
});


app.post('/api/leaves', (req, res) => {
    const { employeeId, startDate, endDate, reason } = req.body;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
    }

    if (eDate < sDate) {
        return res.status(400).json({ message: "End date cannot be before start date." });
    }

    if (sDate < employee.joiningDate) {
        return res.status(400).json({ message: "Cannot apply for leave before your joining date." });
    }
    
    const leaveDays = (eDate - sDate) / (1000 * 60 * 60 * 24) + 1;

    if (leaveDays > employee.leaveBalance) {
        return res.status(400).json({ message: `Insufficient leave balance. Available: ${employee.leaveBalance}, Requested: ${leaveDays}` });
    }
    
    const overlappingLeave = leaves.find(leave => 
        leave.employeeId === employeeId &&
        (leave.status === 'PENDING' || leave.status === 'APPROVED') &&
        (sDate <= new Date(leave.endDate) && eDate >= new Date(leave.startDate))
    );
    if (overlappingLeave) {
        return res.status(409).json({ message: "You have an overlapping leave request for these dates." });
    }

    const newLeave = {
        id: leaveIdCounter++,
        employeeId,
        startDate,
        endDate,
        reason,
        status: 'PENDING'
    };

    leaves.push(newLeave);
    console.log('Applied for Leave:', newLeave);
    res.status(201).json(newLeave);
});



app.put('/api/leaves/:id/status', (req, res) => {
    const leaveId = parseInt(req.params.id);
    const { status } = req.body;

    const leave = leaves.find(l => l.id === leaveId);
    if (!leave) {
        return res.status(404).json({ message: "Leave request not found." });
    }
    
    if(leave.status !== 'PENDING') {
        return res.status(400).json({ message: `Leave has already been ${leave.status.toLowerCase()}.` });
    }

    if (status === 'APPROVED') {
        const employee = employees.find(emp => emp.id === leave.employeeId);
        const leaveDays = (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1;
        
        if (employee.leaveBalance < leaveDays) {
            return res.status(400).json({ message: "Cannot approve. Employee has insufficient leave balance." });
        }

        employee.leaveBalance -= leaveDays;
        leave.status = 'APPROVED';
        console.log(`Approved leave for Employee ID ${employee.id}. New balance: ${employee.leaveBalance}`);

    } else if (status === 'REJECTED') {
        leave.status = 'REJECTED';
        console.log(`Rejected leave ID ${leave.id}`);
    } else {
        return res.status(400).json({ message: "Invalid status. Must be 'APPROVED' or 'REJECTED'." });
    }
    
    res.status(200).json(leave);
});


app.get('/api/employees/:id/balance', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === employeeId);

    if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({ 
        employeeId: employee.id,
        name: employee.name,
        department: employee.department,
        joiningDate: employee.joiningDate,
        leaveBalance: employee.leaveBalance 
    });
});


app.get("/api", (req, res) => {
  res.json({ message: "API working fine!" });
});


app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log('You can now open the React UI to see the application.');
});


