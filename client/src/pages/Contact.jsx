import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import whiteLogo from "../assets/primeevent-high-resolution-logo-black.png"
import blackLogo from "../assets/primeevent-high-resolution-logo.png"
import axios from 'axios'
import { toast } from 'react-toastify'

function Contact() {

    const mode = useSelector((state) => state.theme.mode);
    const [data,setData] = useState({})
    const currentUser = useSelector((state)=>state.user.currentUser)
    const currentCompany = useSelector((state)=>state.company.currentCompany)
    let idd = '';

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        currentUser ? idd = currentUser._id : idd = currentCompany._id;
        axios.post(`/api/v1/question/createQue/${idd}`,{
            data
        })
        .then(function(response){
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
            setData({})
        })
        .catch(function(error){
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

    return (
        <div className='min-h-[100vh] w-full pt-[120px] pb-[40px]'>
            <div className="w-[70vw] max-[1100px]:w-[85vw] dark:bg-gray-800 bg-white mx-auto gap-8 py-[60px] rounded-xl shadow-xl flex justify-center items-center px-[20px] max-[700px]:flex-col">
                <div className="left w-[30%] max-[700px]:w-[100%] space-y-2 max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-4">
                    <div className="logo  ">
                        {mode === "dark" ?
                            <img src={blackLogo} alt="black logo" className='h-[120px]' /> :
                            <img src={whiteLogo} alt='white logo' className='h-[120px]' />
                        }
                    </div>
                    <div className="text-sm dark:text-white text-black">
                        Please enter your details and submit your question. If your question is deemed meaningful, a response will be sent to your provided email address. Ensure you enter a valid email address.
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="right w-[50%] max-[700px]:w-[100%] flex flex-col gap-5   ">
                        <div className='text-4xl mb-7 font-bold text-center text-[#191970] dark:text-[#ADD8E6]'>
                            Contact Us
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className='mx-1 dark:text-white text-black'>Email : </label>
                            <input type="email" name="email" value={data.email || ""} placeholder='ex. abc@gmail.com'  className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="question" className='mx-1 dark:text-white text-black'>Ask a Questions : </label>
                            <textarea name="question" rows="7" className='px-3 py-2 dark:bg-gray-900 dark:text-white rounded-xl bg-slate-400 text-black placeholder:text-slate-600 dark:placeholder:text-gray-500' value={data.question || ""} placeholder='Ask Your Questions..!' onChange={handleChange}/>
                        </div>
                        <div className="button w-full ">
                            <input type="submit" value="Submit" className='w-full dark:bg-gray-900 py-2 rounded-xl dark:hover:bg-gray-500 transition-all hover:cursor-pointer bg-slate-400 hover:bg-slate-700 text-white' />
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Contact