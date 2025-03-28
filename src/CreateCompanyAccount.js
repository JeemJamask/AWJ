import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CA.css";
import BlueBox from "./assets/BlueBox.svg";
import RedBlueBox from "./assets/RedBlueBox.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import {collection, getDocs, doc, setDoc, query, where, updateDoc, getDoc,} from "firebase/firestore";
import { db } from "./firebase";
import { IoArrowBack } from 'react-icons/io5';

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

    const generateUniqueSecurityKey = async () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        while (true) {
            let key = "";
            for (let i = 0; i < 5; i++) {
                key += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            // Check Firestore to ensure key is unique
            const q = query(collection(db, "Company"), where("SecurityKey", "==", key));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return key; // ✅ Unique key found
            }
            // If not unique, generate a new one
        }
    };


    const handleSubmit = async () => {
        if (!formData.termsAccepted) {
            alert("يجب الموافقة على الشروط والأحكام");
            return; // Prevent form submission if terms are not accepted
        }

        if (formData.companyName && formData.companyDescription && formData.companyActivity && formData.employeeCount) {
            try {
                const securityKey = await generateUniqueSecurityKey();

                const companiesSnapshot = await getDocs(collection(db, "Company"));
                const ids = companiesSnapshot.docs.map(doc => doc.id);

                const existingNumbers = ids
                    .map(id => {
                        const match = id.match(/^c(\d{3})$/);
                        return match ? parseInt(match[1]) : null;
                    })
                    .filter(n => n !== null)
                    .sort((a, b) => a - b);

                let nextNumber = 1;
                for (let i = 0; i < existingNumbers.length; i++) {
                    if (existingNumbers[i] !== nextNumber) break;
                    nextNumber++;
                }

                const nextCompanyId = `c${String(nextNumber).padStart(3, "0")}`;

                await setDoc(doc(db, "Company", nextCompanyId), {

                    CompDescription: formData.companyDescription,
                    CompanyName: formData.companyName,
                    CompanySize: Number(formData.employeeCount),
                    Industry: formData.companyActivity,
                    SecurityKey: securityKey,
                    SecurityKeyCreatedAt: new Date(),
                });

                // Link the company to the user who was just created
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const userRef = doc(db, "User", userId);
                    await updateDoc(userRef, {
                        CompanyID: doc(db, "Company", nextCompanyId), // Store as Reference
                    });
                }

                navigate("/dashboard");
            } catch (error) {
                console.error("Error adding company:", error);
                alert("حدث خطأ أثناء حفظ بيانات الشركة.");
            }

        } else {
            alert("يرجى ملء جميع الحقول المطلوبة");
        }
    };

    return (
        <div className="create-account-page">
        <IoArrowBack className="back-arrow-n" onClick={() => navigate(-1)} />
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
