import { NavLink,useNavigate} from "react-router-dom";
import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import {
  FaBars,
  FaHome,
  FaUser,
  FaBell,
  FaUserGraduate
} from "react-icons/fa";
import { MdNotifications,MdOutlineSystemUpdateAlt } from "react-icons/md";
import {GoReport} from "react-icons/go";
import { useState } from "react";
import { toast } from "react-toastify";
import Search from "@material-ui/icons/Search";
import { VscMail } from "react-icons/vsc";

import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import SidebarMenu from "./SidebarMenu";
import applify from "./Applify.jpeg"
 

let user = JSON.parse(localStorage.getItem("jwt"));
// let permisionDashboard=user.data.userdetails.dashBoardPermission
// console.log("permisionDashboard",permisionDashboard)  
// let permissionUserManagement=user.data.userdatails.userManagementPermission;
// let permissionAdmin=user.data.userdetails.adminPermission;
// let permissionNotification=user.data.userdetails.NotificationPermission;
// let permissionSytemConfig=user.data.userdetails.systemConfigPermission;
// let permissionReport=user.data.userdetails.reportPermission

  
// console.log("This is sidebar ciikiiikk i",usersss)
const routes = [
      
  // permisionDashboard  ?
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  }
  // : {    
  //   path: "/welcome"
  // }
  , 
  // permissionUserManagement ?
  {
    path: "/usersManagement",
    name: "User Management",
    icon: <FaUser />,
  }
  // :
  // {}
  ,
  // permissionAdmin?
  {
    path: "/admin",
    name: "Admin",
    icon: <FaUserGraduate />,
  }
  // :{}
  ,
  // permissionNotification ?
  {
    path: "/notification",
    name: "Notification",
    icon: <MdNotifications/>,
  }
  // :{}
  ,
  // permissionSytemConfig ?
  {
    path: "/systemConfig",
    name: "System Configuration",
    icon: <MdOutlineSystemUpdateAlt />,
    subRoutes: [
      {
        path: "/systemConfig/categories",
        name: "Categories",
      },
      {
        path: "/systemConfig/appversion",
        name: "App Versions",
      },
      {
        path: "/systemConfig/adminachievement",
        name: "Admin Achievement",
      },
      {
        path: "/systemConfig/calander",
        name: "Calander Event",
      },
      {
        path: "/systemConfig/chat",
        name: "Chat",
      },
      {
        path: "/systemConfig/comment",
        name: "Comment",
      },
    ],
  }
  // :{}
  ,
  // permissionReport ?
  {
    path: "/reports",
    name: "Report",
    icon: <GoReport />,
    exact: true,
    subRoutes: [
      {
        path: "/reports/reportContent",
        name: "Report Content",
      },
      {
        path: "/reports/reportbug",
        name: "Report Bugs",
      },
    ],
  }
  // :{}
  ,
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  
  const navigate = useNavigate(); 
  let user=JSON.parse(localStorage.getItem("jwt"))
  console.log("User details",user)
    const userimage = user.data.userdetails.image;

 
function LogOut(){
  localStorage.clear();
  // cookies.remove();
  // removeCookie("user");
  toast.success("LogOut Succesfully",{position: toast.POSITION.TOP_CENTER});
  navigate("/")
}
function gotoProfile() {
    navigate("/profile");
  }
  
  // const [cookies, setCookie] = useCookies(["user"]);
  //  usersss=cookies.email;
  // console.log("This is sidebar ciikiiikk i",usersss)
  return (
    <>  
      <nav className="main-div navbar-static-top">
        <div className="container-fluid topbarLeft">
          <div className="bars" style={{ cursor: "pointer", color: "white" }}>
            <FaBars onClick={toggle} />
          </div>
          <div className="logos"><img src={applify} alt=""style={{width:"140px",marginLeft:"135px"}}/></div>

          {/* <div className="theme">
            <select style={{ outline: "none" }}>
              <option value="">Light</option>
              <option value="">Dark</option>
              <option value="">Coperate</option>
              <option value="">Cosmic</option>
            </select>
          </div> */}
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Search...." className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <VscMail  color="white" />
            </div>
            <div className="topbarIconItem">
              <FaBell  color="white"  />
            </div>
       <div className="topbarIconItem">
              <img
                src={`http://localhost:4001/${userimage}`}
                alt=""
                className="topbarImg"
              />
            </div>
            <Nav>
              <NavDropdown title={user.data.userdetails.name}  id="nav-dropdown" style={{fontSize:"20px"}}>
                <NavDropdown.Item onClick={gotoProfile}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={LogOut}>LogOut</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </div> 
      </nav>

      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "225px" : "85px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 5,
            },
          }}
          className={`sidebar `}
        >
      
          <section className="routes" style={{marginLeft:"10px"}}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              } 

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
 