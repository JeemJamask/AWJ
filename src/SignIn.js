import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';
import AWJLOGO from "./assets/AWJLOGO.svg";
import SideSqrs from "./assets/SideSqrs.svg";

const SignIn = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = (e) => {
        e.preventDefault();
        // Simulate sending OTP
        alert(`OTP sent to ${phoneNumber}`);
        setIsOtpSent(true);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // Simulate OTP verification
        alert(`OTP ${otp} verified!`);
        navigate('/dashboard');
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
