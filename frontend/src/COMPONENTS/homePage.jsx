import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const nav = useNavigate();
    return (
        <>
            <section className="homePage__wrapper">
                <div>
                    <button onClick={() => nav("studentLoginPage")}>Student</button>
                    <button onClick={() => nav("teacherLoginPage")}>Teacher</button>
                    <button onClick={() => nav("adminLoginPage")}>Admin</button>
                </div>
            </section>
        </>
    )
}

export default HomePage;