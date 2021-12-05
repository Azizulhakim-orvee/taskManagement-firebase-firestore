import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CountUp from "react-countup";
import Task from "./Task";
import { db, logOut } from "../firebase.config";
import {
  collection,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  doc,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Tasks = () => {
  const navigate = useNavigate()
  const name = localStorage.getItem("name");
  const taskRef = useRef();

  const picUrl = localStorage.getItem("profilePic");
  const [startDate, setStartDate] = useState(new Date());

  const notifySuccess = () => {
    toast.success("Task Added", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyError = () => {
    toast.error("Please Add a task", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const addTask = async () => {
    if (taskRef.current.value === "") {
      return notifyError();
    }
    const taskToSend = taskRef.current.value;
    const dateToSend = startDate;
    taskRef.current.value = "";
    console.log(taskToSend);
    await addDoc(collection(db, "users", name, "tasks"), {
      task: taskToSend,
      taskDate: dateToSend,
      timeStamp: serverTimestamp(),
    });
    notifySuccess();
  };
  const [tasks, setTasks] = useState([]);
  const [taskLen, setTaskLen] = useState(0);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "users", name, "tasks"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
          setTasks(snapshot.docs);
          setTaskLen(snapshot.size);
        }
      ),

    [db, name]
  );

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/")
    } catch (err) {
      console.log(err.message);
    }
  }
  

  return (
    <div>
      <div className="flex gap-5 items-center justify-center mt-10 ">
        <div className="bg-gray-50 p-6">
          <img
            src={picUrl}
            alt="adsad"
            className="w-28 h-28 rounded-full shadow-md object-cover"
          />
        </div>
        <div className="bg-gray-50 rounded shadow-md p-6">
          <p className="font-caveat text-4xl">
            {name}
            <Tippy content="Sign Out">
              <svg
                className="w-6 h-6 ml-4 inline-block mr-5 cursor-pointer hover:scale-110 transform transition-all text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleSignOut}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Tippy>
          </p>
          <p className="font-caveat text-xl my-3">
            Total Task:{" "}
            <span className="text-2xl">
              <CountUp end={taskLen} duration={1} start={20} />
            </span>{" "}
          </p>
        
        </div>
      </div>

      <div className="flex gap-5 items-center justify-center mt-10 font-mono">
        <input
          type="text"
          ref={taskRef}
          className="focus:ring-black tracking-widest	 focus:border-black w-2/5 focus:scale-110 focus:z-50 transform transition-all focus:bg-blue-200 focus:text-black "
          placeholder="Add new task.."
        />
        <Tippy content="Pick a date and time">
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="focus:ring-black focus:border-black text-sm ml-10"
              minDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
              dateFormat="MMMM d, h:mm aa"
            />
          </div>
        </Tippy>

        <button
          className="bg-blue-400 p-2 hover:text-white hover:bg-black hover:scale-105 transition-all transform"
          onClick={addTask}
        >
          Add task{" "}
          <svg
            className="w-6 h-6 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>
      <ToastContainer tasks={tasks} />
      <Task tasks={tasks} />
    </div>
  );
};

export default Tasks;
