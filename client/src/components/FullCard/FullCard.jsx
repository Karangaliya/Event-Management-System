import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logoutInSuccess } from '../../redux/user/userSlice';
import { clogoutInSuccess } from '../../redux/organization/companySlice';


function FullCard() {

    const mode = useSelector((state) => state.theme.mode);
    const currentUser = useSelector((state) => state.user.currentUser)
    const currentCompany = useSelector((state) => state.company.currentCompany)
    const indianMobileRegex = /^[6-9]\d{9}$/;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [mobileNumber, setMobileNumber] = useState('');
    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (!eventId) {
            console.log("Event Id is not there");
        }
        if (currentUser) {
            axios.get(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/getSingleEvent/${eventId}`)
                .then(function (response) {
                    setEvent(response.data.data);
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
                    }
                })
            axios.get(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/checkVolApplied/${eventId}`)
                .then(function (response) {
                    setCheck(response.data.data);
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
                    }
                })
        } else {
            axios.get(`https://event-management-system-backend-n47r.onrender.com/api/v1/company/getSingleEvent/${eventId}`)
                .then(function (response) {
                    setEvent(response.data.data);
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
                        navigate("/login");
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
                    }
                })
        }


    }, [])


    const handleSubmit = () => {
        if (!indianMobileRegex.test(mobileNumber)) {
            mode === "dark" ? toast.error("Please enter a valid Indian mobile number.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            }) : toast.error("Please enter a valid Indian mobile number.", {
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
            axios.put(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/applyInEvent/${event._id}`, {
                mobileNumber
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
                    setMobileNumber('');
                    navigate("/dashboard/appliedEvent");
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
                        setMobileNumber('');
                    }
                })
        }
    }

    const handleDelete = ()=>{
        axios.get(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/deleteEvent/${eventId}`)
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
                    navigate("/dashboard/manageEvent");
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
                        navigate("/login");
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
                    }
                })
    }

    const handleCancel = ()=>{
        axios.put(`https://event-management-system-backend-n47r.onrender.com/api/v1/users/cancelApplication/${eventId}`)
        .then(function (response){
            mode==="dark"? toast.success(response.data.message, {
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
            setCheck(false);
            navigate("/dashboard/appliedEvent")
        })
        .catch(function (error){
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


    const eventDate = new Date(event.timing);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return event ? (
        <div className='min-h-[100vh] w-[70%] mx-auto pt-[120px] pb-[40px] flex flex-col gap-[50px] max-[700px]:w-[85%]'>
            <div className="image w-full mx-auto">
                <img src={event?.image} className="w-full h-[50vh] object-cover rounded-xl" alt="Event Image" />
            </div>
            <div className="title w-[80%] mx-auto max-[700px]:w-[90%]">
                <div className='text-3xl font-semibold'>
                    {event?.eventTitle}
                </div>
            </div>
            <div className='space-y-2 '>
                <div className='flex justify-between items-center mx-5'>
                    <div className='text-lg max-[700px]:text-xs dark:text-gray-300 text-gray-600'>
                        {event?.city}
                    </div>
                    <div className='text-lg max-[700px]:text-xs dark:text-gray-300 text-gray-600'>Timing : &nbsp;
                        {formattedDate} {formattedTime}
                    </div>
                </div>
                <hr className='border-gray-500' />
            </div>
            <div className='w-[80%] mx-auto flex flex-col gap-5 mb-[20px] max-[700px]:w-[90%]'>
                <div className='text-2xl font-semibold'>Discription : </div>
                <div>
                    {event?.discription}
                </div>
            </div>
            <div className='flex flex-col gap-5 w-[80%] mx-auto mb-[20px] max-[700px]:w-[90%]'>
                <div className='text-3xl font-semibold'>
                    What to Do at the Event?
                </div>
                <div className='w-[80%] max-[700px]:w-[90%] mx-auto leading-7'>
                    {parse(`${event?.detailDiscription}`)}
                </div>
            </div>
            <div className="w-[80%] max-[700px]:w-[90%] flex justify-between items-center mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 ease-in-out">
                <div className='text-lg font-semibold max-[700px]:text-sm'>Created By : </div>
                <div className="flex items-center space-x-4">
                    <img
                        className="w-12 h-12 rounded-full object-cover shadow-lg"
                        src={event?.org_name?.profileImage}
                        alt="Organization"
                    />
                    <div>
                        <p className="text-lg max-[700px]:text-sm font-medium text-gray-600 dark:text-gray-400">
                            @{event?.org_name?.username}
                        </p>
                        <p className="text-lg max-[700px]:text-sm text-gray-500 dark:text-gray-300">
                            {event?.org_name?.organizationName}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center p-4 border w-[80%] max-[700px]:w-[90%] mx-auto border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600">
                <svg
                    className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 8.515a5.007 5.007 0 0110.758 0c0 1.497-.72 2.834-1.82 3.722l-5.508 3.663a1 1 0 01-1.223 0l-5.508-3.663A5.007 5.007 0 015.12 8.515zM5.121 7a6.992 6.992 0 00-2.52 5.273c0 2.054 1.127 4.118 2.94 5.227l5.508 3.663a2 2 0 002.344 0l5.508-3.663c1.813-1.109 2.94-3.173 2.94-5.227A6.992 6.992 0 0018.879 7h-13.76z"
                    />
                </svg>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Location :&nbsp; <span className="font-normal">{event?.location}</span>
                </p>
            </div>
            <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-600 w-[80%] mx-auto">
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Amount You Get:</span>
                <span className="ml-2 text-xl font-bold text-green-500 dark:text-green-400">{event?.moneyGivenToOne}</span>
            </div>
            {currentUser && !currentUser.isAdmin ? <div className='w-[80%] max-[700px]:w-[90%] mx-auto text-center'>
                {!check? 
                <Popup
                    trigger={<input type='button' value='Apply Now' className="w-[40%] py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 dark:focus:ring-blue-400 transition duration-300 ease-in-out" />
                    }
                    modal
                    closeOnDocumentClick
                    contentStyle={{ backgroundColor: 'transparent', border: 'none', padding: '0' }}
                >
                    {(close) => (
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-10 w-full max-w-lg mx-auto shadow-2xl transform transition-all ease-in-out duration-300">
                            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Volunteer Application</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                We're thrilled that you want to volunteer with us! Please enter your contact number below so we can reach out to you with more details.
                            </p>
                            <input
                                type="tel"
                                placeholder="e.g., +1 234 567 8900"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="w-full p-4 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition ease-in-out duration-200"
                            />
                            <div className="flex justify-end">
                                <input type='submit' value='Submit'
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition ease-in-out duration-200"
                                    onClick={() => {
                                        handleSubmit();
                                        close();
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </Popup> :
                <input type='button' value='Cancel Application' className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out" onClick={handleCancel}/>
                }
            </div>
                :
                <div className='flex flex-col gap-5'>
                    {currentCompany? <div className="w-[80%] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-900 dark:text-white text-lg font-semibold">
                                    Volunteers Applied
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-2xl">
                                    {event.countVol}
                                </p>
                            </div>
                            <Link to={`/appliedVolenteers/${eventId}`}><input type='button' value='See Volunteers' className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-700 dark:to-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-800 dark:hover:to-purple-800" /></Link>
                        </div>
                    </div> : ""}
                    {currentUser && currentUser.isAdmin ? <div className='w-[80%] mx-auto text-center'>
                        <input type='button' value='Delete Document' onClick={handleDelete} className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-700 dark:to-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-800 dark:hover:to-purple-800 cursor-pointer" />
                    </div> : <div className='w-[80%] mx-auto text-center'>
                        <Link to={`/update-event/${eventId}`}><input type='button' value='Update Document' className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-700 dark:to-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-800 dark:hover:to-purple-800 cursor-pointer" /></Link>
                    </div>}
                </div>
            }
        </div>
    ) : ""
}

export default FullCard