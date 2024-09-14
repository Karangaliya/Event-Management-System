import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux'
import { clogoutInSuccess } from '../redux/organization/companySlice';
import { logoutInSuccess } from '../redux/user/userSlice';
import 'react-quill/dist/quill.snow.css';
import FadeLoader from "react-spinners/ClipLoader";
import "../App.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {

    const [data, setData] = useState({
        eventTitle: '',
        discription: '',
        detailDiscription: '',
        location: '',
        city: '',
        timing: '',
        moneyGivenToOne: 0
    });
    const [imageFile, setImageFile] = useState(null)
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentCompany = useSelector((state) => state.company.currentCompany);
    const [loading, setLoading] = useState(false);
    const mode = useSelector((state) => state.theme.mode);
    const eventFileImage = useRef(null);
    const mainCities = {
        "Andhra Pradesh": "Visakhapatnam",
        "Arunachal Pradesh": "Itanagar",
        "Assam": "Guwahati",
        "Bihar": "Patna",
        "Chhattisgarh": "Raipur",
        "Goa": "Panaji",
        "Gujarat": "Ahmedabad",
        "Haryana": "Gurgaon",
        "Himachal Pradesh": "Shimla",
        "Jammu and Kashmir": "Srinagar",
        "Jharkhand": "Ranchi",
        "Karnataka": "Bengaluru",
        "Kerala": "Thiruvananthapuram",
        "Madhya Pradesh": "Bhopal",
        "Maharashtra": "Mumbai",
        "Manipur": "Imphal",
        "Meghalaya": "Shillong",
        "Mizoram": "Aizawl",
        "Nagaland": "Kohima",
        "Odisha": "Bhubaneswar",
        "Punjab": "Ludhiana",
        "Rajasthan": "Jaipur",
        "Sikkim": "Gangtok",
        "Tamil Nadu": "Chennai",
        "Telangana": "Hyderabad",
        "Tripura": "Agartala",
        "Uttar Pradesh": "Lucknow",
        "Uttarakhand": "Dehradun",
        "West Bengal": "Kolkata",
        "Delhi": "New Delhi",
        "Chandigarh": "Chandigarh",
        "Puducherry": "Pondicherry",
        "Andaman and Nicobar Islands": "Port Blair",
        "Dadra and Nagar Haveli and Daman and Diu": "Daman",
        "Lakshadweep": "Kavaratti",
        "Ladakh": "Leh"
    };




    const handleOpenImage = () => {
        eventFileImage.current.click();
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
        if (data.eventTitle === '' || data.discription === '' || data.detailDiscription === '' || data.location === '' || data.city === '' || data.timing === '' || data.moneyGivenToOne === 0) {
            return mode === "dark" ? toast.error("All Fields are Empty..!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            }) : toast.error("All Fields are Empty..!", {
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
        if (imageFile === null) {
            return mode === "dark" ? toast.error("Please Choose Image ..!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            }) : toast.error("Please Choose Image ..!", {
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
        setLoading(true)
        if (currentCompany) {
            axios.post("/api/v1/company/createEvent", {
                data,
                imageFile
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
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
                    setImageFile(null)
                    setImage(null);
                    setLoading(false)
                    setData({});
                    navigate("/dashboard/currentEvents") // TODO : transfer to /dashboard/currentEvent
                })
                .catch(function (error) {
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
                        setImageFile(null)
                        setImage(null);
                        setLoading(false)
                        setData({});
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
                        setImageFile(null)
                        setImage(null);
                        setLoading(false)
                        setData({});
                    }
                })
        } else {
            axios.post("/api/v1/users/createEvent", {
                data,
                imageFile
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
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
                    setImageFile(null)
                    setImage(null);
                    setLoading(false)
                    setData({});
                    navigate("/dashboard") // TODO : transfer to /dashboard/currentEvent
                })
                .catch(function (error) {
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
                        setImageFile(null)
                        setImage(null);
                        setLoading(false)
                        setData({});
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
                        setImageFile(null)
                        setImage(null);
                        setLoading(false)
                        setData({});
                    }
                })
        }
    }

    return (
        <div className='min-h-[100vh] pt-[120px] pb-[40px]'>
            <div className='w-[95%] mx-auto shadow-2xl dark:bg-gray-800 bg-white rounded-xl px-[30px] py-[30px]'>
                <form onSubmit={handleSubmit} className=' flex flex-col gap-[30px] justify-center items-center'>
                    <div className='text-4xl font-semibold text-[#191970] dark:text-[#ADD8E6] mb-[20px]'>Create Events</div>
                    <div className='flex gap-[80px] max-[1100px]:gap-8 max-[480px]:gap-12 justify-center w-full max-[1100px]:flex-col-reverse'>
                        <div className="image w-[30%] max-[1100px]:w-full flex flex-col justify-between max-[1100px]:gap-10">
                            <div className='flex flex-col gap-5'>
                                <label htmlFor="image" className="dark:text-white text-black text-sm ml-2">Choose Image : </label>
                                <img src={image ? image : "https://events.liveto.io/_next/static/media/default_event.82c17d7a.png"} className='cursor-pointer h-[390px] border dark:border-white border-black w-full' accept='image/*' onClick={handleOpenImage} alt="event image" />
                                <input type="file" name="image" ref={eventFileImage} className='hidden' onChange={handleImageChange} />
                            </div>
                            <div className='w-full relative'>
                                <input type='submit' className='px-7 py-2 ring-2 text-white ring-fuchsia-500 w-full rounded-xl bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500  bg-black transition-colors duration-300 ease-in-out' value={!loading ? "Create Event" : " "} />
                                <FadeLoader
                                    color="#4169E1"
                                    loading={loading}
                                    height={15}
                                    radius={2}
                                    width={5}
                                    className='absolute top-1 left-[45%]'
                                />
                            </div>
                        </div>
                        <div className='w-[50%] max-[1100px]:w-full flex flex-col gap-4'>
                            <div className="title flex flex-col gap-2">
                                <label htmlFor="eventTitle" className="dark:text-white text-black text-sm ml-2">Enter Title : </label>
                                <input type="text" name="eventTitle" placeholder='Title' value={data.eventTitle} className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
                            </div>
                            <div className="price flex flex-col gap-2">
                                <label htmlFor="moneyGivenToOne" className="dark:text-white text-black text-sm ml-2">Enter Amount : </label>
                                <input type="number" name="moneyGivenToOne" placeholder='Amount' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} value={data.moneyGivenToOne} />
                            </div>
                            <div className="title flex flex-col gap-2">
                                <label htmlFor="location" className="dark:text-white text-black text-sm ml-2">Enter Address : </label>
                                <input type="text" name="location" placeholder='Address' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} value={data.location} />
                            </div>
                            <div className="time flex gap-2">
                                <div className="time flex flex-col gap-2 w-[50%]">
                                    <label htmlFor="timing" className="dark:text-white text-black text-sm ml-2">Enter Time of Event : </label>
                                    <input type="datetime-local" name="timing" value={data.timing} className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange} />
                                </div>
                                <div className="time flex flex-col gap-2 w-[50%]">
                                    <label htmlFor="city" className="dark:text-white text-black text-sm ml-2">Choose City : </label>
                                    <select name="city" value={data.city} className='dark:bg-gray-900 dark:text-white bg-slate-400 text-black px-3 rounded-xl py-2' onChange={handleChange}>
                                        {Object.values(mainCities).map((city, index) => (
                                            <option key={index} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="discription flex flex-col gap-2">
                                <label htmlFor="discription" className="dark:text-white text-black text-sm ml-2">Enter Discription : </label>
                                <textarea name="discription" value={data.discription} rows="4" cols="35" className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange}></textarea>
                            </div>
                            <div className="rt flex flex-col gap-2 h-[290px]">
                                <label htmlFor="detailDiscription" className="dark:text-white text-black text-sm ml-2">Enter Detail Discription : </label>
                                <ReactQuill theme="snow" className=' h-[80%] w-full' name='detailDiscription'
                                    onChange={(value) => setData({ ...data, detailDiscription: value })} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent