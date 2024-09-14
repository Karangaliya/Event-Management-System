import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GrUserAdmin } from "react-icons/gr"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FadeLoader from "react-spinners/ClipLoader";
import { logoutInSuccess } from '../../redux/user/userSlice';
import Swal from 'sweetalert2'

function VolProfile() {

  const [vol, setVol] = useState({});
  const [subloading,setSubloading] = useState(false);
  const [delloading,setDelloading] = useState(false);
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const mode = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!userId) {
      console.log("UserId is not there")
    }
    axios.get(`/api/v1/users/${userId}`)
      .then(function (response) {
        setVol(response.data.data);
      })
      .catch(function (error) {
        const code = error.response.status;
        if (code == 404) {
          dispatch(logoutInSuccess());
          mode === "dark" ? toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          }) : toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
          navigate("/login");
        } else {
          mode === "dark" ? toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          }) : toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        }
      })
  }, [])


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prevData => {
      const updatedData = { ...prevData, [name]: value };

      if (!updatedData._id) {
        updatedData._id = vol._id; // assuming vol._id is defined somewhere in your code
      }

      return updatedData;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      setSubloading(true);
      axios.put(`/api/v1/users/updateDetail/${currentUser._id}`, {
        data
      })
        .then(function (response) {
          mode === "dark" ? toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          }) : toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
          setData({})
          setSubloading(false)
        })
        .catch(function (error) {
          const code = error.response.status;
          if (code == 404) {
            dispatch(logoutInSuccess());
            mode === "dark" ? toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            }) : toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
            setData({});
            setSubloading(false)
            navigate("/login");
          } else {
            mode === "dark" ? toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            }) : toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
            setData({});
            setSubloading(false);
          }
        })
    }
  }

  const handleDelete = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          setDelloading(true)
          axios.delete(`/api/v1/users/deleteVol/${vol._id}`)
            .then(function (response) {
              mode === "dark" ? toast.success(response.data.data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
              }) : toast.success(response.data.data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              });
              setDelloading(false)
              navigate("/dashboard/dash")
            })
            .catch(function (error) {
              const code = error.response.status;
              if (code == 404) {
                dispatch(logoutInSuccess());
                mode === "dark" ? toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark"
                }) : toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"
                });
                setDelloading(false)
              } else {
                mode === "dark" ? toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark"
                }) : toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"
                });
                setDelloading(false);
              }
            })
      }
    });

  }

  return (
    <form onSubmit={handleSubmit} className='min-h-[100vh] dark:bg-gray-800 relative bg-white rounded-lg flex flex-col gap-[50px] items-center pt-[30px] shadow-xl'>
      {vol && vol.isAdmin ? <GrUserAdmin className='text-green-500 absolute top-[30px] max-[700px]:top-[100px] right-[25px] text-4xl' /> : ""}
      <div className='text-4xl font-semibold text-[#191970] dark:text-[#ADD8E6]'>Volenteer Information</div>
      <div className='w-full flex flex-col items-center gap-3'>
        <img src={vol ? vol.profileImage : ""} className='h-[120px] w-[120px] object-contain rounded-full cursor-pointer' alt="Profile Image" />
        <input type="text" value={vol._id} className='text-center px-3 py-1 dark:bg-gray-900 dark:text-white rounded-lg bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500 w-[30%]' />
      </div>
      <div className='w-[50%] max-[780px]:w-[80%] flex flex-col gap-5'>
        <div className="username flex flex-col gap-2">
          <label htmlFor="username" className="dark:text-white text-black text-sm ml-2">User Name : </label>
          <input type="text" defaultValue={vol ? vol.username : ""} name='username' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
        </div>
        <div className="fullName flex flex-col gap-2">
          <label htmlFor="fullName" className="dark:text-white text-black text-sm ml-2">Full Name : </label>
          <input type="text" defaultValue={vol ? vol.fullName : ""} name='fullName' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
        </div>
        <div className="email flex flex-col gap-2">
          <label htmlFor="email" className="dark:text-white text-black text-sm ml-2">Email : </label>
          <input type="email" defaultValue={vol ? vol.email : ""} name='email' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
        </div>
      </div>
      <div className='button w-[50%] max-[780px]:w-[80%] flex justify-between items-center'>
        <div className='w-[30%] relative'>
          <input type="submit" value={!subloading?"Update":""} className='w-full dark:bg-gray-900 py-2 rounded-xl dark:hover:bg-gray-500 transition-all hover:cursor-pointer bg-slate-400 hover:bg-slate-700' />
          <FadeLoader
          color="#4169E1"
          loading={subloading}
          height={15}
          radius={2}
          width={5}
          className='absolute top-[2px] left-[41%]'
        />
        </div>
        <div className='w-[30%] relative'>
          <input type="button" value={!delloading? "Delete" : ""} className="w-full bg-red-600 py-2 cursor-pointer text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 rounded-xl" onClick={handleDelete}/>
          <FadeLoader
          color="#4169E1"
          loading={delloading}
          height={15}
          radius={2}
          width={5}
          className='absolute top-[2px] left-[41%]'
        />
        </div>
      </div>
    </form>
  )
}

export default VolProfile