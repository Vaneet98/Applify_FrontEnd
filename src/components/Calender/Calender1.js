import React from 'react'
import SideBar from "../Sidebar/SideBar"
import SchedulerCalendar from 'scheduler-calendar'
import 'scheduler-calendar/dist/index.css'

const Calender1 = () => {
    return (
        <>
        <SideBar/>
        <div
        className="container-fluid"
        style={{
          padding: "40px",
          marginLeft: "190px",
          marginTop:"-60px",
        //  background:"lightblue"
        }}
      >
        <SchedulerCalendar
                availabilities={[
                  {
                    day: "2022-05-09",
                    slots: [
                      {from: '09:00', to: '10:30'},
                      {from: '11:30', to: '13:00'},
                    ],
                    comment: "Test comment"
                  },
                ]}
                // availabilityType={'infinity'}
                // duration={10}
                // onIntervalChange={() => {}}
                
              />
              </div>
              </>
      )
  };
  
  export default Calender1;
   
