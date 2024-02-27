import { useLocation } from "react-router-dom";

const AttendExamPage = () => {

    const data = useLocation().state;
    let mark = 0;

    const handleSubmit = (btn) => {
        let confirm = window.confirm("Are You Sure?")
        if (confirm) {
            btn.disabled = true;
            let ans = [];
            for (let i = 0; i < 30; i++) {
                ans[i] = '';
                document.querySelectorAll(`.attendExam .options input[name='option${i}']`).forEach(radio => {
                    radio.checked ? ans[i] = radio.value : ""
                    radio.disabled = true;
                })
            }
            ans.forEach((i, index) => i === data.questionPaper.answers[index] ? mark++ : "");
            console.log(mark)
        }
    }

    let id = 0;
    if (data !== null) {
        return (
            <>
                <section className="examCreation-wrapper">
                    <div className="head attendExamHead">
                        <div className="details details-left">
                            <div className="left">
                                <p>Name</p>
                                <p>Roll No</p>
                                <p>Semester</p>
                            </div>
                            <div className="right">
                                <p>{data.name}</p>
                                <p>{data.sid}</p>
                                <p>{data.questionPaper.semester}</p>
                            </div>
                        </div>
                        <div className="details details-right" style={{ padding: "10px 15px" }}>
                            <div className="left">
                                <p>Subject</p>
                                <p>Full Mark</p>
                                <p>Duration</p>
                            </div>
                            <div className="right">
                                <p>{data.questionPaper.subject}</p>
                                <p>30</p>
                                <p>1 hour 30 mins</p>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="question-format">
                            <header>Multiple Choice Questions : (1x30)</header>
                            <div className="questions attendExam">
                                {
                                    data.questionPaper.questions.map((question, index) => (
                                        <div className="question" key={index}>
                                            <div><span>{index + 1}:</span><p>{question}</p></div>
                                            {
                                                <div className="options">
                                                    <div><span>A </span><input type="radio" name={`option${index}`} id={`id${id}`} value={data.questionPaper.options[index][0]} /><label htmlFor={`id${id++}`}>{data.questionPaper.options[index][0]}</label></div>
                                                    <div><span>B </span><input type="radio" name={`option${index}`} id={`id${id}`} value={data.questionPaper.options[index][1]} /><label htmlFor={`id${id++}`}>{data.questionPaper.options[index][1]}</label></div>
                                                    <div><span>C </span><input type="radio" name={`option${index}`} id={`id${id}`} value={data.questionPaper.options[index][2]} /><label htmlFor={`id${id++}`}>{data.questionPaper.options[index][2]}</label></div>
                                                    <div><span>D </span><input type="radio" name={`option${index}`} id={`id${id}`} value={data.questionPaper.options[index][3]} /><label htmlFor={`id${id++}`}>{data.questionPaper.options[index][3]}</label></div>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="btn"><button onClick={(e) => handleSubmit(e.target)}>SUBMIT</button></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default AttendExamPage;