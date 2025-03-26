import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessModelResult.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import LeftArrow from "./assets/LeftArrow.svg";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const COMPONENT_MAP = [
  { key: "KeyPartnerships", label: "الشركاء الرئيسيون" },
  { key: "KeyActivities", label: "الأنشطة الرئيسية" },
  { key: "KeyResources", label: "الموارد الرئيسية" },
  { key: "ValueProposition", label: "عرض القيمة" },
  { key: "CstmrRelations", label: "علاقات العملاء" },
  { key: "Channels", label: "القنوات" },
  { key: "CstmrSegment", label: "شرائح العملاء" },
  { key: "CostType", label: "هيكل التكاليف" },
  { key: "RevenueType", label: "مصادر الإيرادات" },
];

const BusinessModelResult = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId") || localStorage.getItem("tempUserId");
      if (!userId) return;

      const userDoc = await getDoc(doc(db, "User", userId));
      if (!userDoc.exists()) return;

      const companyRef = userDoc.data().CompanyID;
      if (!companyRef) return;

      const inputQuery = query(
        collection(db, "BusinessModel_UserInput"),
        where("CompanyID", "==", companyRef),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const inputSnapshot = await getDocs(inputQuery);
      if (inputSnapshot.empty) return;

      const userInputDoc = inputSnapshot.docs[0].data();
      const modelRef = userInputDoc.ModelID;

      const modelDoc = await getDoc(modelRef);
      const modelData = modelDoc.exists() ? modelDoc.data() : {};

      const fetchedComponents = {
        ValueProposition: modelData.ValueProposition || "لا يوجد",
      };

      for (const { key } of COMPONENT_MAP) {
        if (key === "ValueProposition") continue; // already handled

        const q = query(
          collection(db, `BusinessModel_${key}`),
          where("ModelID", "==", modelRef)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const dataField = snap.docs[0].data()[key] || "لا يوجد";
          fetchedComponents[key] = dataField;
        } else {
          fetchedComponents[key] = "لا يوجد";
        }
      }

      setComponents(fetchedComponents);
    };

    fetchData();
  }, []);

  return (
    <div className="bm-result-page">
      <div className="logo-container">
        <img className="Logo" alt="Logo" src={AWJLOGO} />
      </div>

      <img className="SmallSqrs1" alt="SmallSqrs1" src={SmallSqrs1} />
      <img className="SmallSqrs2" alt="SmallSqrs2" src={SmallSqrs2} />
      <h1>نموذج العمل التجاري</h1>

      <div className="bm-table-container">
        <table className="bm-table">
          <thead>
            <tr>
              <th className="right-aligned">التفاصيل</th>
              <th className="left-aligned">المكون</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENT_MAP.map(({ key, label }) => (
              <tr key={key}>
                <td>{components[key] || "جارٍ التحميل..."}</td>
                <td>{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <img className="LeftArrow" alt="LeftArrow" src={LeftArrow} />
        <div className="text">لوحة القيادة</div>
      </button>
    </div>
  );
};

export default BusinessModelResult;
