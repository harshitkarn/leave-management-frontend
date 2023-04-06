import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import IconInput from './IconInput';
import IconButton from './IconButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ToastContext from '../Context/ToastContext';
export default function LoginForm(){
    const { toastEmit } = useContext(ToastContext);
    const navigate = useNavigate();
    const [data,setData] = useState({email:'',pwd:''})
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
        if(data.email.trim()===''||data.pwd.trim()===''){toastEmit("Invalid Email or password",'error');return}
        fetch(`http://localhost:5000/getUserByEmailPass/${data.email}/${data.pwd}`)
        .then(response=>{return response.json()})
        .then(data=>{
            if(data.length===0){toastEmit("Invalid Email or password",'error');return}
            localStorage.setItem("loginDetails",JSON.stringify(data[0]))
            toastEmit("Login Successful",'success')
            setData({email:'',pwd:''})
            navigate('/')
            console.log(data)
        }).catch(err=>toastEmit('Something went wrong...','error'))
    }

    return(
        <>
        <ToastContainer />
        <form className='lg:w-1/3 md:w-1/2 sm:w-2/3 w-full m-auto backdrop-blur-3xl sm:px-8 px-16 py-8 shadow-2xl' onSubmit={(e)=>e.preventDefault()}>
            <h1 className='text-3xl my-6 font-bold text-center'>Login</h1>
            <div className='text-neutral-600'>
                <IconInput icon = {<EmailIcon className='w-full absolute mt-4 ml-1' />} placeHolder="Email ID" ipName='email' values={data} onchanged={changeHandler} />
                <IconInput icon = {<LockIcon className='w-full absolute mt-4 ml-1' />} placeHolder="Password" ipName='pwd' values={data} onchanged={changeHandler} />
            </div>
            <div className='flex justify-between my-4'>
                <IconButton onclick={cancelHandler} icon={<CloseIcon className='mr-2' />} btnName='Cancel' color='bg-blue-700' />
                <IconButton onclick={submitHandler} icon={<SendIcon className='mr-2' />} btnName='Login' color='bg-red-800' />
            </div>
            
        </form></>
    )
}