import React, { useState } from "react";
import "./AddUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    studentNo:"",
    name: "",
    email: "",
    currentGpa: "",
    tranningPeriode:"",
    companyName:"",

  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/user`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>

        <div className="inputGroup">
          <label htmlFor="studentNo">Student No:</label>
          <input
            type="text"
            id="studentNo"
            onChange={inputHandler}
            name="studentNo"
            autoComplete="off"
            placeholder="Enter your Student No"
          />
        </div>


        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="currentGpa">Current GPA:</label>
          <input
            type="text"
            id="currentGpa"
            onChange={inputHandler}
            name="currentGpa"
            autoComplete="off"
            placeholder="Enter your current GPA"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="tranningPeriode">Training Periode:</label>
          <input
            type="text"
            id="tranningPeriode"
            onChange={inputHandler}
            name="tranningPeriode"
            autoComplete="off"
            placeholder="Enter your Training Periode"
          />
        </div>


        <div className="inputGroup">
          <label htmlFor="companyName">Company Name :</label>
          <input
            type="text"
            id="companyName"
            onChange={inputHandler}
            name="companyName"
            autoComplete="off"
            placeholder="Enter Company Name"
          />
        </div>


        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
