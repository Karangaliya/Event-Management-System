import React from 'react'

function About() {
    return (
        <div className='min-h-[100vh] pt-[120px] pb-[40px]'>
            <div className="w-[70vw] max-[1100px]:w-[85vw] max-h-full bg-white mx-auto dark:text-white text-black flex flex-col gap-7 dark:bg-gray-800 shadow-2xl rounded-2xl px-[40px] py-[20px]">
                <div className='flex flex-col gap-5 items-center '>
                    <div className='text-4xl text-center font-bold text-[#191970] dark:text-[#ADD8E6]'>About Us</div>
                    <div className='font-semibold text-lg ml-2'>Welcome to PrimeEvent, your premier destination for event management and student opportunities. We bridge the gap between aspiring student workers and event organizers, creating a seamless experience for all.</div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='text-2xl font-semibold mt-5'>Our Mission</div>
                    <div className='ml-7'>At PrimeEvent, our mission is to empower students by providing them with meaningful work opportunities at various events. We aim to simplify the event management process for organizations and companies, ensuring every event runs smoothly and efficiently.</div>
                    <div className='text-2xl font-semibold mt-5'>Our Vision</div>
                    <div className='ml-7'>We envision a world where students can easily find work opportunities that enhance their skills and provide financial support. We strive to become the leading platform for connecting students with event organizers, fostering a community of growth, learning, and collaboration.</div>
                    <div className='text-2xl font-semibold mt-5'>What We Offer</div>
                    <ul className='list-disc pl-8'>
                        <li><span className='font-semibold'>Empowerment </span>: We believe in empowering students by providing them with valuable work opportunities.</li>
                        <li className='mt-3'><span className='font-semibold'>Excellence</span>: We strive for excellence in everything we do, ensuring the highest standards of service and support.</li>
                        <li className='mt-3'><span className='font-semibold'>Community</span>: We foster a community of collaboration, where students and organizers can connect and grow together.</li>
                    </ul>
                    <div className='text-2xl font-semibold mt-5'>Join Us</div>
                    <div className='ml-7'>Whether you are a student looking for work opportunities or an organization planning an event, PrimeEvent is here to help. Join us today and be a part of our growing community.</div>
                </div>
            </div>
        </div>
    )
}

export default About