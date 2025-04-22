import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../../../services/authService';
import { toast } from 'react-toastify';

const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const state = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) return prevTimer - 1;
          setIsResendDisabled(false);
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isResendDisabled]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    // Focus on the next box
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async () => {

    if (otp.join('').length === 6) {

      const result = await verifyOtp({ otp: otp.join(''), email: state.state })
      console.log(result.data,'---------');
      if (result.data.success) {
        
        toast.success(result.data.message)
        navigate('/login')
      }
    }
  };

  const handleResendOtp = () => {
    setTimer(60); // Reset the timer to 60 seconds
    setIsResendDisabled(true);
    // Trigger OTP resend logic here
    console.log('Resending OTP...');
    setIsTimerActive(true);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>
        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <div className="text-center mb-4">
          <p className={`text-sm ${timer > 0 ? 'text-red-500' : 'text-gray-500'}`}>
            {timer > 0 ? `Resend OTP in ${timer}s` : 'OTP expired'}
          </p>
          <button
            className={`mt-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-yellow-500 text-white'
              }`}
            onClick={handleResendOtp}
            disabled={isResendDisabled}
          >
            Resend OTP
          </button>
        </div>
        <div className="text-center">
          <button
            className={`w-full px-4 py-2 text-lg font-semibold text-white rounded-lg ${otp.join('').length < 6 || timer === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            onClick={handleSubmit}
            disabled={otp.join('').length < 6 || timer === 0}
          >
            Submit OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
