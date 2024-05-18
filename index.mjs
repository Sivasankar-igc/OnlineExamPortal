import express, { urlencoded } from "express";
import cors from "cors";
import { adminCollection, questionCollection, teacherCollection, studentCollection } from "./database.js";

const web = express();
const PORT = 8000 || process.env.PORT;

web.use(express.json());
web.use(urlencoded({ extended: false }));
web.use(cors());

const convertTimeToString = (time) => { /// TO CONVERT THE TIME INTO APPROPRIATE FORMAT
    let hour = parseInt(time.split(":")[0]);
    let minute = parseInt(time.split(":")[1]);

    if (hour == 12) {
        return String(hour + ":" + minute + "PM");
    }
    else if (hour > 12) {
        return String((hour - 12) + ":" + minute + "PM");
    } else if (hour == 0) {
        return String("12" + ":" + minute + "AM");
    } else {
        return String(hour + ":" + minute + "AM");
    }
}

/*==============================================================ADMIN API=====================================================================*/

web.post("/getAdminData", async (req, res) => {
    try {
        const { aid, password } = req.body;
        const data = await adminCollection.findOne({ aid: aid, password: password })
        data !== null ? res.status(200).send(data) : res.status(200).send("failed");
    } catch (error) {
        console.error(`Error : admin login error =>>> ${error}`)
    }
})

web.get("/getAllExam", async (req, res) => {
    try {
        const data = await questionCollection.find();
        data.length !== 0 ? res.status(200).send(data) : res.status(200).send(data);
    } catch (error) {
        console.error(`Error : while retrieving exams for admin =>>> ${error}`)
    }
})

web.post("/teacherEntry", async (req, res) => {
    try {
        const { name, email, tid, phno, designation, subjects } = req.body;
        const data = new teacherCollection({
            name: name,
            email: email,
            tid: tid,
            password: tid,
            phno: phno,
            designation: designation,
            subjects: subjects
        })
        const response = await data.save();
        response !== null ? res.status(200).send("success") : res.status(200).send("failed");
    } catch (error) {
        console.error(`Error : teacher entry error =>>> ${error}`)
    }
})

web.post("/editTeacher", async (req, res) => {
    try {
        const { ActTid, name, email, tid, phno, designation } = req.body;

        const response = await teacherCollection.updateOne({ tid: ActTid }, { tid: tid, name: name, email: email, phno: phno, designation: designation });
        response.modifiedCount === 1 ? res.status(200).send("edited") : res.status(200).send("not edited");
    } catch (error) {
        console.error(`Error : while editing teacher data =>>> ${error}`)
    }
})

web.post("/pushExam", async (req, res) => {
    try {
        const { semester, subject, dateInput, timeInput } = req.body;
        const response = await questionCollection.updateOne({ semester: semester, subject: subject }, { date: dateInput, time: convertTimeToString(timeInput), localTime: timeInput, isPushedByAdmin: true });
        response.modifiedCount === 1 ? res.status(200).send("success") : res.status(200).send("failed")
    } catch (error) {
        console.error(`Error : Pushing Exam =>>> ${error}`)
    }
})

web.post("/studentEntry", async (req, res) => {
    try {
        const { name, email, sid, phno, semester } = req.body;
        const data = new studentCollection({
            name: name,
            email: email,
            sid: sid,
            password: sid,
            phno: phno,
            semester: semester
        })
        const response = await data.save();
        response !== null ? res.status(200).send("success") : res.status(200).send("failed");
    } catch (error) {
        console.error(`Error : student entry error =>>> ${error}`)
        res.status(200).send("failed");
    }
})

web.post("/showStudentList", async (req, res) => {
    try {
        const response = await studentCollection.find();
        response.length != 0 ? res.status(200).send(response) : res.status(200).send("failed")
    } catch (error) {
        console.log(`Error : showing student list =>>> ${error}`);
        res.status(200).send("failed");
    }
})

web.post("/showTeacherList", async (req, res) => {
    try {
        const response = await teacherCollection.find();
        response.length != 0 ? res.status(200).send(response) : res.status(200).send("failed")
    } catch (error) {
        console.log(`Error : showing teacher list =>>> ${error}`);
        res.status(200).send("failed");
    }
})

web.post("/removeStudent", async (req, res) => {
    try {
        const { sid } = req.body;
        const response = await studentCollection.deleteOne({ sid: sid });
        response.deletedCount === 1 ? res.status(200).send("removed") : res.status(200).send("not removed");
    } catch (error) {
        console.error(`Error : while removing student data =>>> ${error}`)
    }
})

web.post("/editStudent", async (req, res) => {
    try {
        const { ActSid, name, email, sid, phno } = req.body;
        const response = await studentCollection.updateOne({ sid: ActSid }, { sid: sid, name: name, email: email, phno: phno });
        response.modifiedCount === 1 ? res.status(200).send("edited") : res.status(200).send("not edited");
    } catch (error) {
        console.error(`Error : while editing student data =>>> ${error}`)
    }
})

web.post("/updateSemester", async (req, res) => {
    try {
        const response = await studentCollection.updateMany({ semester: { $ne: '0' } }, { $inc: { semester: 1 } });
        response.modifiedCount > 0 ? res.status(200).send("updated") : res.status(200).send("not updated");
    } catch (error) {
        console.error(`Error : while editing student data =>>> ${error}`)
    }
})

web.post("/deletePreviousData", async (req, res) => {
    try {
        const response = await studentCollection.deleteMany({ semester: { $nin: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] } });
        response.deletedCount > 0 ? res.status(200).send("deleted") : res.status(200).send("not deleted");
    } catch (error) {
        console.error(`Error : while deleting previous student data =>>> ${error}`)
    }
})

/*==============================================================END OF ADMIN API==============================================================*/


/*==============================================================TEACHER API===================================================================*/

web.post("/createQuestionPaper", async (req, res) => {
    try {
        const { questionArray, answerArray, optionArray, semester, subject } = req.body;
        const questionExist = await questionCollection.findOne({ subject: subject });

        if (questionExist === null) {
            const data = new questionCollection({
                semester: semester,
                subject: subject,
                questions: questionArray,
                answers: answerArray,
                options: optionArray
            })
            const response = await data.save();
            response !== null ? res.status(200).send("success") : res.status(200).send("failed")
        } else {
            const response = await questionCollection.updateOne({ subject: subject }, { semester: semester, questions: questionArray, answers: answerArray, options: optionArray });
            response.matchedCount === 1 ? response.modifiedCount === 1 ? res.status(200).send("edited") : res.status(200).send("no changes") : res.status(200).send("editing failed")
        }
    } catch (error) {
        console.error(`Error : question preparation error =>>> ${error}`)
    }
})

web.post("/getTeacherData", async (req, res) => {
    try {
        const { tid, password } = req.body;
        const data = await teacherCollection.findOne({ tid: tid, password: password });
        data !== null ? res.status(200).send(data) : res.status(200).send("failed");
    } catch (error) {
        console.error(`Error : getting teacher data error =>>> ${error}`)
    }
})

web.post("/isQuestionAvailable", async (req, res) => {
    try {
        const { subject } = req.body;
        const data = await questionCollection.findOne({ subject: subject });
        data !== null ? res.status(200).send(data) : res.status(200).send("not found");
    } catch (error) {
        console.error(`Error : checking question exist or not =>>> ${error}`)
    }
})

/*==============================================================END OF TEACHER API============================================================*/


/*=========================================================================STUDENT API==========================================================*/

web.post("/studentEntry", async (req, res) => {
    try {
        const { name, email, sid, phno, semester } = req.body;
        const data = new studentCollection({
            name: name,
            email: email,
            sid: sid,
            password: sid,
            phno: phno,
            semester: semester
        })
        const response = await data.save();
        response !== null ? res.status(200).send("success") : res.status(200).send("failed");
    } catch (error) {
        console.error(`Error : teacher entry error =>>> ${error}`)
    }
})

web.post("/getStudentData", async (req, res) => {
    try {
        const { sid, password } = req.body;
        const data = await studentCollection.findOne({ sid: sid, password: password });
        data !== null ? res.status(200).send(data) : res.status(200).send("invalid");
    } catch (error) {
        console.error(`Error : getting teacher data error =>>> ${error}`)
    }
})

web.post("/getQuestions", async (req, res) => {
    try {
        const { semester } = req.body;
        const data = await questionCollection.find({ semester: semester });
        data.length !== 0 ? res.status(200).send(data) : res.status(200).send(data);
    } catch (error) {
        console.error(`Error at getting questions for student =>>> ${error}`)
    }
})


/*=======================================================================END OF STUDENT API======================================================*/

web.listen(PORT, () => console.log(`Server listening at port number ${PORT}`));