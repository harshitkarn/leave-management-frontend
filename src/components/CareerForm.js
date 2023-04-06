import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import IconInput from './IconInput';
import IconButton from './IconButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ToastContext from '../Context/ToastContext';
export default function CareerForm(){
    const { toastEmit } = useContext(ToastContext);
    const navigate = useNavigate();
    const [data,setData] = useState({name:'',email:'',phone:'',age:'',city:'',college:'',qual:''})
    function changeHandler(event){
        const name = event.target.name;
        const value = event.target.value;
        setData(values => ({...values, [name]: value}))
        console.log(name,value)
    }
    function cancelHandler(){
        navigate('/')
    }
    function submitHandler(event){
        event.preventDefault()
        if(data.name.trim()===''||data.city.trim()===''||data.college.trim()===''){toastEmit('All fields are required','error');return;}
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim()))){toastEmit('Invalid Email','error');return;}
        if(!(/^[6-9][0-9]{8}[0-9]$/.test(data.phone.trim()))){toastEmit('Invalid Phone','error');return;}
        const age = parseInt(data.age)
        console.log(age)
        if(isNaN(age)||age<18||age>100){toastEmit('Invalid Age','error');return;}
        if(data.qual===''){toastEmit('Please select a qualification','error');return;}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:5000/addCareer', requestOptions)
            .then(response => response.json())
            .then(data1 => {
                setData({name:'',email:'',phone:'',age:'',city:'',college:'',qual:''})
                toastEmit("Submitted Successfully",'success')
                navigate('/')
            }).catch(error=>toastEmit("Something went wrong",'error'))
        console.log(data)
    }

    return(
        <>
        <form className='lg:w-1/3 md:w-1/2 sm:w-2/3 w-full m-auto backdrop-blur-3xl sm:px-8 px-16 py-8 shadow-2xl'>
            <h1 className='text-3xl my-6 font-bold text-center'>Career Form</h1>
            <div className='text-neutral-600'>
                <IconInput icon = {<PersonIcon className='w-full absolute mt-4 ml-1' />} ipName='name' placeHolder="Name" values={data} onchanged={changeHandler} />
                <IconInput icon = {<EmailIcon className='w-full absolute mt-4 ml-1' />} ipName='email' placeHolder="Email ID" values={data} onchanged={changeHandler} />
                <IconInput icon = {<LocalPhoneIcon className='w-full absolute mt-4 ml-1' />} ipName='phone' placeHolder="Phone No" values={data} onchanged={changeHandler} />
                <IconInput icon = {<CalendarMonthIcon className='w-full absolute mt-4 ml-1' />} ipName='age' placeHolder="Age" values={data} onchanged={changeHandler} />
                <IconInput icon = {<LocationCityIcon className='w-full absolute mt-4 ml-1' />} ipName='city' placeHolder="City" values={data} onchanged={changeHandler} />
                <IconInput icon = {<BusinessIcon className='w-full absolute mt-4 ml-1' />} ipName='college' placeHolder="College" values={data} onchanged={changeHandler} />
                <div>
                    <SchoolIcon className='w-full absolute mt-4 ml-1' />
                    <select className='resize-none p-1 rounded my-2 py-2 border border-black border-solid w-full pl-8' name='qual' value={data.qual} onChange={changeHandler} >
                        <option disabled value=''>Qualification</option>
                        <option value='BE/B.Tech'>BE/B.Tech</option>
                        <option value='ME/M.Tech'>ME/M.Tech</option>
                        <option value='BCA'>BCA</option>
                        <option value='MCA'>MCA</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-between my-4'>
                <IconButton onclick={cancelHandler} icon={<CloseIcon className='mr-2' />} btnName='Cancel' color='bg-blue-700' />
                <IconButton onclick={submitHandler} icon={<SendIcon className='mr-2' />} btnName='Submit' color='bg-red-800' />
            </div>
        </form></>
    )
}