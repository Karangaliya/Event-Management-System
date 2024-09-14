import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link, NavLink } from "react-router-dom"
import { changeTheme } from '../../redux/theme/themeSlice'
import whiteLogo from "../../assets/primeevent-high-resolution-logo-black.png"
import blackLogo from "../../assets/primeevent-high-resolution-logo.png"
import { logoutInSuccess } from "../../redux/user/userSlice"
import { clogoutInSuccess } from "../../redux/organization/companySlice"
import { toast } from "react-toastify";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import "./Header.css"
import axios from 'axios'

function Header() {

  const [check, setCheck] = useState(false);
  const [dark, setDark] = useState(true)
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCompany = useSelector((state) => state.company.currentCompany);
  const navigate = useNavigate();
  const [open,setOpen] = useState(false)


  const toggleCheck = () => {
    setCheck(!check)
  }

  useEffect(() => {
    setDark(mode === "dark" ? true : false);
  }, [mode])


  const toggleDarkMode = () => (
    dispatch(changeTheme())
  )

  const handleLogOut = () => {
    if (currentUser) {
      axios.post("/api/v1/users/logout")
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
          setCheck(!check);
          navigate("/login")
        })
        .catch(function (error) {
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
        })
    } else {
      axios.post("/api/v1/company/logout")
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
          setCheck(!check);
          dispatch(clogoutInSuccess())
          navigate("/login")
        })
        .catch(function (error) {
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
        })
    }
  }

  const handleOpen = ()=>{
    setOpen(!open)
  }

  return (
    <>
      <header className="header bg-white text-white dark:bg-gray-800 max-h-40 fixed w-full shadow-xl top-0 z-10">
        <nav className='p-2 px-10 flex items-center justify-evenly max-[1100px]:justify-between max-[700px]:px-5'>
          <div className="logo">
            {mode === "dark" ?
              <Link to="/"><img src={blackLogo} alt="black logo" className='h-[80px] max-[700px]:h-[70px]' /></Link> :
              <Link to="/"><img src={whiteLogo} alt='white logo' className='h-20 max-[700px]:h-[70px]' /></Link>
            }
          </div>
          <div className='hidden max-[700px]:block text-3xl text-black dark:text-white' onClick={handleOpen}>
            {!open? <IoMenu /> : <IoCloseSharp />}
          </div>
          <ul className={`flex justify-center gap-6 items-center max-[700px]:absolute max-[700px]:top-[100px] max-[700px]:flex-col max-[700px]:w-[95%] max-[700px]:dark:bg-gray-800 max-[700px]:bg-white max-[700px]:left-[10px] max-[700px]:py-[30px] max-[700px]:transition-all max-[700px]:space-y-3 ${!open? "max-[700px]:hidden" : "max-[700px]:block"}`}>
            <li className='max-[700px]:w-full max-[700px]:flex max-[700px]:justify-center'>
              <div className="flex items-center ">
                <span className="mr-2 dark:text-gray-700 text-gray-300">🌙</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dark}
                    onChange={toggleDarkMode}
                    className="sr-only"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner"></div>
                  <div
                    className={`absolute top-0 left-0 w-6 h-6 dark:bg-white bg-gray-800 rounded-full shadow transform transition-transform duration-300 ${!dark ? 'translate-x-full' : 'translate-x-0'}`}
                  ></div>
                </label>
                <span className="ml-2 text-gray-700 dark:text-gray-300">☀️</span>
              </div>
            </li>
            <li className='max-[700px]:w-full max-[700px]:text-center dark:hover:text-white hover:text-black text-gray-400 font-bold dark:text-gray-400 hover:cursor-pointer transition-all'>
              <NavLink to="/" className={({ isActive }) => `${isActive ? "dark:text-white text-black" : "dark:text-gray-400 text-gray-400"}`}>Home</NavLink>
            </li> 
            {currentUser || !currentCompany ?
              <li className='max-[700px]:w-full max-[700px]:text-center dark:hover:text-white hover:text-black text-gray-400 font-bold dark:text-gray-400 hover:cursor-pointer transition-all'>
                <NavLink to="/events" className={({ isActive }) => `${isActive ? "dark:text-white text-black" : "dark:text-gray-400 text-gray-400"}`}>Events</NavLink>
              </li>
              :
              <li className='max-[700px]:w-full max-[700px]:text-center dark:hover:text-white hover:text-black text-gray-400 font-bold dark:text-gray-400 hover:cursor-pointer transition-all'>
                <NavLink to="/create-event" className={({ isActive }) => `${isActive ? "dark:text-white text-black" : "dark:text-gray-400 text-gray-400"}`}>Create Event</NavLink>
              </li>
            } 
            <li className='max-[700px]:w-full max-[700px]:text-center dark:hover:text-white hover:text-black text-gray-400 font-bold dark:text-gray-400 hover:cursor-pointer transition-all'>
              <NavLink to="/about-us" className={({ isActive }) => `${isActive ? "dark:text-white text-black" : "dark:text-gray-400 text-gray-400"}`}>About Us</NavLink>
            </li>
            <li className='max-[700px]:w-full max-[700px]:text-center dark:hover:text-white hover:text-black text-gray-400 font-bold dark:text-gray-400 hover:cursor-pointer transition-all'>
              <NavLink to="/contact-us" className={({ isActive }) => `${isActive ? "dark:text-white text-black" : "dark:text-gray-400 text-gray-400"}`}>Contact us</NavLink>
            </li>

          </ul>
          <div className='flex gap-5'>
            {currentUser || currentCompany ? <div className='border-4 hover:border-gray-700 rounded-full relative hover:cursor-pointer transition-all' >
              <img src={currentUser? currentUser.profileImage : currentCompany.profileImage} onClick={toggleCheck} className='h-9 w-9 object-contain z-10  rounded-full' alt="profile image" />
            </div> :
              <Link to="/login"><button className='px-7 py-2 ring-2 ring-fuchsia-500 rounded-xl bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500  bg-black transition-colors duration-300 ease-in-out'>Log In</button></Link>
            }
          
          {check && (
            <div className='absolute right-[178px] top-[80px] max-[1100px]:right-[30px] max-[700px]:right-[15px] flex flex-col w-48  text-wrap bg-slate-200 dark:bg-slate-950 rounded-lg text-center transition-all'>
              <div className='px-4 py-3 border-b-[0.1px] dark:border-white border-black  text-gray-800 font-semibold transition-all dark:text-white'>
                {currentUser ? <div className='flex flex-col gap-2 '>
                  <span>{currentUser.username || ""}</span>
                  <span>{currentUser.email || ""}</span>
                </div> : <div className='flex flex-col gap-2 '>
                  <span>{currentCompany.username || ""}</span>
                  <span>{currentCompany.email || ""}</span>
                </div>}
              </div>
              <NavLink to="/dashboard" onClick={toggleCheck}> <div className='px-4 py-3 border-b-[0.1px] dark:border-white border-black  dark:hover:bg-slate-600 text-gray-800 hover:cursor-pointer hover:bg-slate-300  font-semibold transition-all dark:text-white'>
                Profile
              </div></NavLink>
              <div className='px-4 py-3 dark:hover:bg-slate-600 hover:bg-slate-300  text-gray-800 hover:cursor-pointer font-semibold transition-all dark:text-white' onClick={handleLogOut}>
                Log Out
              </div>
            </div>
          )}
          </div> 
        </nav>
      </header>
    </>
  )
}

export default Header