import Form from "../components/Form";
import { useContext, useEffect, useState } from "react";
import CurrentPageContext from "../Context/CurrentPageContext";
import ToastContext from "../Context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function Leave(props){
    const {setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)

    const [leaveDetails,setLeaveDetails] = useState(['',0])
    const { toastEmit } = useContext(ToastContext);
    const navigate = useNavigate()


    useEffect(()=>{
        if(!localStorage.getItem("loginDetails")){
            toastEmit("You need to login first",'error')
            console.log('something')
            navigate('/login')
        }
        else{
            const loginData = JSON.parse(localStorage.getItem("loginDetails"))
            fetch(`http://localhost:5000/getUserByEmailPass/${loginData.email}/${loginData.pwd}`)
                .then(response=>{return response.json()})
                .then(data=>{
                    if(data.length===0){toastEmit("Something went wrong",'error');navigate('/');return}
                    setLeaveDetails([data[0].empId,data[0].leaveTaken])
                })
        }
    },[navigate,toastEmit])
    
    return (
        <>
            <div className="flex items-center sm:flex-row flex-col m-10 justify-between text-xl font-bold text-neutral-400">
                <p>Employee ID : {leaveDetails[0]}</p>
                <p>Leaves Taken : {leaveDetails[1]}</p>
                <p>Leaves Left : {30-leaveDetails[1]<0?0:30-leaveDetails[1]}</p>
            </div>
            <Form />
        </>
    )
}