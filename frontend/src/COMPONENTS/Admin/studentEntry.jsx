import axios from "axios";
import { useState } from "react";

const StudentEntry = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [sid, setSid] = useState();
    const [phno, setPhno] = useState();
    const [semester, setSemester] = useState();

    const handleAddingNewData = () => {
        axios.post("http://localhost:8000/studentEntry", { name, email, sid, phno, semester })
            .then(res => {
                if (res.data === "success") {
                    document.querySelectorAll("input").forEach(ele => ele.value = "");
                    window.alert("added successfully");
                } else {
                    window.alert("something went wrong")
                }
            })
            .catch(err => console.error(`Error while adding new student ${err}`))
    }

    return (
        <>
            <select name="semester" id="semester" onChange={e => setSemester(e.target.value)}>
                <option value="">--</option>
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
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="name"/>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
            <input type="text" onChange={e => setSid(e.target.value)} placeholder="sid"/>
            <input type="text" onChange={e => setPhno(e.target.value)} placeholder="phno"/>

            <button onClick={() => handleAddingNewData()}>Add</button>
        </>
    )
}

export default StudentEntry;