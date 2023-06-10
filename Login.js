import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const e = document.getElementById("input1").value;
      const p = document.getElementById("input2").value;
      if(e=="admin@gmail.com" && p == "admin123"){
        navigate("/admin");
      }
      else{
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");}
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="resgister-page ">
        {loading && <Spinner />}
        <Form className = "login-box" layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input id = "input1" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input id = "input2" type="password" />
          </Form.Item>
          <Link className="link" to="/register">Not a user ? Cleck Here to regsiter</Link>
          <button className="btn btn-primary">Login</button>
        </Form>
      </div>
    </>
  );
};

export default Login;
