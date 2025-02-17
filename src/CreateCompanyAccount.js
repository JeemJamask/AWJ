import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CA.css";
import BlueBox from "./assets/BlueBox.svg";
import RedBlueBox from "./assets/RedBlueBox.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";

const CreateCompanyAccount = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        companyDescription: "",
        companyActivity: "",
        employeeCount: "",
        termsAccepted: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = () => {
        if (!formData.termsAccepted) {
            alert("يجب الموافقة على الشروط والأحكام");
            return; // Prevent form submission if terms are not accepted
        }

        if (formData.companyName && formData.companyDescription && formData.companyActivity && formData.employeeCount) {
            // Ensure all required fields are filled
            navigate("/dashboard");
        } else {
            alert("يرجى ملء جميع الحقول المطلوبة");
        }
    };

    return (
        <div className="create-account-page">

            <div className="logo-container">
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>
            <div className="text-wrapper">إنشـاء حساب الشركة</div>
            <img className="BlueBox" alt="blue box" src={BlueBox} />
            <img className="RedBlueBox" alt="red blue box" src={RedBlueBox} />


            <form className="create-account-form">
                <div className="form-group">
                    <label>اسم الشركة<span className="required">*</span></label>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="اسم الشركة"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>وصف عن الشركة ( ماذا تقدم، ما هي أهداف الشركة )<span className="required">*</span></label>
                    <input
                        type="text"
                        name="companyDescription"
                        placeholder="وصف عن الشركة"
                        value={formData.companyDescription}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>نشاط الشركة الرئيسي<span className="required">*</span></label>
                    <input
                        type="text"
                        name="companyActivity"
                        placeholder="نشاط الشركة الرئيسي"
                        value={formData.companyActivity}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>أعداد الموظفين<span className="required">*</span></label>
                    <input
                        type="number"
                        name="employeeCount"
                        placeholder="أعداد الموظفين"
                        value={formData.employeeCount}
                        onChange={handleChange}
                    />
                </div>
            </form>

            <div className="terms2">
                <label>
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                    />
                    <span>أوافق على الشروط والأحكام<span className="required">*</span></span>
                </label>
            </div>

            <button type="button" className="submit-btn" onClick={handleSubmit}>
                التالي
            </button>

            <p className="login-link2">
                لديك حساب؟ <a href="/login">سجل دخولك</a>
            </p>
        </div>
    );
};

export default CreateCompanyAccount;
