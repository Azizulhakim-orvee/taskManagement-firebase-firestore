import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase.config";
import {
  collection,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  doc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import SingleTask from "./SingleTask";

const Task = ({ tasks }) => {
  const name = localStorage.getItem("name");

  const notifyDelete = () => {
    toast.error("Task Deleted", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteTask = async (id) => {
    try {
      console.log("kaam");
      await deleteDoc(doc(db, "users", name, "tasks", id));
      notifyDelete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-center p-4">
      {tasks.map((task) => (
        <SingleTask task={task} key={task.id} deleteTask={deleteTask} />
      ))}

      <ToastContainer />
    </div>
  );
};

export default Task;
