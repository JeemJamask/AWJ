import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQ from "./faq";
import EasyToUse from "./assets/EasyToUse.svg";
import SmartD from "./assets/SmartD.svg";
import Flexibility from "./assets/Flexibility.svg";
import V1 from "./assets/V1.svg";
import x57 from "./assets/2030.svg";
import x58 from "./assets/sqrs.svg";
import x59 from "./assets/Rectangle102.svg";
import x60 from "./assets/Rectangle103.svg";
import V2 from "./assets/V2.svg";
import V3 from "./assets/V3.svg";
import logo from "./assets/logo.png";
import intersect from "./assets/Intersect.png";
import MONSHAAT from "./assets/MONSHAAT.png";
import AWS from "./assets/Aws.png";
import "./style.css";
import profile from "./assets/profile.svg";
import LeftArrow from "./assets/LeftArrow.svg";

const faqData = [
    { f_id: 1, f_question: "ما هو أوج؟", f_answer: "أوج هو منصة مبتكرة مدعومة بالذكاء الاصطناعي تساعد الشركات الناشئة والمؤسسات على التخطيط الاستراتيجي واتخاذ قرارات مدروسة لتحقيق النمو المستدام." },
    { f_id: 2, f_question: "ما هي المزايا التي يوفرها أوج؟", f_answer: "أوج منصة ذكاء اصطناعي تدعم الشركات الناشئة ببناء نماذج أعمال مخصصة، تقسيم الأهداف، تتبع الأداء، وتعزيز التعاون، مما يساعدها على تقليل المخاطر وتحقيق النمو المستدام." },
    { f_id: 3, f_question: "هل أوج مناسب فقط للشركات الناشئة الصغيرة؟", f_answer: "لا، أوج يخدم الشركات الناشئة المتناهية الصغر والصغيرة، بالإضافة إلى رواد الأعمال الذين لم يبدأوا بتنفيذ أفكارهم بعد، مما يجعله الحل المثالي لدعم الابتكار والنمو في جميع المراحل." },
    { f_id: 4, f_question: "هل بياناتي آمنة في أوج؟", f_answer: "نعم، نولي أولوية قصوى لأمان بياناتك. يتم تخزين المعلومات بأمان مع ضمان عدم مشاركتها لأي أطراف خارجية." },
    { f_id: 5, f_question: "هل يمكنني العمل مع أعضاء فريقي على أوج؟", f_answer: "بالتأكيد! يتيح لك أوج دعوة أعضاء فريقك للتعاون على نفس صفحة الشركة." },
];

const HomePage = () => {
    const [hoveredImage, setHoveredImage] = useState(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate(); 

    const handleSignInClick = () => {
        console.log("Sign-In button clicked!");
        navigate("/signin");
    };

    const handleServicesClick = () => {
        console.log("Services button clicked!");
        navigate("/services");
    };

    const navigateToFAQ = () => {
        const faqSection = document.getElementById("faqSection");
        if (faqSection) {
            window.scrollTo({ top: faqSection.offsetTop, behavior: "smooth" });
        }
    };

    const navigateToPartners = () => {
        const partnersSection = document.getElementById('partnersSection');
        if (partnersSection) {
            partnersSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navigateToAbout = () => {
        const aboutSection = document.getElementById('aboutSection');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMouseEnter = (imageName, event) => {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        setPosition({ top, left, width, height });
        setHoveredImage(imageName);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <div className="home-page">
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="div">
                    <div className="overlap">
                        <img className="intersect" alt="Intersect" src={intersect} />
                        <div className="rectangle" />
                        <div className="group">
                            <div className="overlap-group">
                                <div className="rectangle-2" />
                                <img className="logo" alt="logo" src={logo} />
                            </div>
                        </div>

                        <p className="text-wrapper">
                            نصمم حلولاً مبتكرة مدعومة بالذكاء الاصطناعي لمساعدة الشركات الناشئة على تحقيق أهدافها<br />
                            الاستراتيجية، من خلال فريق مبدع وشغوف يواكب أحدث التطورات التقنية.
                        </p>

                        <div
                            className="text-wrapper-1 clickable-text"
                            onClick={navigateToFAQ}
                        >
                            الأسئلة الشائعة
                        </div>

                        <div
                            className="text-wrapper-2 clickable-text"
                            onClick={navigateToPartners}
                        >
                            شركاؤنا
                        </div>

                        <div
                            className="text-wrapper-3 clickable-text"
                            onClick={navigateToAbout}
                        >
                            عن أوج
                        </div>

                        <div className="text-wrapper-4">خطط ذكية، أهداف واضحة، نجاح مستدام</div>

                        <img className="profile" alt="profile" src={profile} />

                        <button className="overlap-2" onClick={handleSignInClick}>
                            <div className="text-wrapper-8">تسجيل دخول</div>
                            <img className="LeftArrow" alt="LeftArrow" src={LeftArrow} />
                        </button>

                        <button className="services-btn" onClick={handleServicesClick}>
                            <div className="text-wrapper12">ابدأ رحلتك مع أوج</div>
                        </button>
                    </div>

                    <div>
                        <div
                            className="overlap-4"
                            onMouseEnter={(e) => handleMouseEnter("V1", e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img className="ThreeIcons" alt="EasyToUse" src={EasyToUse} />
                        </div>

                        <div
                            className="overlap-6"
                            onMouseEnter={(e) => handleMouseEnter("V2", e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img className="ThreeIcons" alt="SmartD" src={SmartD} />
                        </div>

                        <div
                            className="overlap-7"
                            onMouseEnter={(e) => handleMouseEnter("V3", e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img className="ThreeIcons" alt="Flexibility" src={Flexibility} />
                        </div>
                    </div>

                    {hoveredImage && (
                        <div
                            className="hover-image"
                            style={{
                                top: position.top,
                                left: position.left,
                                width: position.width,
                                height: position.height,
                                position: "absolute",
                                pointerEvents: "none",
                                zIndex: 10,
                            }}
                        >
                            <img
                                src={
                                    hoveredImage === "V1" ? V1 :
                                    hoveredImage === "V2" ? V2 :
                                    hoveredImage === "V3" ? V3 : null
                                }
                                alt="Hovered"
                            />
                        </div>
                    )}

                    <div className="frame" id="aboutSection">
                        <div className="overlap-9">
                            <img className="image2" alt="2030" src={x57} />
                            <img className="image2" alt="recGradient" src={x59} />
                            <p className="text-wrapper-13">
                                نواكب رؤية 2030 بتمكين الشركات الناشئة عبر حلول ذكاء اصطناعي تدعم النمو وتنوع الاقتصاد
                            </p>
                        </div>
                    </div>

                    <div>
                        <img className="image3" alt="sqrs" src={x58} />
                    </div>

                    <div className="overlap-10" id="partnersSection">
                        <div>
                            <img className="Rectangle60" alt="recGradient" src={x60} />
                        </div>
                        <div className="text-wrapper-10">شركاؤنا</div>
                        <img className="MONSHAAT" alt="Monshaat logo" src={MONSHAAT} />
                        <img className="AWS" alt="Aws logo" src={AWS} />
                    </div>

                    {/* FAQ Section */}
                    <div id="faqSection">
                        <FAQ faq={faqData} />
                    </div>

                    <div>
                        <div className="CopyRights" />
                        <p className="p">أوج ٢٠٢٤. جميع الحقوق محفوظة</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;