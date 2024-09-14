import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashCom() {
    const currentUser = useSelector((state)=>state.user.currentUser);
    const [company,setCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = ()=>{
            axios.get("/api/v1/company/getCompanys",{
                params:{
                    limit:10
                }
            })
            .then(function (response){
                setCompany(response.data.data.allCompany);
            })
            .catch(function (error){
            })
        } 

        if(currentUser.isAdmin){
            fetchCompany();
        }
    }, [currentUser])


    const handleClickCompany = (key) =>{
        if (key){
            navigate(`/dashboard/comProfile/${key}`);
        }
    }
    
  return (
    <div className='min-h-fit w-full  shadow-xl flex flex-col justify-center px-2 py-3 dark:text-white text-black dark:bg-gray-800 bg-white gap-2 items-center rounded-lg max-[1100px]:w-fit'>
            <div className='w-full flex justify-between px-3 items-center'>
                <div className='text-xl font-semibold'>Organizations</div>
            </div>
            <div className='w-full rounded-lg dark:text-white text-black dark:bg-gray-900 bg-slate-300 max-[1100px]:text-sm'>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Org. Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Org. Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Org. Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Created At</th>
                        </tr>
                    </thead>
                    <tbody className=' dark:text-white text-black dark:bg-gray-800 bg-white'>
                        {company ? company.map((user, index) => (
                            <tr className='dark:hover:bg-gray-600 hover:bg-slate-200 cursor-pointer' key={index} onClick={()=> handleClickCompany(user._id)}>
                                <td className='px-6 py-2'>
                                    <img src={user.profileImage} className='h-10 w-10 object-contain rounded-full' alt="Profile Image" />
                                </td>
                                <td className='px-6 py-2'>
                                    {user.username}
                                </td>
                                <td className='px-6 py-2'>
                                    {user.organizationName}
                                </td>
                                <td className='px-6 py-2'>
                                    {user.email}
                                </td>
                                <td className='px-6 py-2'>
                                    {user.createdAt.split('T')[0]}
                                </td>
                            </tr>
                        )) : ""}
                    </tbody>
                    <tfoot className=' dark:text-white text-black dark:bg-gray-800 bg-white'>
                        <tr>
                            <td colSpan="6" className='text-center px-6 py-2'>
                                <button className='px-7 py-2 ring-2 ring-fuchsia-500 text-white rounded-xl bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500  bg-black transition-colors duration-300 ease-in-out'>See All</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
  )
}

export default DashCom