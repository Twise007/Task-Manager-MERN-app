import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import Task from "./Task";
import TaskFrom from "./TaskForm";
import Loadingimg from "../assets/loading.gif"



const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [taskID, setTaskID] = useState("")

  const [formData, setFormData] = useState({
    name:"",
    completed: false
  })

  const {name} = formData

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value })
  };

const getTasks = async () => {
  setIsLoading(true)
  try {
    const {data} = await axios.get(`http://localhost:5000/api/tasks`)
    setTasks(data)
    setIsLoading(false)
  } catch (error) {
    toast.error(error.message);
    setIsLoading(false)
  }
}

// create task
  const createTask = async(e) => {
    e.preventDefault()
    if (name === "") {
      return toast.error("Input can't be empty")
    }
    try {
      await axios.post(`http://localhost:5000/api/tasks`,
      formData)
      toast.success("Task added successfully")
      setFormData({...formData, name:""})
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() =>{
    getTasks()
  }, [])


//delete task
const deleteTask = async(id) => {
  try {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`)
    getTasks()
  } catch (error) {
    toast.error(error.message)
  }
}

//update
const getSingleTask = async(task) => {
  setFormData({name: task.name, completed: false});
  setTaskID(task._id)
  setIsEditing(true)
};

const updateTask = async(e) => {
   e.preventDefault()
   if (name === "") {
    return toast.error("Input cannot be empty.")
   }
   try {
    await axios.put(`http://localhost:5000/api/tasks/${taskID}`, formData)
    setFormData({ ...formData, name: ""})
    setIsEditing(false)
    getTasks()
   } catch (error) {
      toast.error(error.message)
   }
};
 



  return (
    <div>
      <h2>Task Manager</h2>
      <TaskFrom 
      name={name} 
      handleInputChange={handleInputChange} 
      createTask={createTask}
      isEditing={isEditing}
      updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> 0
        </p>
        <p>
          <b>Completed Tasks:</b> 0
        </p>
      </div>
      <hr/>
      {
        isLoading && (
          <div className="--flex-center">
            <img src={Loadingimg} alt="Loading..." />
          </div>
        )
      } 
      { 
        !isLoading && tasks.lenght === 0 ?(
          <p>No task added, Please add a task</p>
        ) : (
          <>
          {tasks.map((task, index,) =>{
            return(
              <Task  
              key={task._id} 
              task={task} 
              index={index}
              deleteTask={deleteTask}
              getSingleTask={getSingleTask}
              />
            )
          })}
          </>
        )
      }
    </div>
  )
}

export default TaskList