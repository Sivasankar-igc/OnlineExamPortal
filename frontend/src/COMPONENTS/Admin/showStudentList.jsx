import axios from "axios";
import { useEffect, useState } from "react";

const ShowStudentList = () => {
    const [studentData, setStudentData] = useState(null);
    const [semester, setSemester] = useState(1);
    const [updateRequest, setUpdateRequest] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:8000/showStudentList")
            .then((res) => res.data !== "failed" ? setStudentData(res.data) : window.alert("Something went wrong"))
            .catch(err => window.alert("Network connection error"))
    }, [])

    const editStudentData = (ActSid, parent) => {
        let sid = parent.children[0].firstChild.value;
        let name = parent.children[1].firstChild.value;
        let email = parent.children[2].firstChild.value;
        let phno = parent.children[3].firstChild.value;

        axios.post("http://localhost:8000/editStudent", { ActSid, name, email, sid, phno })
            .then((res) => res.data === "edited" ? location.reload() : window.alert("something went wrong"))
            .catch(err => window.alert("Network connection error"))
    }

    const removeStudent = (sid) => {
        axios.post("http://localhost:8000/removeStudent", { sid })
            .then((res) => res.data === "removed" ? location.reload() : window.alert("something went wrong"))
            .catch(err => window.alert("Network connection error"))
    }

    if (studentData !== null) {
        return (
            <>
                <select onChange={(e) => setSemester(parseInt(e.target.value))}>
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

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>SID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>PHNO</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentData.map((data) => (
                                    data.semester === semester ? <tr key={data.email}>
                                        {updateRequest === data.sid ? <td><input type="text" defaultValue={data.sid} /></td> : <td>{data.sid}</td>}
                                        {updateRequest === data.sid ? <td><input type="text" defaultValue={data.name} /></td> : <td>{data.name}</td>}
                                        {updateRequest === data.sid ? <td><input type="text" defaultValue={data.email} /></td> : <td>{data.email}</td>}
                                        {updateRequest === data.sid ? <td><input type="text" defaultValue={data.phno} /></td> : <td>{data.phno}</td>}
                                        <td>{updateRequest === data.sid ? <button onClick={(e) => editStudentData(data.sid, e.target.parentNode.parentNode)}>Done</button> : <button onClick={() => setUpdateRequest(data.sid)}>Edit</button>}<button onClick={() => removeStudent(data.sid)}>Remove</button></td>
                                    </tr> : ""
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )

    } else {
        return (
            <div>404 Error : Couldn't retrieve student data</div>
        )
    }
}

export default ShowStudentList;