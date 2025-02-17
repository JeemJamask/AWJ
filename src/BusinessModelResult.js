import React from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessModelResult.css";
import SmallSqrs1 from "./assets/SmallSqrs1.svg";
import SmallSqrs2 from "./assets/SmallSqrs2.svg";
import AWJLOGO from "./assets/AWJLOGO.svg";
import LeftArrow from "./assets/LeftArrow.svg";

const BusinessModelResult = () => {
    const navigate = useNavigate();

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
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>الشركاء الرئيسيون</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>الأنشطة الرئيسية</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>الموارد الرئيسية</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>عرض القيمة</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>علاقات العملاء</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>القنوات</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>شرائح العملاء</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>هيكل التكاليف</td>
                        </tr>
                        <tr>
                            <td> (سيتم إدخال البيانات لاحقًا)</td>
                            <td>مصادر الإيرادات</td>
                        </tr>
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
