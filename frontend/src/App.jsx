import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./COMPONENTS/homePage";
import TeacherLoginPage from "./COMPONENTS/Teachers/teacherLoginPage.jsx"
import StudentLoginPage from "./COMPONENTS/Students/studentLoginPage.jsx"
import TeacherHomePage from "./COMPONENTS/Teachers/teacherHomePage.jsx";
import ExamCreationPage from "./COMPONENTS/Teachers/examCreationPage.jsx";
import StudentHomePage from "./COMPONENTS/Students/studentHomePage.jsx";
import AttendExamPage from "./COMPONENTS/Students/attendExamPage.jsx";
import AdminLoginPage from "./COMPONENTS/Admin/adminLoginPage.jsx";
import AdminHomePage from "./COMPONENTS/Admin/adminHomePage.jsx";
import StudentEntry from "./COMPONENTS/Admin/studentEntry.jsx";
import TeacherEntry from "./COMPONENTS/Admin/teacherEntry.jsx";
import ShowQuestionPaper from "./COMPONENTS/Admin/showQuestionPaper.jsx";
import ShowStudentList from "./COMPONENTS/Admin/showStudentList.jsx";
import ShowTeacherList from "./COMPONENTS/Admin/showTeacherList.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="teacherLoginPage" element={<TeacherLoginPage />} />
        <Route path="teacherHomePage" element={<TeacherHomePage />} />
        <Route path="examCreationPage" element={<ExamCreationPage />} />
        <Route path="studentLoginPage" element={<StudentLoginPage />} />
        <Route path="studentHomePage" element={<StudentHomePage />} />
        <Route path="attendExamPage" element={<AttendExamPage />} />
        <Route path="adminLoginPage" element={<AdminLoginPage />} />
        <Route path="adminHomePage" element={<AdminHomePage />} />
        <Route path="studentEntry" element={<StudentEntry />} />
        <Route path="teacherEntry" element={<TeacherEntry />} />
        <Route path="showQuestionPaper" element={<ShowQuestionPaper />} />
        <Route path="showStudentList" element={<ShowStudentList/>}/>
        <Route path="showTeacherList" element={<ShowTeacherList/>}/>
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App;