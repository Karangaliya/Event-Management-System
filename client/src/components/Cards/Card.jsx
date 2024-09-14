import React from 'react';
import { useSelector } from 'react-redux';

const Card = ({ title, image, description, city, amount, date, applyIn}) => {

  const currentUser = useSelector((state)=>state.user.currentUser);
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString();
  const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  


  return (
    <div
      className={`max-w-md rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 p-4 duration-300 dark:bg-gray-800 dark:text-white bg-white text-gray-800"
      `}
    >
      <div className="relative">
        <img
          className="w-full h-56 object-cover rounded-t-xl"
          src={image}
          alt={title}
        />
        <div className=" dark:text-white text-black p-4 w-full rounded-t-xl">
          <div className="font-bold text-xl">{title}</div>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-sm mb-2 text-gray-400">
          {city} | {formattedDate} {formattedTime}
        </p>
        <p className="text-sm mb-4 line-clamp-2 h-[45px]">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">₹{amount}</p>
          {!applyIn ? "" : <button
            className={`px-4 py-2 rounded-lg font-semibold shadow-md dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white bg-blue-500 hover:bg-blue-400 text-white transition-colors duration-300`}
          >
            Apply In It
          </button> 
          }
          
        </div>
      </div>
    </div>
  );
};

export default Card;