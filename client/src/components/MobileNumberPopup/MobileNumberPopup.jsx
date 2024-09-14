import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const MobileNumberPopup = ({ saveNumber }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = () => {
    saveNumber(mobileNumber);
  };

  return (

  );
};

export default MobileNumberPopup;
