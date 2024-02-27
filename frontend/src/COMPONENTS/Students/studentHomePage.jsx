import img from "../../R.jpg";
import "../../CSS/studentHomePage.css";
import "../../CSS/profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentHomePage = () => {
    const nav = useNavigate();
    const data = useLocation().state.stdData;
    const [noExam, setNoExam] = useState(false);
    const [examData, setExamData] = useState(null);
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 5))
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10).toString());

    useEffect(() => {
        let semester = data.semester;
        setTime(new Date().toTimeString().slice(0, 5));
        setDate(new Date().toISOString().slice(0, 10).toString());
        axios.post("http://localhost:8000/getQuestions", { semester })
            .then((res) => {
                if (res.data.length > 0) {
                    setExamData(res.data)
                } else {
                    setNoExam(true);
                }
            })
            .catch(err => console.error(`Error while getting question for the student =>>> ${err}`))
    })

    const handleExamPageGeneration = (name, sid, questionPaper) => {
        nav("/attendExamPage", { state: { name, sid, questionPaper } })
    }

    if (data !== null) {
        return (
            <>
                <section className="studentHP-wrapper profile-wrapper">
                    <div className="std-profile profile" style={{ marginTop: "2%" }}>
                        <img src={img} style={{ width: "100px", height: "100px" }} />
                        <div className="details">
                            <div className="left">
                                <p>Name </p>
                                <p>Email </p>
                                <p>PhNo </p>
                                <p>SId </p>
                                <p>Semester </p>
                            </div>
                            <div className="right">
                                <p>{data.name}</p>
                                <p>{data.email}</p>
                                <p>{data.phno}</p>
                                <p>{data.sid}</p>
                                <p>{data.semester}</p>
                            </div>
                        </div>
                    </div>
                    <section className="std-exams-wrapper">
                        <header>Exam List</header>
                        <div className="exam-container">
                            <div className="exam-box-heading" style={{ margin: "10px 0" }}>
                                <p>SUBJECT</p>
                                <p>DATE</p>
                                <p>TIME</p>
                                <p>ACTION</p>
                            </div>
                            {
                                !noExam && examData !== null ? examData.map(exam => (
                                    <div className="exam-box" key={exam.subject}>
                                        <div className="examName">
                                            <p>{exam.subject}</p>
                                        </div>
                                        <div className="date">
                                            <p>{exam.date}</p>
                                        </div>
                                        <div className="time">
                                            <p>{exam.time}</p>
                                        </div>
                                        {time == exam.localTime && date == exam.date ? <button className="active" onClick={() => handleExamPageGeneration(data.name, data.sid, exam)} style={{ backgroundColor: "#00ff58" }}>Attend</button> : <button style={{ cursor: "auto", backgroundColor: "red" }}>Attend</button>}
                                    </div>
                                )) : noExam ? <div>No Exam</div> : <div>Network Connection Error</div>
                            }
                        </div>
                    </section>
                </section>
            </>
        )
    } else {
        return (
            <>
                <div>404 Error</div>
                <div>Something Went Wrong. Please check your internet connection.</div>
            </>
        )
    }
}

export default StudentHomePage;