import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import whiteLogo from "../../assets/primeevent-high-resolution-logo-black.png"
import blackLogo from "../../assets/primeevent-high-resolution-logo.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import FadeLoader from "react-spinners/ClipLoader"
const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]+$/;
const usernameValidationRegex = /^[a-zA-Z][a-zA-Z0-9._-]{2,19}$/;
const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/

function Register() {

    const [show, setShow] = useState(false)
    const [isVolenteer, setIsVolenteer] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        email: '',
        fullName: '',
        password: ''
    });

    const mode = useSelector((state) => state.theme.mode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const changeShow = () => {
        setShow(!show)
    }

    const changeIsVol = (e) => {
        setIsVolenteer(e.target.name === "volenteer" ? true : false)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (data.username==='' || data.email==='' || data.password==='' || data.fullName===''){
            return mode==="dark"? toast.error("All Fields are Empty..!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                })  :  toast.error("All Fields are Empty..!", {
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

        if (!emailValidationRegex.test(data.email)){
            return mode==="dark"? toast.error("Please Enter Valid Email..!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                })  :  toast.error("Please Enter Valid Email..!", {
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


        if (!usernameValidationRegex.test(data.username)){
            return mode==="dark"? toast.error("Username must be 3-20 characters long, start with a letter, and contain only letters, numbers, dots, underscores, or hyphens.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                })  :  toast.error("Username must be 3-20 characters long, start with a letter, and contain only letters, numbers, dots, underscores, or hyphens.", {
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
        if(!passwordValidationRegex.test(data.password)){
            return mode==="dark"? toast.error("Password must be 8-20 chars long and include an uppercase letter, a lowercase letter, and a digit.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                })  :  toast.error("Password must be 8-20 chars long and include an uppercase letter, a lowercase letter, and a digit.", {
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
            if (isVolenteer){
                setLoading(true);
                axios.post("https://event-management-system-backend-n47r.onrender.com/api/v1/users/register",{
                    username : data.username,
                    email : data.email,
                    password : data.password,
                    fullName : data.fullName
                })
                .then(function (response){
                    mode==="dark"? toast.success(response.data, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                        })  :  toast.success(response.data, {
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
                        username: '',
                        email: '',
                        fullName: '',
                        password: ''
                    })
                    navigate("/login")
                    setLoading(false)
                })
                .catch(function (error){
                    mode==="dark"? toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                        })  :  toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                        });
                setLoading(false)
                })
            }else{
                setLoading(true)
                axios.post("https://event-management-system-backend-n47r.onrender.com/api/v1/company/register",{
                    username : data.username,
                    email : data.email,
                    password : data.password,
                    organizationName : data.fullName
                })
                .then(function (response){
                    mode==="dark"? toast.success(response.data, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                        })  :  toast.success(response.data, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                        });
                    navigate("/login")
                    setLoading(false)
                })
                .catch(function (error){
                    mode==="dark"? toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                        })  :  toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                        });
                    setLoading(false)
                })
            }
        } catch (error) {
            setErrorMassage(error.message);
        }
    }


    useEffect(() => {
 
    }, [])
    

    return (
        <div className='pt-[120px] min-h-[100vh] pb-[50px]'>
            <div className='w-[70vw] bg-white mx-auto text-white dark:bg-gray-800 shadow-2xl rounded-2xl flex justify-center items-center py-8 gap-8 max-[1100px]:w-[80vw] max-[700px]:w-[91vw] max-[700px]:flex-col max-[700px]:gap-10'>
                <div className="left w-[30%] space-y-2 relative text-4xl max-[700px]:w-[90%]">
                    <div className='absolute top-[-160px] max-[700px]:top-[-20px] font-semibold text-[#191970] dark:text-[#ADD8E6]'>
                        Register
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
                            <input type='button' className={isVolenteer?'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white ring-2 dark:ring-white ring-black':'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white'} name='volenteer' onClick={changeIsVol} value="Volenteer" />
                            <input type='button' className={!isVolenteer?'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white ring-2 dark:ring-white ring-black':'dark:bg-gray-700 px-5 py-2 rounded-tr-lg rounded-tl-lg focus:ring-2 bg-white shadow-xl dark:shadow-none text-black dark:text-white'} name='organization' onClick={changeIsVol} value="Organization"/>
                        </div>
                        <div className="firstinput flex flex-col gap-1">
                            <label htmlFor="username" className='mx-2 dark:text-white text-black'>User Name : </label>
                            <input type="text" name="username" placeholder={isVolenteer ? "ex. Joe123" : "ex. Company Username"} className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.username} onChange={handleChange} />
                        </div>
                        <div className="secondinput flex flex-col gap-1">
                            <label htmlFor="fullName" className='mx-2 dark:text-white text-black'>{isVolenteer ? "Full Name : " : "Organization Name : "}</label>
                            <input type="text" name="fullName" placeholder={isVolenteer ? "ex. Joe Root" : "ex. Amul"} className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.fullName} onChange={handleChange} />
                        </div>
                        <div className="thirdinput flex flex-col gap-1">
                            <label htmlFor="email" className='mx-2 dark:text-white text-black'>Email : </label>
                            <input type="email" name="email" placeholder='ex. abc@gmail.com' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.email} onChange={handleChange} />
                        </div>
                        <div className="fourthinput flex flex-col gap-1 relative">
                            <label htmlFor="password" className='mx-2 dark:text-white text-black'>Password : </label>
                            <input type={!show ? "password" : "text"} name="password" placeholder='password' className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.password} onChange={handleChange} />
                            <input type='button' className='absolute right-[7px] top-[33px] dark:bg-gray-600 text-sm px-2 py-[5px] rounded-lg text-white bg-slate-700' onClick={changeShow} value={!show ? "Show" : "Hide"}/>
                        </div>
                        <div className="button w-full relative">
                            <input type="submit" value={loading? " ":"Register"} className='w-full dark:bg-gray-900 py-2 rounded-xl dark:hover:bg-gray-500 transition-all hover:cursor-pointer bg-slate-400 hover:bg-slate-700' />
                            <FadeLoader
                                color="#4169E1"
                                loading={loading}
                                height={15}
                                radius={2}
                                width={5}
                                className='absolute top-1 left-[45%]'
                            />
                        </div>
                        <div className="text text-sm dark:text-white text-black">Have An Account? <Link to="/login" className='text-blue-500 transition-all font-semibold hover:underline'>Log In</Link></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register