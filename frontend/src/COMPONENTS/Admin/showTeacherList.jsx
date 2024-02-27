import axios from "axios";
import { useEffect, useState } from "react";

const ShowTeacherList = () => {
    const [teacherData, setTeacherData] = useState(null);
    const [updateRequest, setUpdateRequest] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const [canEditSubject, setCanEditSubject] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:8000/showTeacherList")
            .then(res => res.data !== "failed" ? setTeacherData(res.data) : window.alert("something went wrong"))
            .catch(err => window.alert("network connection error"))
    }, [])

    const handleEdit = (tid, name, email, phno) => {
        console.log(tid, name, email, phno)
    }

    const removeSubject = (index) => {
        subjects.splice(index, 1);
        setSubjects([...subjects]);
    }

    const editSubject = (value, index) => {
        subjects[index] = value;
        setSubjects([...subjects])
    }


    if (teacherData !== null) {
        return (
            <>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>TID</th>
                                <th>Email</th>
                                <th>PHNO</th>
                                <th>SUBJECTS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teacherData.map((data) => (
                                    <tr key={data.email}>
                                        {updateRequest === data.tid ? <td><input type="text" defaultValue={data.name} /></td> : <td>{data.name}</td>}
                                        {updateRequest === data.tid ? <td><input type="text" defaultValue={data.tid} /></td> : <td>{data.tid}</td>}
                                        {updateRequest === data.tid ? <td><input type="text" defaultValue={data.email} /></td> : <td>{data.email}</td>}
                                        {updateRequest === data.tid ? <td><input type="text" defaultValue={data.phno} /></td> : <td>{data.phno}</td>}
                                        {updateRequest === data.tid ? <td><button onClick={() => { setSubjects(data.subjects); setCanEditSubject(true) }}>Edit Subject</button></td> :
                                            <td>
                                                {
                                                    data.subjects.map((sub, index) => (
                                                        <span key={index}>{sub},&nbsp;</span>
                                                    ))
                                                }
                                            </td>}
                                        <td>{updateRequest === data.tid ? <button onClick={() => handleEdit(data.tid)}>Done</button> : <button onClick={() => setUpdateRequest(data.tid)}>Edit</button>}<button>Remove</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {
                    subjects !== null ?
                        <div>
                            {
                                subjects.map((sub, index) => (
                                    <div key={`${sub}${index}`}><input type="text" defaultValue={sub} onChange={(e) => editSubject(e.target.value, index)} /><button onClick={(e) => removeSubject(index)}>Remove</button></div>
                                ))
                            }
                            <button onClick={() => setSubjects([...subjects, ""])}>Add</button><button onClick={() => setCanEditSubject(false)}>Done</button>
                        </div>
                        : ""
                }
            </>
        )
    } else {
        return (
            <div>404 Error : couldn't retrieve teacher list</div>
        )
    }
}

export default ShowTeacherList;