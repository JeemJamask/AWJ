import React from "react";
import { useNavigate } from "react-router-dom";
import "./service1.css";
import BlueBox from "./assets/BlueBox.svg";
import RedBlueBox from "./assets/RedBlueBox.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import BMICON from "./assets/BMICON.svg";
import { IoArrowBack } from 'react-icons/io5';

const Service1Page = () => {
    const navigate = useNavigate();

    return (
        <div className="service1-page">
            <div className="logo-container">
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>

            <img className="BlueBox" alt="blue box" src={BlueBox} />
            <img className="RedBlueBox" alt="red blue box" src={RedBlueBox} />

            <div className="text-wrapper">مرحبـــًا بـــك!</div>
            <div className="text-wrapper-1">أفضل خدمة تقدمها لك أوج هي</div>
            <div className="service1-rectangle">
                <img src={BMICON} alt="Icon" className="service2-icon" />
                <h1 className="service1-heading">بنــاء نــموذج عمــل</h1>
                <p className="service1-description">
                    أفضل خدمة تقدمها لك أوج هي بناء نموذج عمل مخصص يتناسب مع شركتك وميزانيتك، مما يسهم في تأسيس بنية أعمال متكاملة وقابلة للتنفيذ. أيضًا التعاون مع أعضاء فريقك، وعرض تقدمك على لوحة تحكم مخصصة لمتابعة الأداء.
                </p>
                <button
                    className="create-account-button1"
                    onClick={() => navigate("/create-account")}
                >
                    انشاء حساب
                </button>
            </div>

          
            <button
                className="back-button"
                onClick={() => navigate(-1)} // Navigate to the previous page
            >
                رجوع
            </button>
        </div>
    );
};

export default Service1Page;
