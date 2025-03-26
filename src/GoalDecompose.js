import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoalDecomposing.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import GD_LOGO from "./assets/GD_LOGO.svg";
import { db } from "./firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

const GoalDecompose = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    projName: "",
    projDescr: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < 2) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("لم يتم العثور على هوية المستخدم. الرجاء تسجيل الدخول مرة أخرى.");
        return;
      }

      const userDocRef = doc(db, "User", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        alert("تعذر العثور على بيانات المستخدم. الرجاء المحاولة لاحقاً.");
        return;
      }

      const userData = userDocSnap.data();
      const companyRef = userData.CompanyID;

      if (!companyRef) {
        alert("لم يتم ربط المستخدم بأي شركة. الرجاء التحقق من حسابك.");
        return;
      }

      // Generate next available Project ID like p001
      const projectSnapshot = await getDocs(collection(db, "Project"));
      const ids = projectSnapshot.docs.map((doc) => doc.id);

      const existingNumbers = ids
        .map((id) => {
          const match = id.match(/^p(\d{3})$/);
          return match ? parseInt(match[1]) : null;
        })
        .filter((n) => n !== null)
        .sort((a, b) => a - b);

      let nextNumber = 1;
      for (let i = 0; i < existingNumbers.length; i++) {
        if (existingNumbers[i] !== nextNumber) break;
        nextNumber++;
      }

      const nextProjectId = `p${String(nextNumber).padStart(3, "0")}`;

      // Save to Firestore in Project collection
      await setDoc(doc(db, "Project", nextProjectId), {
        ProjectName: formData.projName,
        ProjectDetails: formData.projDescr,
        CompanyID: companyRef,
      });

      navigate("/goal-decomposing-result");

    } catch (error) {
      console.error("خطأ أثناء حفظ بيانات المشروع:", error);
      alert("حدث خطأ أثناء حفظ بيانات المشروع. حاول مرة أخرى.");
    }
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
