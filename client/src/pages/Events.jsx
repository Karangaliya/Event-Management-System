import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Cards/Card'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutInSuccess } from '../redux/user/userSlice';

function Events() {

    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const mode = useSelector((state) => state.theme.mode);
    const [cards, setCards] = useState([])
    const [ccity, setCity] = useState("all")
    const navigate = useNavigate();
    const mainCities = {
        "India": "all",
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
    const handleChange = (e) => {
        setCity(e.target.value);
    }

    useEffect(() => {

        const fetchEvents = async () => {
            axios.get('https://event-management-system-backend-n47r.onrender.com/api/v1/users/getAllEvent')
                .then(function (response) {
                    setCards(response.data.data);
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
        };
        if (currentUser) {
            fetchEvents();
        } else {
            setTimeout(() => {
                mode != "dark" ?
                    toast.warn('Please Login First..!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                    :
                    toast.warn('Please Login First..!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    })
                navigate("/login")
            }, 1000);
        }
    }, [])

    useEffect(() => {

        const fetchEvents = async () => {
            if (ccity == "all") {
                setCity(null);
            }
            axios.get('https://event-management-system-backend-n47r.onrender.com/api/v1/users/getAllEvent', {
                params: {
                    city: ccity
                }
            }).then(function (response) {
                setCards(response.data.data);
            }).catch(function (error) {
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
                } else {
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

        if (currentUser) {
            fetchEvents();
        } else {
            setTimeout(() => {
                mode != "dark" ?
                    toast.warn('Please Login First..!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                    :
                    toast.warn('Please Login First..!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    })
                navigate("/login")
            }, 1000);
        }
    }, [ccity])


    const handleClickTranfer = (key) => {
            if (key) {
                navigate(`/fullEvent/${key}`)
            }
    }


    return (
        <div className='min-h-[100vh] pt-[120px] pb-[40px] flex flex-col gap-10'>
            <div className='w-[70%] max-[1100px]:w-[85%] p-[2px] rounded-lg mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                <div className='py-[10px] rounded-lg flex justify-center items-center gap-2 dark:bg-gray-800 px-[5px] bg-white border-2 border-transparent bg-clip-border '>
                    <label htmlFor="city" className="dark:text-white text-black text-sm ml-2">Choose City : </label>
                    <select name="city" value={ccity} onChange={handleChange} className='dark:bg-gray-900 dark:text-white bg-slate-400 text-black px-3 rounded-xl py-2'>
                        {Object.values(mainCities).map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='w-[70%] max-[1100px]:w-[85%] max-[1100px]:gap-3 mx-auto grid grid-cols-3 gap-5 max-[790px]:grid-cols-2 max-[500px]:grid-cols-1'>
                {cards.map((card, index) => (
                    <div onClick={() => handleClickTranfer(card._id)} className='cursor-pointer' key={index}>
                        <Card
                            image={card.image}
                            title={card.eventTitle}
                            description={card.discription}
                            date={card.timing}
                            city={card.city}
                            amount={card.moneyGivenToOne}
                            applyIn={true}
                            className="mx-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Events