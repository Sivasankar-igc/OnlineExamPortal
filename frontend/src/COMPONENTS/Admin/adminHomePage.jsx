import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../CSS/adminHomePage.css";

const AdminHomePage = () => {
    const aData = useLocation().state.aData;
    const [examData, setExamData] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/getAllExam")
            .then((res) => res.data !== "failed" ? setExamData(res.data) : "")
            .catch(err => console.error(`error while getting exams for admin =>>> ${err}`))
    }, [])

    const pushQuestion = (index, semester, subject) => {
        const dateInput = document.querySelectorAll(".adminHomePage-wrapper .table-container table tbody tr")[index].children[2].children[0].value;
        const timeInput = document.querySelectorAll(".adminHomePage-wrapper .table-container table tbody tr")[index].children[3].children[0].value;

        if (dateInput === "" || timeInput === "") window.alert("Time or Date Field must not be empty ")
        else {
            axios.post("http://localhost:8000/pushExam", { semester, subject, dateInput, timeInput })
                .then((res) => res.data === "success" ? window.alert("Pushed") : window.alert("something went wrong"))
                .catch(err => window.alert("network connection error"))
        }
    }

    const updateSemester = () => {
        if (window.prompt("Type 'Update Semester'") === "Update Semester") {
            if (window.confirm("Warning : Confirm???")) {
                axios.post("http://localhost:8000/updateSemester")
                    .then(res => res.data === "updated" ? window.alert("Semester Updated") : window.alert("something went wrong"))
                    .catch(err => window.alert("Network connection error"))
            }
        } else {
            window.alert("Type the correct sentence")
        }
    }

    const deletePreviousData = () => {
        if (window.prompt("Type 'Delete Semester'") === "Delete Semester") {
            if (window.confirm("Warning : Confirm???")) {
                axios.post("http://localhost:8000/deletePreviousData")
                    .then(res => res.data === "deleted" ? window.alert("Previous Student Data Deleted") : window.alert("something went wrong"))
                    .catch(err => window.alert("Network connection error"))
            }
        } else {
            window.alert("Type the correct sentence")
        }
    }

    return (
        <>
            <section className="adminHomePage-wrapper">
                <header>Exam List</header>
                <div className="exam-container">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Subject</th>
                                    <th>Set Date</th>
                                    <th>Set Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {
                                examData !== null ?
                                    <tbody>
                                        {
                                            examData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.semester}</td>
                                                    <td>{data.subject}</td>
                                                    <td><input type="date" defaultValue={data.date} /></td>
                                                    <td><input type="time" defaultValue={data.localTime} /></td>
                                                    <td><button onClick={() => pushQuestion(index, data.semester, data.subject)}>PUSH</button><button onClick={() => nav("/showQuestionPaper", { state: { data } })}>VIEW</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody> : <tfoot><tr><td style={{ columnSpan: "5" }}>No Exam</td></tr></tfoot>
                            }
                        </table>
                    </div>
                </div>
            </section>
            <button onClick={() => nav("/studentEntry")}>New Student Entry</button>
            <button onClick={() => nav("/teacherEntry")}>New Teacher Entry</button>
            <button onClick={() => nav("/showStudentList")}>Student List</button>
            <button onClick={() => nav("/showTeacherList")}>Teacher List</button>
            <button onClick={() => updateSemester()}>Update Semester</button>
            <button onClick={() => deletePreviousData()}>Delete Previous Student Data</button>
        </>
    )
}

export default AdminHomePage;