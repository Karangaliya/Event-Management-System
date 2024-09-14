import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import whiteLogo from "../../assets/primeevent-high-resolution-logo-black.png"
import blackLogo from "../../assets/primeevent-high-resolution-logo.png"
import { Link } from 'react-router-dom'
import { loginInStart, loginInSuccess, loginInError } from "../../redux/user/userSlice"
import { cloginInStart,cloginInSuccess,cloginInError} from "../../redux/organization/companySlice"
import FadeLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";

function Login() {

    const [show, setShow] = useState(false)
    const [isVolenteer, setIsVolenteer] = useState(true)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const Vloading = useSelector((state) => state.user.loading)
    const Cloading = useSelector((state) => state.company.loading)
    const navigate = useNavigate();

    const mode = useSelector((state) => state.theme.mode);

    const changeShow = () => {
        setShow(!show)
    }

    const changeIsVol = (e) => {
        setIsVolenteer(e.target.name === "volenteer" ? true : false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.username === '' || data.email === '' || data.password === '') {
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
        try {
            if (isVolenteer) {
                dispatch(loginInStart());
                axios.post("https://event-management-system-backend-n47r.onrender.com/api/v1/users/login", {
                    username: data.username,
                    email: data.email,
                    password: data.password
                })
                .then(function (response) {
                    const res = response.data.data;
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
                    setData({
                        username :"",
                        email :"",
                        password :""
                    })
                    dispatch(loginInSuccess(res));
                    navigate("/")
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
                    dispatch(loginInError(error))
                })
            } else {
                dispatch(cloginInStart());
                axios.post("https://event-management-system-backend-n47r.onrender.com/api/v1/company/login", {
                    username: data.username,
                    email: data.email,
                    password: data.password
                })
                    .then(function (response) {
                        const ress = response.data.data;
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
                        dispatch(cloginInSuccess(ress));
                        navigate("/")
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
                        dispatch(cloginInError(error))
                    })
            }
        } catch (error) {
            mode === "dark" ? toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            }) : toast.error(error.message, {
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
    }


    return (
        <div className='pt-[120px] min-h-[100vh] pb-[40px] flex items-center'>
            <div className='w-[70vw] max-h-full bg-white mx-auto text-white dark:bg-gray-800 shadow-2xl rounded-2xl flex justify-center items-center py-8 gap-8 max-[1100px]:w-[80vw] max-[700px]:w-[91vw] max-[700px]:flex-col max-[700px]:gap-10'>
                <div className="left w-[30%] space-y-2 flex relative flex-col justify-start max-[700px]:w-[90%]">
                    <div className="login text-4xl absolute top-[-130px] max-[700px]:top-[-10px] font-semibold text-[#191970] dark:text-[#ADD8E6]">
                        Log In
                    </div>
                    <div className='max-[700px]:flex max-[700px]:flex-col max-[700px]:justify-center max-[700px]:items-center max-[700px]:gap-4'>
                        <div className="logo  ">
                            {mode === "dark" ?
                                <img src={blackLogo} alt="black logo" className='h-[120px]' /> :
                                <img src={whiteLogo} alt='white logo' className='h-[120px]' />
                            }
                        </div>
                        <div className="text-sm dark:text-white text-black">
                            PrimeEvent is a comprehensive event management system designed to manage events and generate revenue from them.
                        </div>
                    </div>
                </div>
                <form className='w-[40%] max-[700px]:w-[90%]' onSubmit={handleSubmit}>
                    <div className="right flex flex-col gap-7 p-10 pt-14 dark:bg-gray-700 shadow-xl rounded-2xl relative">
                        <div className='flex items-center gap-1 w-full dark:bg-gray-800 left-0 absolute top-0'>
                            <input type='button' className={isVolenteer?'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white ring-2 dark:ring-white ring-black':'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white'}  name='volenteer' onClick={changeIsVol} value='Volenteer'/>
                            <input type='button' className={!isVolenteer?'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white ring-2 dark:ring-white ring-black':'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white'}name='organization' onClick={changeIsVol} value='Organization'/>
                        </div>
                        <div className="firstinput flex flex-col gap-1">
                            <label htmlFor="username" className='mx-1 dark:text-white text-black'>User Name : </label>
                            <input type="text" name="username" placeholder={isVolenteer ? "ex. Joe123" : "ex. Company Username"} className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.username} onChange={handleChange} />
                        </div>
                        <div className="thirdinput flex flex-col gap-1">
                            <label htmlFor="email" className='mx-1 dark:text-white text-black'>Email : </label>
                            <input type="email" name="email" placeholder='ex. abc@gmail.com' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.email} onChange={handleChange} />
                        </div>
                        <div className="fourthinput flex flex-col gap-1 relative">
                            <label htmlFor="password" className='mx-1 dark:text-white text-black'>Password : </label>
                            <input type={!show ? "password" : "text"} name="password" placeholder='password' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.password} onChange={handleChange} />
                            <input type="button" className='absolute right-[7px] top-[33px] dark:bg-gray-600 text-sm px-2 py-[5px] rounded-lg text-white bg-slate-700' onClick={changeShow} value={!show ? "Show" : "Hide"} />
                        </div>
                        <div className="button w-full relative ">
                            <input type="submit" value={Vloading || Cloading? " ":"Log In"} className='w-full dark:bg-gray-900 py-2 rounded-xl dark:hover:bg-gray-500 transition-all hover:cursor-pointer bg-slate-400 hover:bg-slate-700' />
                            <FadeLoader
                                color="#4169E1"
                                loading={Vloading || Cloading}
                                height={15}
                                radius={2}
                                width={5}
                                className='absolute top-1 left-[45%]'
                            />
                        </div>
                        <div className="text text-sm dark:text-white text-black">Don't Have An Account? <Link to="/register" className='text-blue-500 font-semibold hover:underline'>Register</Link></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login