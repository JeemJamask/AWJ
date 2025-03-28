import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./DashboardPage.css";
import DashBIcon from "./assets/DashBIcon.svg";
import ProjIcon from "./assets/ProjIcon.svg";
import CompanyFileIcon from "./assets/CompanyFileIcon.svg";
import BMIconD from "./assets/BMIconD.svg";
import GDIcon from "./assets/GDIcon.svg";
import AWJwithName from "./assets/AWJwithName.svg";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import firebase from "./firebase";
import { IoArrowBack } from 'react-icons/io5';



const refreshSecurityKeyIfExpired = async (companyId) => {
    const companyRef = doc(db, "Company", companyId);
    const companySnap = await getDoc(companyRef);

    if (companySnap.exists()) {
        const data = companySnap.data();
        const createdAt = data.SecurityKeyCreatedAt?.toDate?.();

        if (createdAt) {
            const now = new Date();
            const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

            if (diffInDays >= 14) {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let newKey = "";
                for (let i = 0; i < 5; i++) {
                    newKey += chars.charAt(Math.floor(Math.random() * chars.length));
                }

                await updateDoc(companyRef, {
                    SecurityKey: newKey,
                    SecurityKeyCreatedAt: now,
                });

                console.log("Security key refreshed.");
            }
        }
    }
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState("dashboard");
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            getDoc(doc(db, "User", userId)).then(async (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(userData.FirstName);

                    const companyRef = userData.CompanyID;
                    if (companyRef?.id) {
                        await refreshSecurityKeyIfExpired(companyRef.id);
                    }
                }
            });
        }
    }, []);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;
    
            const userRef = doc(db, "User", userId);
            const userSnap = await getDoc(userRef);
    
            if (userSnap.exists()) {
                const userData = userSnap.data();
                const companyRef = userData.CompanyID;
    
                if (companyRef?.id) {
                    const companySnap = await getDoc(doc(db, "Company", companyRef.id));
                    if (companySnap.exists()) {
                        const data = companySnap.data();
                        setCompanyInfo({
                            members: data.CompanySize || "",
                            securityCode: data.SecurityKey || "",
                            description: data.CompDescription || "",
                            field: data.Industry || ""
                        });
                    }
                }
            }
        };
    
        fetchCompanyInfo();
    }, []);
    

    const projects = [
        { id: 1, name: "نظام إدارة المشاريع", duration: "6 أشهر", status: "قيد التنفيذ", goals: 5 },
        { id: 2, name: "تطبيق الصحة الذكية", duration: "4 أشهر", status: "مكتمل", goals: 8 },
        { id: 3, name: "تحليل البيانات المالية", duration: "3 أشهر", status: "متأخر", goals: 3 },
        { id: 4, name: "بناء نظام عمل مستشفى", duration: " 8 أشهر", status: "اختبار التشغيل", goals: 6 },
        { id: 5, name: "تطبيق لحجر الرحلات السياحية", duration: "5 أشهر", status: "مكتمل", goals: 4 },
        { id: 6, name: "بيع ٢٠٠ جهاز لوحي الكتروني", duration: "2 أشهر", status: "قيد التنفيذ", goals: 3 },
    ];

    const statusColors = {
        "قيد التنفيذ": "#FF9249",
        "متأخر": "#E63A46",
        "اختبار التشغيل": "#0F9DDB",
        "مكتمل": "#10C154"
    };

    const [companyInfo, setCompanyInfo] = useState({
        members: "10",
        securityCode: "ABC123",
        description: "شركة متخصصة في تطوير البرمجيات.",
        field: "تكنولوجيا المعلومات"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleEditClick = async () => {
        if (isEditing) {
            try {
                const userId = localStorage.getItem("userId");
                const userRef = doc(db, "User", userId);
                const userSnap = await getDoc(userRef);
    
                if (userSnap.exists()) {
                    const companyRef = userSnap.data().CompanyID;
                    if (companyRef?.id) {
                        await updateDoc(doc(db, "Company", companyRef.id), {
                            CompanySize: Number(companyInfo.members), 
                            SecurityKey: companyInfo.securityCode,
                            CompDescription: companyInfo.description,
                            Industry: companyInfo.field
                        });
                        alert("تم حفظ البيانات بنجاح!");
                    }
                }
            } catch (error) {
                console.error("خطأ أثناء تحديث معلومات الشركة:", error);
                alert("حدث خطأ أثناء حفظ البيانات.");
            }
        }
        setIsEditing(!isEditing);
    };
    
    

    const handleViewDetails = () => {
        navigate("/goal-decomposing-result");
    };

    return (
        <div className="dashboard-container">
            <IoArrowBack className="back-arrow-n-d" onClick={() => navigate('/')} />
            <div className="top-nav">
                <img className="AWJwithName" alt="AWJ" src={AWJwithName} />
                <div className="profile-section">
                    <FaUserCircle size={60} className="icon" />
                    <p className="greeting-message">أهلًا، {userName}</p>
                </div>
            </div>

            <div className="content-wrapper">
                <div className="sidebar">
                    <ul>
                        <li className="sidebar-item" onClick={() => setSelectedSection("dashboard")}>لوحة التحكم <img className="DashBIcon" alt="Dashboard Icon" src={DashBIcon} /></li>
                        <li className="sidebar-item" onClick={() => setSelectedSection("projects")}>المشاريع القائمة <img className="ProjIcon" alt="Project Icon" src={ProjIcon} /></li>
                        <li className="sidebar-item" onClick={() => navigate("/goal-decomposing")}>هدف جديد <img className="GDIcon" alt="GD Icon" src={GDIcon} /></li>
                        <li className="sidebar-item" onClick={() => navigate("/business-model")}>نموذج العمل <img className="BMIconD" alt="BM Icon" src={BMIconD} /></li>
                        <li className="sidebar-item" onClick={() => setSelectedSection("company-profile")}>ملف الشركة <img className="CompanyFileIcon" alt="File Icon" src={CompanyFileIcon} /></li>
                    </ul>
                </div>

                <div className="main-content">
                    {selectedSection === "dashboard" && <h1>لوحة التحكم</h1>}

                    {selectedSection === "projects" && (
                        <div className="projects-container">
                            <div className="projects-list">
                                {projects.map((project) => (
                                    <div className="project-card" key={project.id}>
                                        <h3>{project.name}</h3>
                                        <div className="project-card1">
                                            <p><strong>المدة: </strong> {project.duration}</p>
                                            <p><strong>الحالة: </strong><span style={{ color: statusColors[project.status] }}>{project.status}</span></p>
                                            <p><strong>عدد الأهداف: </strong> {project.goals}</p>
                                            <button className="details-button" onClick={handleViewDetails}>مشاهدة التفاصيل</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedSection === "company-profile" && (
                        <div className="company-profile">
                            <h2>ملف الشركة</h2>

                            <div className="profile-box">
                                <label><strong>عدد أعضاء الشركة:</strong></label>
                                {isEditing ? (
                                    <input type="text" name="members" value={companyInfo.members} onChange={handleInputChange} className="input-field" />
                                ) : (
                                    <p>{companyInfo.members}</p>
                                )}
                            </div>

                            <div className="profile-box">
                                <label><strong>رمز الأمان:</strong></label>
                                {isEditing ? (
                                    <input type="text" name="securityCode" value={companyInfo.securityCode} onChange={handleInputChange} className="input-field" />
                                ) : (
                                    <p>{companyInfo.securityCode}</p>
                                )}
                            </div>

                            <div className="profile-box">
                                <label><strong>وصف الشركة:</strong></label>
                                {isEditing ? (
                                    <textarea name="description" value={companyInfo.description} onChange={handleInputChange} className="input-field"></textarea>
                                ) : (
                                    <p>{companyInfo.description}</p>
                                )}
                            </div>

                            <div className="profile-box">
                                <label><strong>مجال الشركة:</strong></label>
                                {isEditing ? (
                                    <input type="text" name="field" value={companyInfo.field} onChange={handleInputChange} className="input-field" />
                                ) : (
                                    <p>{companyInfo.field}</p>
                                )}
                            </div>

                            <button className="update-button" onClick={handleEditClick}>{isEditing ? "حفظ" : "تحديث البيانات"}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
