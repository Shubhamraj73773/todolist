import React, { useEffect, useState } from 'react';
import './TaskPage.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router';

const TaskPage = (props) => {
  const [tasks, setTasks] = useState([]);

  const history = useNavigate();

  const getData = async ()=>{
    const data = {
      jwt:props.cookie
    };

    const url="http://localhost:3100/tasks";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();
    setTasks(res);
  }

  useEffect(()=>{
    if(props.cookie==null){
      history("/login");
    }
    else{
      getData();
    }
  },[]);

  const handleLogout = ()=>{
    props.setCookie(null);
    history("/login");
  }

  const handleAddTask = async () => {
    const taskName = document.getElementById("newTask").value;
    console.log(taskName);

    const data = {
      jwt:props.cookie,
      task_name:taskName
    };

    const url="http://localhost:3100/addTask";
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    
    const res = await response.json();

    setTasks(res);
    document.getElementById("newTask").value="";
  };

  const handleDeleteTask = async(id) => {
    const data = {
      jwt:props.cookie,
      task_id:id
    };

    const url="http://localhost:3100/deleteTask";
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    
    const res = await response.json();
    console.log(res);
    setTasks(res);
  };

  const handleUpdateTask = async(id) => {
    const data = {
      jwt:props.cookie,
      status:true,
      task_id:id
    };

    const url="http://localhost:3100/changeStatus";
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    
    const res = await response.json();
    console.log(res);
    setTasks(res);
  };

  return (
    <div className="login-container">
      <div className='task-nav'>
        <h1 className='main-header'>Task Management</h1>
        <button className="login-btn" onClick={handleLogout}>Log out</button>
      </div>
      <div className="task-container">
        <div className="add-task-container">
          <input
            type="text"
            id="newTask"
            className='login-input'
          />
          <button className="login-btn" onClick={handleAddTask}>Add Task</button>
        </div>
        <h2 className='main-header'>Pending Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            (!task.is_completed)?<TaskItem
              key={index}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />:<></>
          ))}
        </ul>
        <h2 className='main-header'>Comleted Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            (task.is_completed)?<CompletedItem
              key={index}
              task={task}
              onDelete={handleDeleteTask}
            />:<></>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TaskItem = ({task,onUpdate,onDelete}) => {
  return (
    <li className='task-card'>
    <div className='task-name'>{task.name}</div>
      <div className='tassk-card-btns'>
        <button className="login-btn" onClick={()=>onUpdate(task._id)}>Mark As Done</button>
        <button className="login-btn" onClick={()=>onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

const CompletedItem = ({task,onDelete})=>{
  return (
    <li className='task-card'>
      <div className='task-name'>{task.name}</div>
      <div>
        <button className="login-btn" onClick={()=>onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskPage;
