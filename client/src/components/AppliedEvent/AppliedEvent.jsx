import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { logoutInSuccess } from '../../redux/user/userSlice';
import { toast } from 'react-toastify';
import Card from '../Cards/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AppliedEvent() {

    const mode = useSelector((state)=>state.theme.mode);
    const currentUser = useSelector((state)=>state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cards,setCards] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            axios.get(`/api/v1/users/AppliedAllEvent/${currentUser._id}`)
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

    const handleClickTranfer = (key) => {
            if (key) {
                navigate(`/fullEvent/${key}`)
            }
    }


  return (
    <div className='min-h-[100vh] space-y-5'>
        <div className='text-2xl font-semibold w-full text-center'>Applied Events</div>
        <div className='w-[95%] grid grid-cols-3 mx-auto gap-5 max-[780px]:grid-cols-2 max-[500px]:grid-cols-1'>
                {cards.map((card, index) => (
                    <div onClick={() => handleClickTranfer(card._id)} className='cursor-pointer' key={index}>
                        <Card
                            image={card.image}
                            title={card.eventTitle}
                            description={card.discription}
                            date={card.timing}
                            city={card.city}
                            amount={card.moneyGivenToOne}
                            applyIn={false}
                            className="mx-auto"
                        />
                    </div>
                ))}
            </div>
    </div>
  )
}

export default AppliedEvent