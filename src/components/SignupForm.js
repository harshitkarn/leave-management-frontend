

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import BadgeIcon from '@mui/icons-material/Badge';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import IconInput from './IconInput';
import IconButton from './IconButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ToastContext from '../Context/ToastContext';
export default function SignupForm(){
    const { toastEmit } = useContext(ToastContext);
    const navigate = useNavigate();
    const [data,setData] = useState({email:'',pwd:'',repwd:'',name:'',empId:''})
    function cancelHandler(){
        navigate('/')
    }
    function changeHandler(event){
        const name = event.target.name;
        const value = event.target.value;
        setData(values => ({...values, [name]: value}))
    }
    function submitHandler(event){
        event.preventDefault()
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim()))){toastEmit('Invalid Email','error');return;}
        if(data.pwd.length<8){toastEmit('Password should be min 8 characters','error');return;}
        if(data.pwd!==data.repwd){toastEmit('Password and confirm password do not match','error');return;}
        if(data.name.trim()===''){toastEmit('Name can\'t be empty','error');return;}
        if(data.empId.trim()===''){toastEmit('Employee Id empty!','error');return;}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:5000/addUser', requestOptions).catch(error=>console.log('ttt',error))
            .then(response => {return response.json()})
            .then((data) => {
                if(data[0]){
                    setData({email:'',pwd:'',repwd:'',name:'',empId:''})
                    toastEmit("Signup Successful",'success')
                    navigate('/login')
                }
                else{toastEmit("Email Id or Employee Id already exists",'error')}
            }).catch(error=>toastEmit("Something went wrong...",'error'))
        }

    return(
        <>
        <ToastContainer />
        <form className='lg:w-1/3 md:w-1/2 sm:w-2/3 w-full m-auto backdrop-blur-3xl sm:px-8 px-16 py-8 shadow-2xl'>
            <h1 className='text-3xl my-6 font-bold text-center'>Sign Up</h1>
            <div className='text-neutral-600'>
                <IconInput icon = {<EmailIcon className='w-full absolute mt-4 ml-1' />} placeHolder="Email ID" ipName='email' values={data} onchanged={changeHandler}  />
                <IconInput icon = {<LockIcon className='w-full absolute mt-4 ml-1' />} placeHolder="Password" ipName='pwd' values={data} onchanged={changeHandler}  />
                <IconInput icon = {<LockResetIcon className='w-full absolute mt-4 ml-1' />} placeHolder="Re-type Password" ipName='repwd' values={data} onchanged={changeHandler} />
                <IconInput icon = {<PersonIcon className='w-full absolute mt-4 ml-1' />} ipName='name' placeHolder="Name" values={data} onchanged={changeHandler} />
                <IconInput icon = {<BadgeIcon className='w-full absolute mt-4 ml-1' />} placeHolder="Employee Id" ipName='empId' values={data} onchanged={changeHandler} />
            </div>
            <div className='flex justify-between my-4'>
                <IconButton onclick={cancelHandler} icon={<CloseIcon className='mr-2' />} btnName='Cancel' color='bg-blue-700' />
                <IconButton onclick={submitHandler} icon={<SendIcon className='mr-2' />} btnName='Submit' color='bg-red-800' />
            </div>
        </form></>
    )
}