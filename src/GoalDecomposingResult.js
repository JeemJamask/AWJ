import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GoalDecomposeResult.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import LeftArrow from "./assets/LeftArrow.svg";

const GoalDecomposeResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve the data passed via router state
  const { project_name, project_id, milestones } = location.state || {
    project_name: "Unknown Project",
    project_id: "",
    milestones: [],
  };

  return (
    <div className="GD-result-page">
      <div className="logo-container">
        <img className="Logo" alt="Logo" src={AWJLOGO} />
      </div>
      <img className="SmallSqrs1" alt="SmallSqrs1" src={SmallSqrs1} />
      <img className="SmallSqrs2" alt="SmallSqrs2" src={SmallSqrs2} />
      <h1>Project Data for "{project_name}"</h1>
      {milestones.length === 0 ? (
        <p>No milestones found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Task</th>
              <th>Time Estimate (Days)</th>
              <th>KPI</th>
              <th>Risk Factors</th>
              <th>Risk Indicator</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone, index) => (
              <tr key={index}>
                <td>{milestone.Milestone}</td>
                <td>{milestone.Task}</td>
                <td>{milestone.TimeEstimate || milestone["Time Estimate (Days)"]}</td>
                <td>{milestone.KPI}</td>
                <td>{milestone.RiskFactors || milestone["Risk Factors"]}</td>
                <td>{milestone.RiskIndicator || milestone["Risk Indicator"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <img className="LeftArrow" alt="LeftArrow" src={LeftArrow} />
        <div className="text">لوحة القيادة</div>
      </button>
    </div>
  );
};

export default GoalDecomposeResult;