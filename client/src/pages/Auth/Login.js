import React, { useState } from "react";
import "../../styles/AuthStyles.css";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()
  
  const navigate = useNavigate();

  // From Funcation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong...");
    }
  };

  return (
    <Layout title="Login Page">
      <div className="form-container">
        <h4 className="title">LOGIN FORM</h4>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail2"
              placeholder="Enter Your Email Id"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control" 
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
