import React from 'react'
import "./Message.css";


const Message = ({ user, message, classs }) => {
    const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else {
 

        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
