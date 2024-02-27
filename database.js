const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ExamCreationDatabae")
    .then(() => console.log("Exam Creation Database connected"))
    .catch((err) => `Error at database connection ${err}`)

const questionPatternSchema = mongoose.Schema({
    semester: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    date: { type: String },
    time: { type: String },
    localTime: { type: String },
    questions: { type: Array },
    answers: { type: Array },
    options: { type: Array },
    isPushedByAdmin: { type: Boolean }
})

const teacherSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phno: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    subjects: { type: Array }
})

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phno: { type: String, required: true, unique: true },
    semester: { type: Number, required: true },
})

const adminSchema = mongoose.Schema({
    aid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActingAdmin: { type: Boolean, default: false }
})

const questionCollection = new mongoose.model("questionCollection", questionPatternSchema);
const teacherCollection = new mongoose.model("teacherCollection", teacherSchema);
const studentCollection = new mongoose.model("studentCollection", studentSchema);
const adminCollection = new mongoose.model("adminCollection", adminSchema);

module.exports = { questionCollection, teacherCollection, studentCollection, adminCollection };