import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from "./routes/Auth.route.js";
import taskRoutes from "./routes/Task.route.js";

dotenv.config();

const app = express();

// 🔥 CORS (VERY IMPORTANT — keep this at top)
app.use(cors({
  origin: ["http://localhost:5173",
   'https://taskmanagerapp-hsm1.onrender.com'],  // allow frontend to access backend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 🔥 JSON middleware
app.use(express.json());

// 🔥 Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// 🔥 DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
 /*
===========================
📘 DETAILED EXPLANATION
===========================

1. express:
- Express is a Node.js framework used to build backend servers and APIs easily.
- It helps handle routes, requests, and responses.

2. dotenv:
- dotenv is used to load environment variables from a .env file.
- Example: PORT=5000 is stored in .env and accessed using process.env.PORT.

3. dotenv.config():
- This function reads the .env file and makes variables available in process.env.

4. app = express():
- This creates an Express application (your backend server).
- Think of it as starting your server setup.

5. PORT:
- process.env.PORT → reads value from .env file.
- || 5000 → if no value found, default port will be 5000.

6. app.get('/'):
- This defines a route for GET requests.
- "/" means homepage (http://localhost:5000).
- When user opens browser, this route runs.

7. (req, res):
- req (request) → contains data sent by client (browser/frontend).
- res (response) → used to send data back to client.

8. res.send():
- Sends response to browser.
- Here it sends: "Server is running".

9. app.listen():
- Starts the server.
- Makes it listen on given PORT (5000).

10. console.log():
- Prints message in terminal when server starts.
- Helps confirm server is running.

===========================
🧠 FLOW OF PROGRAM
===========================

1. Server starts using app.listen()
2. User opens browser → http://localhost:5000
3. Browser sends GET request
4. app.get('/') route handles request
5. Server sends response → "Server is running"

===========================
🎯 IMPORTANT NOTES
===========================

- Browser URL bar only sends GET request
- POST requests require tools like:
  → Thunder Client
  → Postman
  → Frontend (fetch/axios)

- req is used when we want data from client
- res is used to send data to client

===========================
🚀 NEXT LEARNING STEPS
===========================

1. Add POST API
2. Learn req.body (very important)
3. Connect MongoDB
4. Build login/register system

*/