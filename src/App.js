import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminTable from "./components/Table/AdminTable";
import Notification from "./components/Table/Notification";
import Dashboard from "./pages/Dashboard";
import Mainchart from "./components/Charts/Mainchart";
import Category from "./components/Table/Category";
import AppVersion from "./components/Table/AppVersion";
import UserTable from "./components/Table/UserTable";
import ReportContent from "./components/Table/ReportContent";
import ReportedBugContent from "./components/Table/ReportedBugContent";
import AdminAchivement from "./components/Table/AdminAchivement";
import Calender from "./components/Calender/Calender";
import Formlogin from "./components/loginnnnn/Login";
import ForgetPwd from "./components/loginnnnn/ForgetPwd";
import AdminEdit from "./pages/AdminEdit";
import UserEdit from "./pages/UserEdit";
import Protected from "./components/Protected/Protected";
import Registration from "./components/loginnnnn/Registration";
import AddUser from "./pages/AddUser";
import SideBar from "./components/Sidebar/SideBar"
import ProfilePwd from "./components/Proffile/ProfilePwd";
import AddAppVersion from "./pages/AddAppVersion";
import AppVersionEdit from "./pages/AppVersionEdit";
import SetPassword from "./pages/SetPassword";
import NotificationEdit from "./pages/NotificationEdit";
import AddNotification from "./pages/AddNotification";
import AddAchivement from "./pages/AddAchivement";
import AchivementEdit from "./pages/AchivementEdit";
import AddCategory from "./pages/AddCatagory";
import Chat from "./components/Chat/Chat.js"
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Formlogin/>}/>
          <Route path="/forgetPwd" element={<ForgetPwd/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/reset/:token" element={<SetPassword/>}/>
          <Route path="/dashboard" element={<Protected Cmp={Mainchart}/>} />
          <Route path="/usersManagement" element={<Protected Cmp={UserTable}  />} />
          <Route path="/admin" element={<Protected Cmp= {AdminTable} />} />
          <Route path="/notification" element={<Protected Cmp= {Notification} />} />
          <Route path="/systemConfig/categories" element={<Protected Cmp= {Category} />} />
          <Route path="/systemConfig/appversion" element={<Protected Cmp= {AppVersion} />} />
          <Route path="//systemConfig/chat" element={<Protected Cmp= {Chat} />} />
          <Route path="/systemConfig/reportbug" element={<Protected Cmp= {AppVersion} />} />
          <Route path="/systemConfig/calander" element={<Protected Cmp= {Calender} />} />
          <Route
            path="/systemConfig/adminachievement"
            element={<Protected Cmp= {AdminAchivement} />}
          />
          <Route path="/profile" element={<Protected Cmp={ProfilePwd} />} />
        
          <Route path="*" element={<Protected Cmp= {SideBar} />} />
          <Route path="/reports/reportContent" element={<Protected Cmp= {ReportContent} />} />
          <Route path="/reports/reportbug" element={<Protected Cmp= {ReportedBugContent} />} />
          <Route path="/addAdmin" element={<Protected Cmp= {Dashboard} />} />
          <Route path="/addUser" element={<Protected Cmp= {AddUser} />} />
          <Route path="/addAppVersion" element={<Protected Cmp= {AddAppVersion} />} />
          <Route path="/addNotification" element={<Protected Cmp= {AddNotification} />} />
          <Route path="/addCategory" element={<Protected Cmp= {AddCategory} />} />
          <Route path="/addAdminAchivement" element={<Protected Cmp= {AddAchivement} />} />
          <Route path="/editAdmin/:id" element={<Protected Cmp= {AdminEdit} />} />
          <Route path="/editAdminAchivement/:id" element={<Protected Cmp= {AchivementEdit} />} />
          <Route path="/editUser/:id" element={<Protected Cmp= {UserEdit} />} />
          <Route path="/editAppVersion/:id" element={<Protected Cmp= {AppVersionEdit} />} />
          <Route path="/editNotification/:id" element={<Protected Cmp= {NotificationEdit} />} />

        </Routes>
        <ToastContainer/>
    </Router>
  );
}

export default App;
