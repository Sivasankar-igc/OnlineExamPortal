import { useLocation, useNavigate } from "react-router-dom";
import "../../CSS/teacherHomePage.css";
import "../../CSS/profile.css";
import img from "../../R.jpg";
import axios from "axios";

const TeacherHomePage = () => {
    const tData = useLocation().state.tData;
    const nav = useNavigate();

    const handleExamCreation = (subject) => {
        axios.post("http://localhost:8000/isQuestionAvailable", { subject })
            .then((res) => { let question = res.data; res.data !== "not found" ? nav("/examCreationPage", { state: { question, tData } }) : nav("/examCreationPage", { state: { subject, tData } }) })
            .catch(err=>console.error(`Error while checking the question exist or not =>>> ${err}`))

    }

    if (tData !== null) {
        return (
            <>
                <section className="teacherHP-wrapper profile-wrapper">
                    <div className="tea-profile profile">
                        <img src={img} />
                        <div className="details">
                            <div className="left">
                                <p>Name </p>
                                <p>Email </p>
                                <p>PhNo </p>
                                <p>TId </p>
                                <p>Desg </p>
                            </div>
                            <div className="right">
                                <p>{tData.name}</p>
                                <p>{tData.email}</p>
                                <p>{tData.phno}</p>
                                <p>{tData.tid}</p>
                                <p>{tData.designation}</p>
                            </div>
                        </div>
                    </div>
                    <div className="btns">
                        {
                            tData.subjects.map((sub, index) => (
                                <button onClick={() => handleExamCreation(sub)} key={index}>{sub}</button>
                            ))
                        }
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <div>Something went wrong!!!</div>
        )
    }
}

export default TeacherHomePage;