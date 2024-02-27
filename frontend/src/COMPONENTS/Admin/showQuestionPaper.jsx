import "../../CSS/examCreationPage.css";
import { useLocation } from "react-router-dom";

const ShowQuestionPaper = () => {
    const loc = useLocation();
    const question = loc.state.data; console.log(question)

    return (
        <>
            {
                question !== undefined ? <section className="examCreation-wrapper">
                    <div className="head">
                        <div className="details">
                            <div className="left">
                                <p>Subject</p>
                                <p>Semester</p>
                                <p>Full Mark</p>
                            </div>
                            <div className="right">
                                <p>{question.subject}</p>
                                <p>{question.semester}</p>
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
                                            <div><span>{index + 1}:</span><p>{quest}</p></div>
                                            <div><span>Ans:</span><p>{question.answers[index]}</p></div>
                                            {
                                                <div className="options">
                                                    <div><span>A </span><p>{question.options[index][0]}</p></div>
                                                    <div><span>B </span><p>{question.options[index][1]}</p></div>
                                                    <div><span>C </span><p>{question.options[index][2]}</p></div>
                                                    <div><span>D </span><p>{question.options[index][3]}</p></div>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </section> : ""

            }
        </>
    )
}

export default ShowQuestionPaper;