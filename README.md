Mini Leave Management System
A clean, modern, and efficient application designed to streamline the process of managing employee leaves. This project provides a full-stack solution with a reactive frontend and a robust backend API, perfect for small to medium-sized teams looking to move away from manual leave tracking.

🚀 Live Demo
Experience the live application and interact with the API using the links below.

Frontend UI (Netlify)	Backend API (Render)
https://leavemanagementui.netlify.app/	https://leavemangementapi.onrender.com

Export to Sheets
Note: The live backend API uses an in-memory data store. This means the data will reset periodically.

✨ Features
Employee Management: Easily add and view employee details.

Leave Application: A simple modal for employees to apply for leave.

Approval Workflow: Managers/Admins can approve or reject pending leave requests with a single click.

Leave Balance Tracking: Leave balances are automatically calculated and deducted upon approval.

Interactive Dashboard: Get a quick overview of total employees, pending requests, and upcoming leaves.

Robust Validation: The system handles edge cases like overlapping leaves, insufficient balance, and invalid dates.

🛠️ Tech Stack
This project is built with modern technologies, ensuring a scalable and maintainable codebase.

Tier	Technology	Purpose
Frontend	React, Vite	For a fast and interactive user interface.
Tailwind CSS	For modern, utility-first styling.
Lucide React	For clean and beautiful icons.
Backend	Node.js, Express.js	For building a fast and efficient REST API.
CORS	To handle cross-origin requests between the frontend and backend.
Database	In-Memory Array	For simplicity in development and demo. The architecture supports PostgreSQL.

Export to Sheets
🏛️ Architecture
The application follows a classic 3-Tier Architecture, which separates concerns into distinct logical layers. This makes the system secure, scalable, and easy to maintain.

Frontend (Client): The React UI that runs in the browser.

Backend (Server): The Node.js/Express API that contains all business logic.

Database (Persistence): The data store that holds all application data.

本地设置 (Local Setup)
To run this project on your local machine, follow these steps.

Prerequisites
Node.js (v18 or higher)

npm (or yarn)

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/leave-management-system.git
cd leave-management-system
Setup the Backend API Server:

Navigate to the backend directory.

Bash

cd leave-api-server
Install the dependencies.

Bash

npm install
Start the server.

Bash

node index.js
🚀 The API server will be running on http://localhost:3000. Keep this terminal open.

Setup the Frontend React App:

Open a new terminal and navigate to the frontend directory.

Bash

cd leave-ui-app
Install the dependencies.

Bash

npm install
Start the development server.

Bash

npm run dev
✨ Open your browser and go to the URL provided (usually http://localhost:5173).

⚙️ API Endpoints
The backend server provides the following RESTful API endpoints:

Method	Endpoint	Description
GET	/api/employees	Get a list of all employees.
POST	/api/employees	Add a new employee.
GET	/api/employees/:id/balance	Get the leave balance for a specific employee.
GET	/api/leaves	Get a list of all leave requests.
POST	/api/leaves	Submit a new leave application.
PUT	/api/leaves/:id/status	Approve or reject a pending leave request.

Export to Sheets
📸 Screenshots
The main dashboard providing key insights at a glance.

A clean table showing all employees with their details.

An intuitive modal for applying for leaves.

📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.
