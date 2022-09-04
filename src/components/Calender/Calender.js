import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import React from "react";
import "./calander.css";
import SideBar from "../Sidebar/SideBar"
const Calender = () => {
  return (
    <>
    <SideBar/>
    <div className="calander">
      <CalendarComponent ></CalendarComponent>
    </div>
    </>
  );
};

export default Calender;
 