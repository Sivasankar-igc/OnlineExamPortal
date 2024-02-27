import { useState } from "react";
import "../../CSS/examCreationPage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ExamCreationPage = () => {
    const arr = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29);
    const loc = useLocation();
    let subject = loc.state.subject;
    const question = loc.state.question;
    const tData = loc.state.tData;
    let [semester, setSemester] = useState();
    const nav = useNavigate();

    const handleExamCreation = () => {
        let questionArray = [];
        let answerArray = [];
        let optionArray = [];
        if (question !== undefined) {
            semester = question.semester;
            subject = question.subject;
        }

        const questions = document.querySelectorAll(".examCreation-wrapper .body .question-format .questions .question .question-area");
        const answers = document.querySelectorAll(".examCreation-wrapper .body .question-format .questions .question .answer-area");

        arr.map(i => {
            let temp = [];
            questionArray.push(questions[i].value);
            answerArray.push(answers[i].value);
            document.querySelectorAll(`.examCreation-wrapper .body .question-format .questions .question .option-area${i}`).forEach(o => temp.push(o.value));
            optionArray.push(temp);
        })

        const canProceed = window.confirm("Ready To Proceed?")
        if (canProceed) {
            axios.post("http://localhost:8000/createQuestionPaper", { questionArray, answerArray, optionArray, semester, subject })
                .then((res) => {
                    if (res.data === "success" || res.data === "edited") nav("/teacherHomePage", { state: { tData } });
                    else if (res.data === "no changes") window.alert("No changes...")
                    else window.alert("something went wrong");
                })
                .catch((err) => console.error(`Error : teacher exam creation : ${err}`))
        }
    }

    if (question === undefined) {
        return (
            <>
                <section className="examCreation-wrapper">
                    <div className="head">
                        <div className="details">
                            <div className="left">
                                <p>Subject</p>
                                <p>Semester</p>
                                <p>Full Mark</p>
                            </div>
                            <div className="right">
                                <p>{subject}</p>
                                <select name="semester" id="semester" onChange={(e) => setSemester(e.target.value)}>
                                    <option value="">--choose semester</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <p>30</p>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="question-format">
                            <header>Multiple Choice Questions : (1x30)</header>
                            <div className="questions">
                                {
                                    arr.map((i, index) => (
                                        <div className="question" key={index}>
                                            <div><span>{i + 1}:</span><textarea cols="50" rows="1" placeholder={`Enter Question ${i + 1}`} style={{ width: "90%" }} className="question-area"></textarea></div>
                                            <div><span>Ans:</span> <input type="text" placeholder={`Enter Answer ${i + 1}`} style={{ width: "30%" }} className="answer-area" /></div>
                                            <div className="options">
                                                <div><span>A </span><input type="text" placeholder="Enter Option A" className={`option-area${i}`} /></div>
                                                <div><span>B </span><input type="text" placeholder="Enter Option B" className={`option-area${i}`} /></div>
                                                <div><span>C </span><input type="text" placeholder="Enter Option C" className={`option-area${i}`} /></div>
                                                <div><span>D </span><input type="text" placeholder="Enter Option D" className={`option-area${i}`} /></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div id="btn-container"><button onClick={() => handleExamCreation()}>CREATE</button></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    else {
        return (
            <>
                <section className="examCreation-wrapper">
                    <div className="head">
                        <div className="details">
                            <div className="left">
                                <p>Subject</p>
                                <p>Semester</p>
                                <p>Full Mark</p>
                            </div>
                            <div className="right">
                                <p>{question.subject}</p>
                                <select name="semester" id="semester" onChange={(e) => setSemester(e.target.value)}>
                                    <option value="">{question.semester}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <p>30</p>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="question-format">
                            <header>Multiple Choice Questions : (1x30)</header>
                            <div className="questions">
                                {
                                    question.questions.map((quest, index) => (
                                        <div className="question" key={index}>
                                            <div><span>{index + 1}:</span><textarea cols="50" rows="1" defaultValue={quest} style={{ width: "90%" }} className="question-area"></textarea></div>
                                            <div><span>Ans:</span> <input type="text" defaultValue={question.answers[index]} style={{ width: "30%" }} className="answer-area" /></div>
                                            <div className="options">
                                                <div><span>A </span><input type="text" defaultValue={question.options[index][0]} className={`option-area${index}`} /></div>
                                                <div><span>B </span><input type="text" defaultValue={question.options[index][1]} className={`option-area${index}`} /></div>
                                                <div><span>C </span><input type="text" defaultValue={question.options[index][2]} className={`option-area${index}`} /></div>
                                                <div><span>D </span><input type="text" defaultValue={question.options[index][3]} className={`option-area${index}`} /></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div id="btn-container"><button onClick={() => handleExamCreation()}>EDIT</button></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }


}

export default ExamCreationPage;