import { doc, updateDoc } from "@firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase.config";
import Moment from "react-moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const SingleTask = ({ task, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [newTask, setNewTask] = useState();

  const editTask = async () => {
    try {
      setIsEditing(!isEditing);
    } catch (err) {
      console.log(err);
    }
  };

  const name = localStorage.getItem("name");

  const updateTask = async (id) => {
    try {
      console.log(id);
      const userDoc = doc(db, "users", name, "tasks", id);
      const newFields = { task: newTask };
      await updateDoc(userDoc, newFields);
      setIsEditing(!isEditing);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={task.id} className="flex items-center space-x-2 mb-3 mt-3 ">
      <div className="uppercase font-mono flex-1 text-2xl hover:bg-gray-100 opacity-80 hover:opacity-100 hover:font-bold transition-all transform">
        <div>
          <p>{task.data().task} </p>
          <p className="text-sm">
            <span className="text-sm lowercase">
               added{" "}
              <Moment fromNow>{task.data().timeStamp?.toDate()}</Moment>{" "}
        
            </span>
          </p>
          <p className="text-sm">
            Date: {task.data().taskDate?.toDate().toDateString()}
          </p>
          <p className="text-sm">
            Time: {task.data().taskDate?.toDate().toTimeString()}
          </p>
        </div>
        <Tippy content="Edit task">
        <svg
          className="w-4 h-4 inline-block ml-3 hover:text-red-500 hover:bg-gray-200 hover:scale-110 transition-all transform cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={editTask}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
          
        </svg>
        </Tippy>

        <Tippy content="Delete task">
        <svg
          className="w-4 h-4 inline-block ml-3 hover:text-red-500 hover:bg-gray-200 hover:scale-110 transition-all transform cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => deleteTask(task.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        </Tippy>
        {isEditing && (
          <div>
            <input type="text" onChange={(e) => setNewTask(e.target.value)} />
            <svg
              className="w-4 h-4 inline-block ml-3 hover:text-red-500 hover:bg-gray-200 hover:scale-110 transition-all transform cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => updateTask(task.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTask;
