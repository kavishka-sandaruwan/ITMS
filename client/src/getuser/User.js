import React, { useEffect, useState } from 'react'
import "./User.css"
import axios from "axios"
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {

    const [users,setUsers]=useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try{

                const response=await axios.get("http://localhost:8000/api/users")
                setUsers(response.data)

            }catch(error){
                console.log("Error while fetching data",error);

            }
        };
        fetchData();

    },[]);

    const deleteUser = async (userId) => {
        await axios
          .delete(`http://localhost:8000/api/delete/user/${userId}`)
          .then((response) => {
            setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
            toast.success(response.data.message, { position: "top-right" });
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <div className='userTable'>
        <Link to="/add" type="button" className="btn btn-primary">
            Add Student <i class="fa-solid fa-user-plus"></i>
        </Link>

        <table className='table table-bordered'>
            <thead>

               
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Student No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Current GPA</th>
                    <th scope="col">Training Periode</th>
                    <th scope="col">Company Name You Like</th>

                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user,index)=>{
                    return(
                       
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.studentNo}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.currentGpa}</td>
                            <td>{user.tranningPeriode}</td>
                            <td>{user.companyName}</td>


                            <td className="actionButton">
                                <Link to={`/update/`+user._id} type="button" class="btn btn-info">
                                <i class="fa-solid fa-pen-to-square"></i>
                                </Link>

                                
                                <button 
                                    onClick={()=>deleteUser(user._id)}
                                    type="button" class="btn btn-danger">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    );
                })}
                
            </tbody>
        </table>

    </div>
  )
}

export default User