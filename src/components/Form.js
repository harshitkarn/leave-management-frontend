import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import IconButton from './IconButton';
import { useNavigate } from 'react-router-dom';
import ToastContext from '../Context/ToastContext';
import { useContext,useState } from 'react';
export default function Form(){
    const { toastEmit } = useContext(ToastContext);
    const [counter,setCounter] = useState(1);
    const [reason,setReason] = useState('')
    const navigate = useNavigate();
    function cancelHandler(){
        navigate('/')
    }
        

    function submitHandler(event){
        event.preventDefault()

        if(reason.trim()===''){toastEmit("Enter some reason...",'error');return;}

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({leave:counter})
        };

        const loginDet = localStorage.getItem('loginDetails')
        if(!loginDet){toastEmit("Something went wrong",'error');return}
        console.log(loginDet)
        const empid = (JSON.parse(loginDet)).empId
        
        fetch(`http://localhost:5000/updateLeaveByEmpId/${empid}`, requestOptions)
            .then(response => {return response.json()})
            .then(data => {
                if(data[0]){
                    toastEmit("Submitted Successfully",'success')
                    addLeave(counter,reason,empid)
                    console.log('this is j')
                    setCounter(1)
                    setReason('')
                    navigate('/leave')
                }
                else{
                    toastEmit("Something went wrong",'error')
                }
            }).catch(error=>toastEmit("Something went wrong",'error'))
    }

    function addLeave(count,reas,empid){
        const date = new Date();
        var currDate = date.getYear()%100
        const arr = [date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes()]

        arr.forEach(item=>{
            currDate*=100
            currDate+=item
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dateTime:currDate,noDays:count,reason:reas,empId:empid})
        };
        fetch('http://localhost:5000/addLeave', requestOptions).catch(error=>console.log('ttt',error))
            .then(response => {return response.json()})
            .then((data) => {
                if(!data[0]){toastEmit("Something went wrong...",'error')}
            }).catch(error=>toastEmit("Something went wrong...",'error'))
    }
    

    function reduceCounter(){
        if(counter>1)setCounter(counter-1)
    }
    function increaseCounter(){
        if(counter<30)setCounter(counter+1)
    }


    return(
        <>
            <ToastContainer />
            <form className='sm:w-1/2 w-5/6 m-auto bg-neutral-200 backdrop-blur-3xl p-8 shadow-2xl'>
                <h1 className='text-3xl my-6 font-bold text-center'>Leave Form</h1>
                <textarea rows='4' className='resize-none p-2 w-full border border-black rounded placeholder:italic' placeholder='Reason for leave...' value={reason} onChange={(e)=>setReason(e.target.value)}></textarea>
                <div className='flex justify-around my-4 items-center w-max mx-auto'>
                    <p className='font-bold mr-4'>No of Days</p>
                    <div className='flex justify-around items-center'>
                        <RemoveIcon onClick={reduceCounter} className='bg-neutral-50 rounded-l scale-125 hover:bg-neutral-300 cursor-pointer' />
                        <p className='px-3 py-1 bg-neutral-50 font-bold border-x border-neutral-300 mx-1'>{counter}</p>
                        <AddIcon onClick={increaseCounter} className='bg-neutral-50 rounded-r scale-125 hover:bg-neutral-300 cursor-pointer' />
                    </div>

                </div>
                <div className='flex justify-between my-4'>
                    <IconButton onclick={cancelHandler} icon={<CloseIcon className='mr-2' />} btnName='Cancel' color='bg-blue-700' />
                    <IconButton onclick={submitHandler} icon={<SendIcon className='mr-2' />} btnName='Submit' color='bg-red-800' />
                </div>
            </form>
        </>
    )
}