import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
const Protected = (props) => {
    const navigate=useNavigate();
    const Cmp=props.Cmp;
    useEffect(()=>{
        if(!localStorage.getItem("jwt")){
          toast.info("You are not logged In",{position: toast.POSITION.BOTTOM_CENTER});
            navigate("/")
        } 
    },[])
  return (
    <div>
      <Cmp/>
    </div>
  )
}

export default Protected
