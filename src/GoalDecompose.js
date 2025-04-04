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

  // Update state when inputs change.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < 2) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the user ID from localStorage.
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("لم يتم العثور على هوية المستخدم. الرجاء تسجيل الدخول مرة أخرى.");
        return;
      }
  
      // Retrieve the user document from Firestore using the userId.
      const userDocRef = doc(db, "User", userId);
      const userDocSnap = await getDoc(userDocRef);
  
      // Check if the document exists.
      if (!userDocSnap.exists()) {
        alert("لم يتم العثور على هوية المستخدم. الرجاء تسجيل الدخول مرة أخرى.");
        return;
      }
  
      // Retrieve the user data.
      const userData = userDocSnap.data();
  
      // Check if the user is linked to a company.
      const companyRef = userData.CompanyID;
      if (!companyRef) {
        alert("لم يتم ربط المستخدم بأي شركة. الرجاء التحقق من حسابك.");
        return;
      }
  
      // Generate next available Project ID like p001.
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
  
      // Save the project to Firestore.
      await setDoc(doc(db, "Project", nextProjectId), {
        ProjectID: nextProjectId,
        ProjectName: formData.projName,
        ProjectDetails: formData.projDescr,
        CompanyID: companyRef,
      });
  
      // Prepare form data to send to your Flask server.
      const formDataToSend = new URLSearchParams();
      formDataToSend.append("project_name", formData.projName);
      formDataToSend.append("project_description", formData.projDescr);
      formDataToSend.append("user_id", userId);
      // If companyRef is a DocumentReference, extract its ID; otherwise, use it directly.
      formDataToSend.append("company_id", typeof companyRef === "string" ? companyRef : companyRef.id);
      formDataToSend.append("project_id", nextProjectId);
  
      // Log the form data for debugging.
      console.log("Sending form data:", formDataToSend.toString());
  
      // Change the URL to your Flask server endpoint.
      const response = await fetch("http://127.0.0.1:5000/generate-milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataToSend.toString(),
      });
  
      // Check the response status.
      if (!response.ok) {
        console.error("Server response status:", response.status);
        throw new Error("Server error");
      }
  
      const result = await response.json();
      console.log("Server result:", result);
  
      // Navigate to the output page and pass the result via state.
      navigate("/goal-decomposing-result", { state: result });
    } catch (error) {
      console.error("خطأ أثناء حفظ بيانات المشروع:", error);
      alert("حدث خطأ أثناء حفظ بيانات المشروع. حاول مرة أخرى.");
    }
  };

  return (
    <form className="goal-decomposing-page" onSubmit={handleSubmit}>
      <div className="logo-container">
        <img className="Logo" alt="Logo" src={AWJLOGO} />
      </div>
      <div className="text-wrapper">تقسيم الأهداف</div>
      <div className="text-wrapper1">
        ساعدنا بمعرفة تفاصيل أكثر، بتعبئة التالي:
      </div>
      <img src={GD_LOGO} alt="GD LOGO" className="GD-icon" />
      <img className="SmallSqrs1" alt="SmallSqrs1" src={SmallSqrs1} />
      <img className="SmallSqrs2" alt="SmallSqrs2" src={SmallSqrs2} />

      {/* Hidden inputs for user_id and project_id */}
      <input type="hidden" name="user_id" value={localStorage.getItem("userId") || ""} />
      <input type="hidden" name="project_id" value={"" /* project_id not yet computed on client */} />

      <div className="questions-container">
        <div className="timeline">
          <div className={`circle ${currentQuestion >= 1 ? "active" : ""}`} />
          <div className={`line ${currentQuestion >= 2 ? "active" : ""}`} />
          <div className={`circle ${currentQuestion >= 2 ? "active" : ""}`} />
        </div>

        {currentQuestion === 1 && (
          <div className="question-box">
            <label>
              اسم المشروع: <span className="required">*</span>
            </label>
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
            <label>
              وصف المشروع: <span className="required">*</span>
            </label>
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
            <button type="submit" className="submit-btn">
              إرسال
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default GoalDecompose;