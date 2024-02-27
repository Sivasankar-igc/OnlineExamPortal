import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLoginPage = () => {
    const nav = useNavigate();
    const [tid, setTid] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post("http://localhost:8000/getTeacherData", { tid, password })
            .then((res) => {
                if (res.data !== "failed") {
                    let tData = res.data;
                    nav("/teacherHomePage", { state: { tData } })
                } else {
                    window.alert("something went wrong")
                }
            })
            .catch((err) => console.error(`error at teacher login =>>> ${err}`))
    }

    return (
        <>
            <section className="teacherLP__wrapper">
                <div className="teacherLP__box">
                    <div>
                        <input type="text" id="tid" onChange={(e) => setTid(e.target.value)} />
                        <label htmlFor="tid">
                            <span>T</span>
                            <span>e</span>
                            <span>a</span>
                            <span>c</span>
                            <span>h</span>
                            <span>e</span>
                            <span>r</span>
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

export default TeacherLoginPage;