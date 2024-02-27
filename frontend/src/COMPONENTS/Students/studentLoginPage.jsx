import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLoginPage = () => {
    const nav = useNavigate();

    const [sid, setSID] = useState("");
    const [password, setPassword] = useState("");
    const [questionData, setQuestionData] = useState([]);

    const handleLogin = () => {
        axios.post("http://localhost:8000/getStudentData", { sid, password })
            .then((res) => {
                if (res.data === "invalid") {
                    window.alert("Wrong login information")
                } else {
                    let stdData = res.data;
                    nav("/studentHomePage", { state: { stdData } });
                }
            })
            .catch((err) => console.error(`Error at student login =>>> ${err}`))
    }
    return (
        <>
            <section className="studentLP__wrapper">
                <div className="studentLP__box">
                    <div>
                        <input type="text" id="sid" onChange={(e) => setSID(e.target.value)} />
                        <label htmlFor="sid">
                            <span>S</span>
                            <span>t</span>
                            <span>u</span>
                            <span>d</span>
                            <span>e</span>
                            <span>n</span>
                            <span>t</span>
                            <span> </span>
                            <span>I</span>
                            <span>d</span>
                        </label>
                    </div>
                    <div>
                        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">
                            <span>P</span>
                            <span>a</span>
                            <span>s</span>
                            <span>s</span>
                            <span>w</span>
                            <span>o</span>
                            <span>r</span>
                            <span>d</span>
                        </label>
                    </div>
                    <button onClick={() => handleLogin()}>LOGIN</button>
                </div>
            </section>
        </>
    )
}

export default StudentLoginPage;