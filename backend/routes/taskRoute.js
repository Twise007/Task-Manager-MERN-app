const Task = require("../models/taskModel");
const express = require("express");
const { createTask, getTasks, getTask, deleteTask, updateTask, } = require("../controllers/taskController");
const router = express.Router();


router.post("/", createTask) // Create a task
router.get("/", getTasks)  // Get/Read Tasks
router.get("/:id", getTask)  // Get/Read Task
router.delete("/:id", deleteTask)  // Get/Delete Task
router.put("/:id", updateTask)  // Update Task






module.exports = router

