import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext.jsx";

function Signup() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [name, setname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const Submit = async (e) => {
    try {
      setIsWaiting(true);
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          name,
          userName,
          password,
          confirmPassword,
        }
      );
      if (!res) {
        throw new Error("Authentication Fails.");
      }
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setAuthUser(res.data.userName);
    } catch (error) {
      //   console.log(error);
      alert(error.response.data);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div
      className=" flex w-screen h-screen justify-center items-center text-gray-900"
      style={{ fontFamily: "Inter" }}
    >
      <div className=" hidden md:block md:w-1/2 md:h-full md:p-5 lg:w-3/5">
        <div className=" flex flex-col w-full h-full justify-center items-center gap-48">
          <div className=" flex flex-col gap-3">
            <div className=" text-6xl font-bold">Response Code Lists</div>
            <div className=" text-base">
              MoEngage Assignment - create, search, edit and delete response
              code lists.
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <div className=" flex gap-5 justify-center items-center text-base">
              <button
                className=" border w-3/12 py-3 rounded-full"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </button>
              <button className=" border-2 w-3/12 py-3 rounded-full text-white bg-blue-500">
                Sign up
              </button>
            </div>
            <div className=" text-xs">
              Be patient, as the server may take a few seconds to respond to
              your initial request. Thank you for your understanding!
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full h-full justify-center items-center sm:w-4/5 md:w-1/2 lg:w-2/5">
        <div className=" flex w-full flex-col justify-center items-center gap-5">
          <div className=" text-6xl font-semibold mb-7 md:hidden">ChatApp</div>
          <div className=" hidden text-4xl font-semibold md:block">Sign up</div>
          <button className=" w-4/5 border py-3 rounded-xl text-white bg-blue-500">
            Continue with Google
          </button>
          <div className=" flex fle-col justify-center items-center w-4/5 ">
            <div className=" border border-gray-300 w-full"></div>
            <div className=" px-3">or</div>
            <div className=" border border-gray-300 w-full"></div>
          </div>
          <input
            className=" w-4/5 border border-gray-300 px-3 py-3 rounded-xl"
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
          ></input>
          <input
            className=" w-4/5 border border-gray-300 px-3 py-3 rounded-xl"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
          <input
            className=" w-4/5 border border-gray-300 px-3 py-3 rounded-xl"
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            className=" w-4/5 border border-gray-300 px-3 py-3 rounded-xl"
            type="text"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
          <button
            className={`${
              isWaiting
                ? "border w-4/5 py-3 rounded-xl  bg-gray-200"
                : "border w-4/5 py-3 rounded-xl text-white bg-blue-500"
            }`}
            onClick={Submit}
          >
            Sign up
          </button>
          <div>
            Already Have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
