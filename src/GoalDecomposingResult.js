import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoalDecomposeResult.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import LeftArrow from "./assets/LeftArrow.svg";

const GoalDecomposeResult = () => {
    const navigate = useNavigate();

    const goal = "تحسين الأداء المؤسسي";
    const timeFrame = "6 شهور";

    const milestones = [
        { month: "شهر 1", description: "البحث والتخطيط" },
        { month: "شهر 2-3", description: "مرحلة التطوير" },
        { month: "شهر 4", description: "اختبار وتعديلات" },
        { month: "شهر 5-6", description: "تنفيذ وتقييم" },
    ];

    return (
        <div className="GD-result-page">
            <div className="logo-container">
                <img className="Logo" alt="Logo" src={AWJLOGO} />
            </div>

            <img className="SmallSqrs1" alt="SmallSqrs1" src={SmallSqrs1} />
            <img className="SmallSqrs2" alt="SmallSqrs2" src={SmallSqrs2} />
            <h1>الخطة الإستراتيجية لتحقيق هدفك:</h1>

            <div className="goal-section">
                <h2>الهدف: <span className="highlighted-text">{goal}</span></h2>
                <h2>زمن تحقيق الهدف: <span className="highlighted-text">{timeFrame}</span></h2>
            </div>

            <div className="timeline-section">

                <div className="timeline-container">
                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <React.Fragment key={index}>
                                <div className="timeline-item">
                                    <div className="timeline-circle"></div>
                                    <p>{milestone.month}: {milestone.description}</p>
                                </div>
                                {index < milestones.length - 1 && <div className="timeline-line"></div>} {/* Add line unless it's the last milestone */}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <button className="back-btn" onClick={() => navigate("/dashboard")}>
                <img className="LeftArrow" alt="LeftArrow" src={LeftArrow} />
                <div className="text">لوحة القيادة</div>
            </button>
        </div>
    );
};

export default GoalDecomposeResult;
