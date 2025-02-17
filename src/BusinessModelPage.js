import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessModelPage.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import BMLOGO from "./assets/BMLOGO.svg";

const BusinessModelPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyField: "",
    employeeCount: "",
    revenueSources: "",
  });

  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle question navigation
  const handleNext = () => {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    navigate("/business-model-result"); // Ensure the correct route
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
            <label>
              اسم الشركة: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {currentQuestion === 2 && (
          <div className="question-box">
            <label>
              مجال الشركة: <span className="required">*</span>
            </label>
            <select
              name="companyField"
              value={formData.companyField}
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
            <label>
              أعداد موظفين الشركة: <span className="required">*</span>
            </label>
            <select
              name="employeeCount"
              value={formData.employeeCount}
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
            <label>
              مصادر الإيرادات: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="revenueSources"
              value={formData.revenueSources}
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
