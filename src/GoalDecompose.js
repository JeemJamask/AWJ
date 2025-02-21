import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoalDecomposing.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import GD_LOGO from "./assets/GD_LOGO.svg";

const GoalDecompose = () => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [formData, setFormData] = useState({
        projName: "",
        projDescr: "",
        projBudget: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle question navigation
    const handleNext = () => {
        if (currentQuestion < 3) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = () => {
        console.log(formData);
        navigate("/goal-decomposing-result");  
    };

    return (
        <div className="goal-decomposing-page">
            <div className="logo-container">
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>
            <div className="text-wrapper">تقسيم الأهداف</div>
            <div className="text-wrapper1">ساعدنا بمعرفة تفاصيل أكثر، بتعبئة التالي:</div>
            <img src={GD_LOGO} alt="GD LOGO" className="GD-icon" />
            <img className="SmallSqrs1" alt="SmallSqrs1" src={SmallSqrs1} />
            <img className="SmallSqrs2" alt="SmallSqrs2" src={SmallSqrs2} />

        
            <div className="questions-container">
         
                <div className="timeline">
                    <div className={`circle ${currentQuestion >= 1 ? "active" : ""}`} />
                    <div className={`line ${currentQuestion >= 2 ? "active" : ""}`} />
                    <div className={`circle ${currentQuestion >= 2 ? "active" : ""}`} />

                </div>

                {currentQuestion === 1 && (
                    <div className="question-box">
                        <label>اسم المشروع: <span className="required">*</span></label>
                        <input
                            type="text"
                            name="projName"
                            value={formData.projName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                {currentQuestion === 2 && (
                    <div className="question-box">
                        <label>وصف المشروع: <span className="required">*</span></label>
                        <input
                            type="text"
                            name="projDescr"
                            value={formData.projDescr}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
             

            
                <div className="navigation-buttons">
                    {currentQuestion < 2 ? (
                        <button type="button" className="next-btn" onClick={handleNext}>
                            التالي
                        </button>
                    ) : (
                        <button type="button" className="submit-btn" onClick={handleSubmit}>
                            إرسال
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalDecompose;