import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./services.css";
import BlueBox from "./assets/BlueBox.svg";
import RedBlueBox from "./assets/RedBlueBox.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import { IoArrowBack } from 'react-icons/io5';

const Services = () => {
    const navigate = useNavigate();

    const handleService1Click = () => {
        navigate("/service-1");
    };

    const handleService2Click = () => {
        navigate("/service-2");
    };

    return (
        <div className="services-page">
            <IoArrowBack className="back-arrow-n" onClick={() => navigate('/')} />
            <div>
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>
            <div className="text-wrapper">مرحبـــًا بـــك!</div>
            <div className="text-wrapper-1">هل لديك شركة قائمة أم أنك رائد أعمال ترغب في بدء فكرة جديدة؟</div>

            <div>
                <img className="BlueBox" alt="blue box" src={BlueBox} />
            </div>
            <div>
                <img className="RedBlueBox" alt="red blue box" src={RedBlueBox} />
            </div>

            <div className="buttons-container">
                <button className="services-button" onClick={handleService1Click}>لدي شركة ناشئة قائمة</button>
                <button className="services-button" onClick={handleService2Click}>أرغب ببدء فكرة جديدة</button>
            </div>
        </div>
    );
};

export default Services;
