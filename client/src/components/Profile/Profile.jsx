import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState,useEffect } from 'react';
import FadeLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateInStart, updateInError, updateInSuccess, logoutInSuccess } from '../../redux/user/userSlice';
import { cupdateInStart, cupdateInError, cupdateInSuccess, clogoutInSuccess } from '../../redux/organization/companySlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


function Profile() {

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCompany = useSelector((state) => state.company.currentCompany);
  const mode = useSelector((state) => state.theme.mode);
  const Vloading = useSelector((state) => state.user.loading)
  const Cloading = useSelector((state) => state.company.loading)
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});


  const handleImageClick = () => {
    fileInputRef.current.click();
  }
  const changeShow = () => {
    setShow(!show)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file)
      setImage(URL.createObjectURL(file));
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(updateInStart());
      if (imageFile != null) {
        axios.put("https://event-management-system-backend-n47r.onrender.com/api/v1/users/profileImage", {
          profileImage: imageFile
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            const data = response.data.data;
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
            dispatch(updateInSuccess(data));
            setImageFile(null)
            setImage(null);
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
              dispatch(updateInError(error));
              navigate("/login");
              setImageFile(null)
              setImage(null);
            }
            else {
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
              dispatch(updateInError(error));
              setImageFile(null)
              setImage(null);
            }
          })
      }
      if (data) {
        axios.put(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/updateDetail/${currentUser._id}`, {
          data
        })
          .then(function (response) {
            const res = response.data.data;
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
            dispatch(updateInSuccess(res));
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
              dispatch(updateInError(error));
              setData({});
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
              dispatch(updateInError(error))
            }
          })
      }
    }
    else {
      dispatch(cupdateInStart());
      if (imageFile != null) {
        axios.put("https://event-management-system-backend-n47r.onrender.com/api/v1/company/profileImage", {
          profileImage: imageFile
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            const data = response.data.data;
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
            dispatch(cupdateInSuccess(data));
            setImageFile(null)
            setImage(null);
          })
          .catch(function (error) {
            const code = error.response.status;
            if (code == 404) {
              dispatch(clogoutInSuccess());
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
              dispatch(cupdateInError(error));
              navigate("/login");
              setImageFile(null)
              setImage(null);
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
              dispatch(cupdateInError(error));
              setImageFile(null)
              setImage(null);
            }
          })
      }
      if (data) {
        axios.put(`https://event-management-system-backend-n47r.onrender.com/api/v1/company/updateDetail/${currentCompany._id}`, {
          data
        })
          .then(function (response) {
            const res = response.data.data;
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
            dispatch(cupdateInSuccess(res));
          })
          .catch(function (error) {
            const code = error.response.status;
            if (code == 404) {
              dispatch(clogoutInSuccess());
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
              dispatch(cupdateInError(error));
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
              dispatch(cupdateInError(error))
            }
          })
      }
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
        if (currentUser) {
          axios.delete(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/deleteVol/${currentUser._id}`)
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
              dispatch(logoutInSuccess())
              navigate("/login")
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
        } else {
          axios.delete(`https://event-management-system-backend-n47r.onrender.com/api/v1/company/deleteCom/${currentCompany._id}`)
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
              dispatch(clogoutInSuccess())
              navigate("/login")
            })
            .catch(function (error) {
              const code = error.response.status;
              if (code == 404) {
                dispatch(clogoutInSuccess());
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
        }
      }
    });

  }


  // || currentUser ? currentUser.profileImage : currentCompany.profileImage
  return (
    <form className='w-[35%] max-[1100px]:w-[50%] max-[700px]:w-[70%] mx-auto flex flex-col justify-center gap-[20px] items-center py-[30px]' onSubmit={handleSubmit}>
      <div className='text-3xl font-semibold'>Profile</div>
      <div className='w-full flex flex-col items-center'>
        <img src={image ? image : currentUser ? currentUser.profileImage : currentCompany.profileImage} onClick={handleImageClick} className='h-[120px] w-[120px] object-contain rounded-full cursor-pointer' alt="Profile Image" />
        <input type="file" accept='image/*' ref={fileInputRef} name="image" className='hidden' onChange={handleImageChange} />
      </div>
      <div className='w-full flex flex-col gap-[10px]'>
        <div className="firstinput flex flex-col gap-1">
          <input type="text" name="username" placeholder='username' defaultValue={currentUser ? currentUser.username : currentCompany.username} className='px-3 py-2 dark:bg-gray-800 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
        </div>
        <div className="thirdinput flex flex-col gap-1">
          <input type="email" name="email" placeholder='email' defaultValue={currentUser ? currentUser.email : currentCompany.email} className='px-3 py-2 dark:bg-gray-800 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
        </div>
        <div className="fourthinput flex flex-col gap-1 relative">
          <input type={!show ? "password" : "text"} name="password" placeholder='password' className='px-3 py-2 dark:bg-gray-800 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.password ? data.password : ""} onChange={handleChange} />
          <input type="button" className='absolute right-[7px] top-[5px] dark:bg-gray-600 text-sm px-2 py-[5px] rounded-lg text-white bg-slate-700' onClick={changeShow} value={!show ? "Show" : "Hide"} />
        </div>
      </div>
      <div className="button w-1/3 relative ">
        <input type="submit" value={Vloading || Cloading ? " " : "Update"} className='w-full dark:bg-gray-800 py-2 rounded-xl dark:hover:bg-gray-500 transition-all hover:cursor-pointer bg-slate-400 hover:bg-slate-700' />
        <FadeLoader
          color="#4169E1"
          loading={Vloading || Cloading}
          height={15}
          radius={2}
          width={5}
          className='absolute top-[2px] left-[35%]'
        />
      </div>
      <div className='text-red-500 font-semibold cursor-pointer hover:text-red-300' onClick={handleDelete}>
        Delete Account
      </div>
    </form>
  )
}

export default Profile