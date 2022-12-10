const dotenv = require("dotenv").config()
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoute = require("./routes/taskRoute")
const cors = require("cors")

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

app.use("/api/tasks",taskRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home page")
});

const PORT = process.env.PORT || 5000;

// connect to mongo db option 1
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))


// connect to mongo db option 2
// const startServer = async () => {
//     try{
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`)
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// startServer();