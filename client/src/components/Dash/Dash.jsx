import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiUserGroup, HiArrowNarrowUp } from "react-icons/hi";
import { HiBuildingOffice2 } from "react-icons/hi2"
import { IoCalendar } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dash() {

    const currentUser = useSelector((state) => state.user.currentUser);
    const [volenteers, setVolenteers] = useState([])
    const [company, setCompany] = useState([]);
    const [event, setEvent] = useState([]);
    const [totalVol, setTotalVol] = useState('');
    const [totalCom, setTotalCom] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVolenteer = () => {
            axios.get("https://event-management-system-backend-n47r.onrender.com/api/v1/users/getVolenteers", {
                params: {
                    limit: 7,
                }
            })
                .then(function (response) {
                    setVolenteers(response.data.data.allVolenteer);
                    setTotalVol(response.data.data.countVolenteer);
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
        const fetchCompany = () => {
            axios.get("https://event-management-system-backend-n47r.onrender.com/api/v1/company/getCompanys", {
                params: {
                    limit: 7,
                }
            })
                .then(function (response) {
                    setCompany(response.data.data.allCompany);
                    setTotalCom(response.data.data.countCompany);
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
        const fetchEvent = () => {
            axios.get("https://event-management-system-backend-n47r.onrender.com/api/v1/users/getAllEvent")
                .then(function (response) {
                    console.log(response)
                    setEvent(response.data.data);
                })
                .catch(function (error) {
                    console.log(error)
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
                    })
                })
        }

        if (currentUser.isAdmin) {
            fetchVolenteer();
            fetchCompany();
            fetchEvent();
        }

    }, [currentUser])

    const handleVolChange = () => {
        navigate("/dashboard/volenteers");
    }

    const handleComChange = () => {
        navigate("/dashboard/companys");
    }

    const handleClickVolenteer = (key) => {
        if (key) {
            navigate(`/dashboard/volProfile/${key}`);
        }
    }

    const handleClickCompany = (key) => {
        if (key) {
            navigate(`/dashboard/comProfile/${key}`)
        }
    }


    return (
        <div className='min-h-[100vh] mx-auto flex flex-col gap-5 items-center'>
            <div className='w-[95%] mx-auto max-[600px]:w-full flex gap-5 justify-center items-center max-[600px]:flex-col'>
                <div className='bg-white w-1/3 h-[100px] max-[1100px]:h-[130px] max-[600px]:w-full  flex justify-between rounded-lg items-start dark:text-white text-black dark:bg-gray-800 px-[10px] py-[10px] shadow-xl'>
                    <div className='flex gap-3 flex-col'>
                        <div>
                            <div>TOTAL VOLENTEERS</div>
                            <div>{totalVol || 0}</div>
                        </div>
                        <div className='flex items-center text-sm'><span className='text-green-400 flex items-center'><HiArrowNarrowUp />5</span> &nbsp; Last Month</div>
                    </div>
                    <div className='p-[12px] bg-amber-400 rounded-full'>
                        <HiUserGroup />
                    </div>
                </div>
                <div className='bg-white w-1/3 h-[100px] max-[1100px]:h-[130px]  max-[600px]:w-full flex justify-between rounded-lg items-start dark:text-white text-black dark:bg-gray-800 px-[10px] py-[10px] shadow-xl'>
                    <div className='flex gap-3 flex-col'>
                        <div>
                            <div>TOTAL ORGANIZATIONS</div>
                            <div>{totalCom || 0}</div>
                        </div>
                        <div className='flex items-center text-sm'><span className='text-green-400 flex items-center'><HiArrowNarrowUp />5</span> &nbsp; Last Month</div>
                    </div>
                    <div className='p-[12px] bg-teal-500 rounded-full'>
                        <HiBuildingOffice2 />
                    </div>
                </div>
                <div className='bg-white w-1/3 h-[100px] max-[1100px]:h-[130px] max-[600px]:w-full  flex justify-between rounded-lg items-start dark:text-white text-black dark:bg-gray-800 px-[10px] py-[10px] shadow-xl'>
                    <div className='flex gap-3 flex-col'>
                        <div>
                            <div>TOTAL EVENTS</div>
                            <div>{event.length}</div>
                        </div>
                        <div className='flex items-center text-sm'><span className='text-green-400 flex items-center'><HiArrowNarrowUp />5</span> &nbsp; Last Month</div>
                    </div>
                    <div className='p-[12px] bg-green-500 rounded-full'>
                        <IoCalendar />
                    </div>
                </div>
            </div>
            <div className='flex max-[780px]:overflow-y-scroll max-[780px]:w-full flex-col gap-5'>
                <div className='w-[83%] max-[780px]:w-fit shadow-xl flex flex-col justify-center px-2 py-3 dark:text-white text-black dark:bg-gray-800 bg-white gap-2 items-center rounded-lg'>
                    <div className='w-full flex justify-between px-3 items-center'>
                        <div className='text-xl font-semibold'>Volenteers</div>
                        <button className='px-7 py-2 ring-2 ring-fuchsia-500 text-white rounded-xl bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500  bg-black transition-colors duration-300 ease-in-out' onClick={handleVolChange}>See All</button>
                    </div>
                    <div className='w-full rounded-lg dark:text-white text-black dark:bg-gray-900 bg-slate-300'>
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">User Image</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">User Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                                </tr>
                            </thead>
                            <tbody className=' dark:text-white text-black dark:bg-gray-800 bg-white'>
                                {volenteers ? volenteers.map((user, index) => (
                                    <tr className='dark:hover:bg-gray-600 hover:bg-slate-200 cursor-pointer' key={user._id} onClick={() => handleClickVolenteer(user._id)}>
                                        <td className='px-6 py-2'>
                                            <img src={user.profileImage} className='h-10 w-10 object-contain rounded-full' alt="Profile Image" />
                                        </td>
                                        <td className='px-6 py-2'>
                                            {user.username}
                                        </td>
                                        <td className='px-6 py-2'>
                                            {user.email}
                                        </td>
                                    </tr>
                                )) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-[83%] max-[780px]:w-fit shadow-xl flex flex-col justify-center px-2 py-3 dark:text-white text-black dark:bg-gray-800 bg-white gap-2 items-center rounded-lg'>
                    <div className='w-full flex justify-between px-3 items-center'>
                        <div className='text-xl font-semibold'>Organizations</div>
                        <button className='px-7 py-2 ring-2 ring-fuchsia-500 text-white rounded-xl bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500  bg-black transition-colors duration-300 ease-in-out' onClick={handleComChange}>See All</button>
                    </div>
                    <div className='w-full rounded-lg dark:text-white text-black dark:bg-gray-900 bg-slate-300'>
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Organization Image</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Organization Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                                </tr>
                            </thead>
                            <tbody className=' dark:text-white text-black dark:bg-gray-800 bg-white'>
                                {company ? company.map((user) => (
                                    <tr className='dark:hover:bg-gray-600 hover:bg-slate-200 cursor-pointer' onClick={() => handleClickCompany(user._id)} key={user._id}>
                                        <td className='px-6 py-2'>
                                            <img src={user.profileImage} className='h-10 w-10 object-contain rounded-full' alt="Profile Image" />
                                        </td>
                                        <td className='px-6 py-2'>
                                            {user.username}
                                        </td>
                                        <td className='px-6 py-2'>
                                            {user.email}
                                        </td>
                                    </tr>
                                )) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dash