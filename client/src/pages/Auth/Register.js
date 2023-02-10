import React,{useState} from "react";
import '../../styles/AuthStyles.css'
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
 

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    // From Funcation
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name, email, password, phone, address})
        if(res && res.data.success){
          toast.success(res.data && res.data.message)
          navigate("/login")
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error('Somthing went wrong...')
      }
       
    }




  return (
    <Layout title="Register Page">
      <div className="form-container">
        <h4 className="title">REGISTER FORM</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb- 3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Full Name"
              required
              autoFocus
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail3"
              placeholder="Enter Your Phone No"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail4"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
