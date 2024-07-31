import React, { useEffect, useState } from "react";
import "./Update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
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
  //extract the id from url
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/user/${id}`, user)
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

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="studentNo">Student No:</label>
          <input
            type="text"
            id="studentNo"
            value={user.studentNo}
            onChange={inputHandler}
            name="studentNo"
            autoComplete="off"
            placeholder="Enter your Student Number"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
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
            value={user.email}
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
            value={user.currentGpa}
            onChange={inputHandler}
            name="currentGpa"
            autoComplete="off"
            placeholder="Enter current GPA"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="tranningPeriode">Training Periode:</label>
          <input
            type="text"
            id="tranningPeriode"
            value={user.tranningPeriode}
            onChange={inputHandler}
            name="tranningPeriode"
            autoComplete="off"
            placeholder="EnterTranning Periode"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="companyName">Company Name You like:</label>
          <input
            type="text"
            id="companyName"
            value={user.companyName}
            onChange={inputHandler}
            name="companyName"
            autoComplete="off"
            placeholder="Enter company name"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
