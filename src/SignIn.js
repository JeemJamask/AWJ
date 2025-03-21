import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css';
import AWJLOGO from "./assets/AWJLOGO.svg";
import SideSqrs from "./assets/SideSqrs.svg";

const SignIn = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // Send OTP function
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                "https://api.authentica.sa/api/v1/send-otp",
                {
                    phone: phoneNumber,
                    method: "whatsapp"
                },
                {
                    headers: {
                        "X-Authorization": "$2y$10$fsNNFy7nluAD0ODvdp2t/u91Z6kypZ8PT6mKQO3Pi5/Dl/W9Ek/Me", // Replace with your actual API Key
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("API Response:", response.data);

            if (response.data.success) {
                alert(`OTP sent to ${phoneNumber}`);
                setIsOtpSent(true);
            } else {
                setError(response.data.message || "Failed to send OTP. Please try again.");
            }
        } catch (err) {
            console.error("OTP Send Error:", err.response?.data || err.message);
            setError(`Error: ${err.response?.data?.message || "Check API Key & Phone Format"}`);
        }
    };

    const handleVerifyOtp = async (phoneNumber, otp) => {
        try {
            const response = await axios.post(
                'https://api.authentica.sa/api/v1/verify-otp',
                {
                    phone: phoneNumber,
                    otp: otp,
                },
                {
                    headers: {
                        'X-Authorization': '$2y$10$fsNNFy7nluAD0ODvdp2t/u91Z6kypZ8PT6mKQO3Pi5/Dl/W9Ek/Me',  // Replace with your actual API key
                    },
                }
            );

            if (response.data.success) {
                console.log('OTP verified successfully');
            } else {
                console.error('OTP verification failed: ', response.data.message);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };


    return (
        <div className="sign-in-page">
            <div>
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>
            <div>
                <img className="SideSqrs" alt="Side Squares" src={SideSqrs} />
            </div>
            <div className="sign-in-box">
                <h1>تسجيل الدخول</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form>
                    {!isOtpSent ? (
                        <>
                            <label>
                                رقم الجوال:
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+966 5XXXXXXXX"
                                />
                            </label>
                            <br />
                            <div className='label2'>
                                <button onClick={handleSendOtp}>إرسال رمز التحقق</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <label>
                                رمز التحقق:
                                <input
                                    type="text"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="أدخل رمز التحقق"
                                />
                            </label>
                            <br />
                            <button onClick={handleVerifyOtp}>تأكيد الدخول</button>
                        </>
                    )}
                </form>
            </div>
            <p className="login-link3">
                ليس لديك حساب؟ <a href="/create-account">سجل الآن</a>
            </p>
        </div>
    );
};

export default SignIn;
