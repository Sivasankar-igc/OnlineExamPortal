import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLoginPage = () => {

    const nav = useNavigate();
    const [aid, setAid] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post("http://localhost:8000/getAdminData", { aid, password })
            .then((res) => {
                if (res.data !== "failed") {
                    let aData = res.data;
                    nav("/adminHomePage", { state: { aData } })
                } else {
                    window.alert("something went wrong")
                }
            })
            .catch((err) => console.error(`error at admin login =>>> ${err}`))
    }

    return (
        <>
            <section className="adminLP__wrapper">
                <div className="adminLP__box">
                    <div>
                        <input type="text" id="tid" onChange={(e) => setAid(e.target.value)} />
                        <label htmlFor="tid">
                            <span>A</span>
                            <span>d</span>
                            <span>m</span>
                            <span>i</span>
                            <span>n</span>
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

export default AdminLoginPage;