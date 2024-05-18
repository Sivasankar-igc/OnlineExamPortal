import axios from "axios";
import { useState } from "react";

const TeacherEntry = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [tid, setTid] = useState();
    const [phno, setPhno] = useState();
    const [designation, setDesignation] = useState();
    const [subjects, setSubjects] = useState(['']);

    const handleAddingNewData = () => {
        axios.post("http://localhost:8000/teacherEntry", { name, email, tid, phno, designation, subjects })
            .then(res => {
                if (res.data === "success") {
                    document.querySelectorAll("input").forEach(ele => ele.value = "");
                    setSubjects([''])
                    window.alert("added successfully");
                } else {
                    window.alert("something went wrong")
                }
            })
            .catch(err => console.error(`Error while adding new student ${err}`))
    }

    const addNewSubject = () => {
        setSubjects([...subjects, []]);
    }

    const handleNewSubject = (subject, index) => {
        const tempArr = [...subjects];
        tempArr[index] = subject;
        setSubjects(tempArr);
    }

    const deleteSubject = (index) => {
        const tempArr = [...subjects];
        tempArr.splice(index, 1);
        setSubjects(tempArr);
    }

    return (
        <>
            <div>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} /> <br />
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="text" placeholder="tid" onChange={e => setTid(e.target.value)} /><br />
                <input type="text" placeholder="phno" onChange={e => setPhno(e.target.value)} /><br />
                <input type="text" placeholder="designation" onChange={e => setDesignation(e.target.value)} /><br />
            </div>
            {
                subjects.map((sub, index) => (
                    <div key={index}>
                        <input className="subjects" type="text" value={sub} placeholder="add subject" onChange={(e) => handleNewSubject(e.target.value, index)} />
                        <button onClick={() => deleteSubject(index)}>Delete</button>
                    </div>
                ))
            }
            <button onClick={() => addNewSubject()}>Subject +</button>

            <button onClick={() => handleAddingNewData()}>Add</button>
        </>
    )
}

export default TeacherEntry;