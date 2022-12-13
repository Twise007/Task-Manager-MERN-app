const dotenv = require("dotenv").config()
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const taskRoute = require("./routes/taskRoute")
const cors = require("cors");
const path = require("path")

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

app.use("/api/tasks",taskRoute);

// Deloyment code

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
    })
} else{
    app.get("/", (req, res) => {
        res.send("Home page")
    });  
}

// Routes

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