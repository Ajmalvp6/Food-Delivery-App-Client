import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { loginApi, registerApi } from "../services/allApi";
import { StoreContext } from "../../context/storeContext";
import { Bounce, toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  const { setToken } = useContext(StoreContext);

  const { cartItemapi } = useContext(StoreContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  console.log(data);

  const onchangeHandler = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  // login api

  const handleLogin = async (e) => {
    e.preventDefault();

    const bodyData = data;

    const response = await loginApi(bodyData);

    if (response.data?.success) {
      const token = response.data.token;

      setToken(token);

      localStorage.setItem("token", token);

      setData({ name: "", email: "", password: "" });

      cartItemapi();

      setShowLogin(false);

      // return alert(`${response.data.message}`)

      return toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
       
       toast.error(`${response.response.data.message}`, {
                   position: "top-right",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: false,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
                   theme: "light",
                   transition: Bounce,
                 });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      return alert("please fill all input fileds");
    }

    const bodyData = data;

    const response = await registerApi(bodyData);

    
    
    

    if (response?.data?.success) {
      setData({ email: "", password: "", name: "" });
      return toast.success(`Register Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      
     
      toast.error(`${response?.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
    }
  };

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              onChange={onchangeHandler}
              value={data.name}
              name="name"
              placeholder="Your name"
              required
            />
          )}

          <input
            onChange={onchangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={onchangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="password"
            required
          />
        </div>

        <button
          onClick={currState === "Sign Up" ? handleRegister : handleLogin}
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
