import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessModelPage.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import BMLOGO from "./assets/BMLOGO.svg";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";


const BusinessModelPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    CompanyName: "",
    Industry: "",
    CompanySize: "",
    RevenueSources: "",
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
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("لم يتم العثور على بيانات المستخدم.");
        return;
      }
  
      const userDocRef = doc(db, "User", userId);
      const userSnapshot = await getDoc(userDocRef);
  
      if (!userSnapshot.exists()) {
        alert("لم يتم العثور على المستخدم.");
        return;
      }
  
      const userData = userSnapshot.data();
      const companyRef = userData.CompanyID;
  
      if (!companyRef) {
        alert("لم يتم ربط المستخدم بأي شركة.");
        return;
      }
  
      // Generate next BusinessModel ID
      const bmSnapshot = await getDocs(collection(db, "BusinessModel"));
      const bmIds = bmSnapshot.docs.map((doc) => doc.id);
  
      const existingBmNumbers = bmIds
        .map((id) => {
          const match = id.match(/^bm(\d{3})$/);
          return match ? parseInt(match[1]) : null;
        })
        .filter((n) => n !== null)
        .sort((a, b) => a - b);
  
      let nextBmNumber = 1;
      for (let i = 0; i < existingBmNumbers.length; i++) {
        if (existingBmNumbers[i] !== nextBmNumber) break;
        nextBmNumber++;
      }
  
      const nextBmId = `bm${String(nextBmNumber).padStart(3, "0")}`;
  
      // Create new BusinessModel document
      const modelRef = doc(db, "BusinessModel", nextBmId);
      await setDoc(modelRef, {
        CompanyID: companyRef,
      });
  
      // Generate next BusinessModel_UserInput ID
      const inputSnapshot = await getDocs(collection(db, "BusinessModel_UserInput"));
      const ids = inputSnapshot.docs.map((doc) => doc.id);
  
      const existingInputNumbers = ids
        .map((id) => {
          const match = id.match(/^Input(\d{3})$/);
          return match ? parseInt(match[1]) : null;
        })
        .filter((n) => n !== null)
        .sort((a, b) => a - b);
  
      let nextInputNumber = 1;
      for (let i = 0; i < existingInputNumbers.length; i++) {
        if (existingInputNumbers[i] !== nextInputNumber) break;
        nextInputNumber++;
      }
  
      const nextInputId = `Input${String(nextInputNumber).padStart(3, "0")}`;
  
      // Create BusinessModel_UserInput and link to BusinessModel
      await setDoc(doc(db, "BusinessModel_UserInput", nextInputId), {
        Industry: formData.Industry,
        CompanySize: formData.CompanySize,
        RevenueSources: formData.RevenueSources,
        CompanyID: companyRef,
        ModelID: modelRef,
        createdAt: new Date(),
      });
  
      navigate("/business-model-result");
  
    } catch (error) {
      console.error("Error saving business model input:", error);
      alert("حدث خطأ أثناء الحفظ. حاول مرة أخرى.");
    }
  };  
  

  return (
    <div className="business-model-page">
      <div className="logo-container">
        <img className="Logo" alt="Logo" src={AWJLOGO} />
      </div>
      <div className="text-wrapper">بنــاء نــموذج عمــل</div>
      <div className="text-wrapper1">
        ساعدنا لمعرفة تفاصيل أكثر، بتعبئة التالي:
      </div>
      <img src={BMLOGO} alt="BM LOGO" className="BM-icon" />
      <img className="SmallSqrs1" alt="SmallSqrs1" src={SmallSqrs1} />
      <img className="SmallSqrs2" alt="SmallSqrs2" src={SmallSqrs2} />

      <div className="questions-container">
        <div className="timeline">
          <div className={`circle ${currentQuestion >= 1 ? "active" : ""}`} />
          <div className={`line ${currentQuestion >= 2 ? "active" : ""}`} />
          <div className={`circle ${currentQuestion >= 2 ? "active" : ""}`} />
          <div className={`line ${currentQuestion >= 3 ? "active" : ""}`} />
          <div className={`circle ${currentQuestion >= 3 ? "active" : ""}`} />
          <div className={`line ${currentQuestion >= 4 ? "active" : ""}`} />
          <div className={`circle ${currentQuestion === 4 ? "active" : ""}`} />
        </div>

        {currentQuestion === 1 && (
          <div className="question-box">
            <label>اسم الشركة: <span className="required">*</span></label>
            <input
              type="text"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {currentQuestion === 2 && (
          <div className="question-box">
            <label>مجال الشركة: <span className="required">*</span></label>
            <select
              name="Industry"
              value={formData.Industry}
              onChange={handleChange}
              required
            >
              <option value="">اختار مجال الشركة</option>
              <option value="Technology">تقنية</option>
              <option value="CyberSecurity">أمن سبراني</option>
              <option value="Fintech">فنتك</option>
              <option value="games">الألعاب</option>
              <option value="Other">آخر</option>
            </select>
          </div>
        )}

        {currentQuestion === 3 && (
          <div className="question-box">
            <label>أعداد موظفين الشركة: <span className="required">*</span></label>
            <select
              name="CompanySize"
              value={formData.CompanySize}
              onChange={handleChange}
              required
            >
              <option value="">اختار عدد الموظفين</option>
              <option value="1-10">1-10</option>
              <option value="11-20">11-20</option>
              <option value="21-30">21-30</option>
              <option value="30+">30+</option>
            </select>
          </div>
        )}

        {currentQuestion === 4 && (
          <div className="question-box">
            <label>مصادر الإيرادات: <span className="required">*</span></label>
            <input
              type="text"
              name="RevenueSources"
              value={formData.RevenueSources}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="navigation-buttons">
          {currentQuestion < 4 ? (
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

export default BusinessModelPage;
