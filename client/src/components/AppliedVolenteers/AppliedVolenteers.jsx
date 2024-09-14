import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { clogoutInSuccess } from '../../redux/organization/companySlice';
import { toast } from 'react-toastify';
import axios from 'axios';


const AppliedVolenteers = () => {

    const dispatch = useDispatch();
    const currentCompany = useSelector((state)=>state.company.currentCompany);
    const mode = useSelector((state)=>state.theme.mode);
    const { eventId }  = useParams();
    const navigate = useNavigate();
    const [volenteers,setVolenteers] = useState([]);
    const [ev,setEv] = useState();

    useEffect(() => {
        axios.get(`/api/v1/company/getSingleEvent/${eventId}`)
        .then(function (response) {
            setVolenteers(response.data.data.AppliedVol);
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
    }, [])


    useEffect(() => {
        axios.get(`/api/v1/company/getSingleEvent/${eventId}`)
        .then(function (response) {
            setVolenteers(response.data.data.AppliedVol);
            setEv('');
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
    }, [ev])
    


    const handleReject = (rejectId) => {
        axios.put(`/api/v1/company/rejectVolenteer/${eventId}`,{
            rejectId
        })
        .then(function (response) {
            setEv(response.data.data);
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
    };

    return (
        <div className="min-h-[100vh] pt-[120px] pb-[40px] bg-gray-100 dark:bg-gray-900 px-3">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 text-center dark:text-white mb-8">
                    Volunteers Applied
                </h1>
                <div className="space-y-4">
                    {volenteers.map((volunteer, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                                    src={volunteer.profileImage}
                                    alt={volunteer.username}
                                />
                                <div>
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                        {volunteer.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        @{volunteer.username}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {volunteer.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleReject(volunteer._id)}
                                className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-700 dark:to-red-800 text-white font-medium py-1.5 px-4 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                            >
                                Reject
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppliedVolenteers;