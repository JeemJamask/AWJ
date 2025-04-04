import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css';
import AWJLOGO from "./assets/AWJLOGO.svg";
import SideSqrs from "./assets/SideSqrs.svg";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import firebase from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { IoArrowBack } from 'react-icons/io5';



const SignIn = () => {
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    // Send OTP function
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        // Only accept +966 format
        if (!/^\+9665\d{8}$/.test(PhoneNumber)) {
            setError("+يرجى إدخال الرقم بصيغة 9665");
            return;
        }

        try {
            const localPhone = "0" + PhoneNumber.slice(4);

            const q = query(
                collection(db, "User"),
                where("PhoneNumber", "==", localPhone)
            );

            const querySnapshot = await getDocs(q);

            // Save UserID locally
            const userDoc = querySnapshot.docs[0];
            localStorage.setItem("userId", userDoc.id);


            if (querySnapshot.empty) {
                setError("لم يتم العثور على المستخدم. يُرجى التحقق من رقم هاتفك أو إنشاء حساب.");
                return;
            }

            const response = await axios.post(
                "https://api.authentica.sa/api/v1/send-otp",
                {
                    phone: PhoneNumber,
                    method: "whatsapp"
                },
                {
                    headers: {
                        "X-Authorization": "$2y$10$fsNNFy7nluAD0ODvdp2t/u91Z6kypZ8PT6mKQO3Pi5/Dl/W9Ek/Me",
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("API Response:", response.data);

            if (response.data.success) {
                alert(`OTP sent to ${PhoneNumber}`);
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
        // the following code is just for development mode, it bypasses the otp veriication
        console.log("Dev Mode: Skipping real OTP check");
        alert("تم التحقق من الرمز بنجاح. سيتم تحويلك للوحة التحكم.");
        navigate("/dashboard");
        /*  try {
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
                  navigate("/dashboard")
              } else {
                  console.error('OTP verification failed: ', response.data.message);
              }
          } catch (error) {
              console.error('Error verifying OTP:', error);
          } */
    };


    return (

        <div className="sign-in-page">
        <IoArrowBack className="back-arrow-n" onClick={() => navigate('/')} />

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
                                    value={PhoneNumber}
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
                            <button onClick={() => handleVerifyOtp(PhoneNumber, otp)}>تأكيد الدخول</button>

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
