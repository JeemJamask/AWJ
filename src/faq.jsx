import React, { useState } from "react";
import "./faq.css";
import BArrow from "./assets/BArrow.svg";

const FAQ = ({ faq }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">الأسئلة الشائعة</h2>
      <h3 className="faq-subh">لديك سؤال؟ نحن هنا للمساعدة!</h3>
      {faq.map((item, index) => (
        <div key={item.f_id} className="faq-item">
          <img className="BArrow" alt="BArrow" src={BArrow} />

          <div className="faq-question" onClick={() => toggleAnswer(index)}>
            {item.f_question}
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{item.f_answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
