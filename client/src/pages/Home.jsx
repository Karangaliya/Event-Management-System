import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

function Home() {

    const currentUser = useSelector((state) => state.user.currentUser);
    const currentCompany = useSelector((state) => state.company.currentCompany);


    return (
        <main className='min-h-[100vh] pt-[110px] text-white dark:bg-gray-900 bg-slate-100 flex flex-col gap-16 justify-center'>
            <div className="hero flex justify-between w-[70vw] mx-auto max-[1100px]:w-[85vw]">
                <div className='flex flex-col gap-8'>
                    <h1 className='text-5xl font-bold dark:text-white text-black'>Welcome To Prime Event</h1>
                    <div className='text-sm dark:text-gray-500 text-[#4F4F4F]'>Empowering Students and Organizations to Create and Manage Unforgettable Events, Join Our Platform to Earn Money by Working at Events or Host Your Own Spectacular Event with Ease</div>
                    {currentUser ? 
                    <Link to="/events"><div className='text-teal-500 hover:underline font-medium'>
                        See all Events      
                    </div></Link>
                    :
                    ""
                    }
                </div>
            </div>
            <div className="info w-[100%]  text-white shadow-xl dark:bg-gray-800 flex flex-col justify-center pl-[220px] max-[1100px]:pl-[100px] max-[700px]:pl-[20px] max-[700px]:text-xs py-10">
                {currentUser || !currentCompany ? <div>
                    <div className='text-2xl mb-4 font-semibold text-[#191970] dark:text-[#ADD8E6]'> What you can do in this System ?</div>
                    <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; You can view all events based on your location. </div>
                    <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; And you can apply for these events. </div>
                    <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; After selecting these events, you will need to work at them. </div>
                    <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; You will earn money based on the events you participate in. </div>
                </div> :
                    <div>
                        <div className='text-2xl mb-4 font-semibold text-[#191970] dark:text-[#ADD8E6]'> What you can do in this System ?</div>
                        <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; You can add events that you organize and where you need volunteers. </div>
                        <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; After creating an event, you need to select volunteers from the list of applicants. </div>
                        <div className='dark:text-[#D3D3D3] text-[#4F4F4F]'>&nbsp;&nbsp;&nbsp; -&gt; After the event is finished, you need to pay the volunteers </div> 
                    </div>
                }
            </div>
        </main>
    )
}

export default Home