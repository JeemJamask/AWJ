import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CA.css";
import BlueBox from "./assets/BlueBox.svg";
import RedBlueBox from "./assets/RedBlueBox.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";

const CreateAccountPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        companyRegistered: null,
        termsAccepted: false,
        securityKey: "",
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleCompanyRegistered = (status) => {
        setFormData({ ...formData, companyRegistered: status });
        if (status === true) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    };

    const handleSubmit = () => {
        if (formData.termsAccepted) {
            // Check for missing required fields
            if (
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.confirmEmail ||
                !formData.password ||
                !formData.confirmPassword ||
                !formData.phoneNumber ||
                formData.companyRegistered === null
            ) {
                alert("يرجى ملء جميع الحقول المطلوبة");
            } else {
                // Check if passwords match
                if (formData.password !== formData.confirmPassword) {
                    alert("كلمات السر غير متطابقة");
                } else if (formData.email !== formData.confirmEmail) {
                    alert("البريد الإلكتروني غير متطابق");
                } else {
                    if (formData.companyRegistered === true) {
                        navigate("/dashboard");
                    } else {
                        navigate("/create-company-account");
                    }
                }
            }
        } else {
            alert("يجب الموافقة على الشروط والأحكام");
        }
    };

    const handleSecurityKeySubmit = () => {
        if (formData.securityKey.length === 5) {
            setShowModal(false);
        } else {
            alert("يرجى إدخال مفتاح مكون من 5 أرقام");
        }
    };

    return (
        <div className="create-account-page">
            <div className="logo-container">
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>
            <div className="text-wrapper">إنشـاء حساب</div>
            <img className="BlueBox" alt="blue box" src={BlueBox} />
            <img className="RedBlueBox" alt="red blue box" src={RedBlueBox} />


            <form className="create-account-form">
                <div className="form-group">
                    <label>الاسم الأول<span className="required">*</span></label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="الاسم الأول"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>الاسم الأخير<span className="required">*</span></label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="الاسم الأخير"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>البريد الإلكتروني<span className="required">*</span></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>تأكيد البريد الإلكتروني<span className="required">*</span></label>
                    <input
                        type="email"
                        name="confirmEmail"
                        placeholder="تأكيد البريد الإلكتروني"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>الرقم السري<span className="required">*</span></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="الرقم السري"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>تأكيد الرقم السري<span className="required">*</span></label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="تأكيد الرقم السري"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>رقم الجوال<span className="required">*</span></label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="رقم الجوال"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="company-question">
                    <label>هل شركتك مسجلة فالمنصة؟<span className="required">*</span></label>
                    <div className="company-buttons">
                        <button
                            type="button"
                            className={formData.companyRegistered === true ? "selected" : ""}
                            onClick={() => handleCompanyRegistered(true)}
                        >
                            نعم
                        </button>
                        <button
                            type="button"
                            className={formData.companyRegistered === false ? "selected" : ""}
                            onClick={() => handleCompanyRegistered(false)}
                        >
                            لا
                        </button>
                    </div>
                </div>
            </form>

            <div className="terms">
                <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                />
                <label>أوافق على الشروط والأحكام<span className="required">*</span></label>
            </div>

            <button type="button" className="submit-btn" onClick={handleSubmit}>
                التالي
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>الانضمام لحساب الشركة</h3>
                        <input
                            type="text"
                            name="securityKey"
                            maxLength="5"
                            placeholder="أدخل رمز الأمان المقدم من مدير الحساب"
                            value={formData.securityKey}
                            onChange={handleChange}
                        />
                        <button onClick={handleSecurityKeySubmit}>تأكيد</button>
                    </div>
                </div>
            )}

            <div className="login-link">
                لديك حساب؟ <a href="/signin">سجل دخولك</a>
            </div>
        </div>
    );
};

export default CreateAccountPage;
