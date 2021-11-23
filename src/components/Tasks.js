import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CountUp from "react-countup";

const Tasks = () => {
  const name = localStorage.getItem("name");

  const picUrl = localStorage.getItem("profilePic");
  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate);



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
                onClick={() => console.log(44)}
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
              <CountUp end={0} duration={3} start={20} />
            </span>{" "}
          </p>
          <p className="font-caveat text-xl">Last added: </p>
        </div>
      </div>

      <div className="flex gap-5 items-center justify-center mt-10 font-mono">
        <input
          type="text"
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

        <button className="bg-blue-400 p-2 hover:text-white hover:bg-black hover:scale-105 transition-all transform">
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
    </div>
  );
};

export default Tasks;
