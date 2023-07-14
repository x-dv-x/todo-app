import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/tasks.js";



export const newTask = async (req,res,next) => {
   try {
    const {title,description} = req.body;
    await Task.create({title,description,
        user: req.user,
    })
    res.status(201).json({
        success: true,
        message: "Task Added Successfully",
    })
   } catch (error) {
    next(error);
   }
}


export const getAllTasks = async (req, res, next) => {
    try {
        const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    // Extract necessary properties from each task
    // const formattedTasks = tasks.map(({ _id, title, description }) => ({
    //   _id,
    //   title,
    //   description,
    // }));
    res.status(200).json({
      success: true,
      tasks,
    });
    } catch (error) {
       next(error); 
    }
  };


  export const updateTask = async (req, res, next) => {  
    try {
        const {id} = req.params;
    const task = await Task.findById(id);
    if(!task) return next(new ErrorHandler("Task Not Found",404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully!"
    });
    } catch (error) {
       next(error); 
    }
  };
  

  export const deleteTask = async (req, res, next) => {
    try {
        const {id} = req.params;
    const task = await Task.findById(id);
    if(!task) return next(new ErrorHandler("Task Not Found",404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Removed"
    });
    } catch (error) {
       next(error); 
    }
  };
  