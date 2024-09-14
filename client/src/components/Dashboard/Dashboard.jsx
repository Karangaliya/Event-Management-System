import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDashboardCustomize,MdLogout } from "react-icons/md"
import { HiUser,HiBuildingOffice2 } from "react-icons/hi2"
import { HiPencilAlt,HiUserGroup } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { clogoutInSuccess } from '../../redux/organization/companySlice';
import { logoutInSuccess } from '../../redux/user/userSlice';
import { FaCalendarCheck } from "react-icons/fa";
import { NavLink,Outlet,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Dashboard() {

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCompany = useSelector((state) => state.company.currentCompany);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state)=>state.theme.mode);
  
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
      axios.post("api/v1/company/logout")
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
 return (
  currentUser || currentCompany?
    <div className='min-h-[100vh] pt-[107px] pb-[12px] flex max-[1100px]:flex-col  max-[1100px]:gap-5 w-full'>
      <div className="sidebar bg-white w-[20%] max-[1100px]:w-full max-[700px]:w-[100%] text-white rounded-r-lg dark:bg-gray-800 border-r-2 max-[1100px]:border-r-0 border-b-2 border-t-2 border-slate-400">
        <nav className='w-full min-h-[100vh] py-[20px] px-[8px] max-[1100px]:min-h-fit'>
          <ul className='flex flex-col gap-2'>
            {
              !currentCompany && currentUser && currentUser.isAdmin?
                <>
                  <NavLink to="/dashboard/dash"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><MdDashboardCustomize />Dashboard</li></NavLink>
                  <NavLink to="/dashboard/profile"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><HiUser />Profile</li></NavLink>
                  <NavLink to="/create-event"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><HiPencilAlt />Create Event</li></NavLink>
                  <NavLink to="/dashboard/volenteers"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><HiUserGroup />Volenteers</li></NavLink>
                  <NavLink to="/dashboard/companys"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><HiBuildingOffice2 />Organizations</li></NavLink>
                  <NavLink to="/dashboard/manageEvent"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><IoCalendar />Manage Events</li></NavLink>
                  <li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700' onClick={handleLogOut}><MdLogout />Log Out</li>
                </>
                :
                <>
                </>
            }
            {
              currentUser && !currentUser.isAdmin ? <>
                <NavLink to="/dashboard/profile"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><HiUser />Profile</li></NavLink>
                <NavLink to="/dashboard/appliedEvent"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><IoCalendar />Applied Events</li></NavLink>
                <NavLink to="/dashboard/finishedEvent"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><FaCalendarCheck />Finished Event</li></NavLink>
                <li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700' onClick={handleLogOut}><MdLogout />Log Out</li>
              </> :
              <>
              </>
            }
            {
              currentCompany ? <>
                <NavLink to="/dashboard/profile"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><HiUser />Profile</li></NavLink>
                <NavLink to="/dashboard/currentEvents"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><IoCalendar />Current Events</li></NavLink>
                <NavLink to="/dashboard/CfinishedEvents"  className={({isActive})=>`${isActive? 'bg-slate-300 dark:bg-gray-700 rounded-lg' : ''}`}><li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700'><FaCalendarCheck />Finished Events</li></NavLink>
                <li className='rounded-lg flex gap-3 items-center justify-start text-lg px-[10px]  py-[8px] hover:cursor-pointer dark:text-white text-black hover:bg-slate-300 dark:hover:bg-gray-700' onClick={handleLogOut}><MdLogout />Log Out</li>
              </>
                :
              <>
              </>
            }
          </ul>
        </nav>
      </div>
      <div className='w-[70%] max-[1100px]:w-full mx-auto max-[1100px]:px-[10px] max-[780px]:overflow-y-scroll'>
        <Outlet/>
      </div>
    </div>
    :
    <div>
    </div>
  ) 
}

export default Dashboard