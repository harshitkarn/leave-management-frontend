import Navbar from "./components/Navbar"
import LeftMenu from "./components/Leftmenu";
import { useEffect, useState } from "react";
import { Routes,Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Leave from "./pages/Leave";
import Projects from "./pages/Projects";
import CurrentPageContext from "./Context/CurrentPageContext";
import { Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { toast, ToastContainer } from "react-toastify";
import ToastContext from "./Context/ToastContext";
import loadingImg from './img/loading.gif'
import gears from './img/gears.gif'

export default function App6(){
    const [leftMenuOpen,setLeftmenuopen] = useState(false);
    function openLeftMenu(){
        setLeftmenuopen(!leftMenuOpen)
        console.log("mkmk",toast.TYPE.WARNING)
    }

    function toastEmit(message,typeOfToast){
        toast(message,{type:typeOfToast})
    }

    function closeLeftMenu(){
        setLeftmenuopen(false)
    }
    var login = false;
    const [currPageIndex,setCurrPageIndex] = useState(0);
    function setCurrentPageIndex(index){
        setCurrPageIndex(index);
    }
    if(localStorage.getItem("loginDetails")){
        login = true
    }
    const navigate = useNavigate()
    function logoutHandler(){
        localStorage.removeItem("loginDetails")
        toastEmit('Logged out Successfully','success')
        navigate('/')
    }

    const [serverStatus,setServerStatus] = useState(true)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        fetch('http://localhost:5000/getServerStatus')
        .then(response=>{return response.json()})
        .then((data)=>{
            if(!data[0]){
                console.log('Database Error')
                setServerStatus(false)
            }
            setLoading(false)
        }).catch(error=>{
            console.log("Internal Server Error")
            setServerStatus(false)
            setLoading(false)
        })
    },[])
    

    {if(loading)return<div className="min-h-screen flex flex-col justify-around"><img className="h-20 w-20 mx-auto" src={loadingImg} alt="loading..." /></div>}
    
    {if(!serverStatus)return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <img className="h-40 w-40 mx-auto" src={gears} alt="loading..." />
            <h1 className="text-3xl font-bold text-neutral-700">Website under Maintainance</h1>
        </div>
    )}

    return (
        <CurrentPageContext.Provider value={{currentPageIndex:currPageIndex,setCurrentPageIndex:setCurrentPageIndex}}>
            <ToastContext.Provider value={{toastEmit:toastEmit}}>
                <Navbar onclick={openLeftMenu} isLeftMenuOpen={leftMenuOpen} isLogin={login} onLogoutClick={logoutHandler} />
                <LeftMenu isLeftOpen={leftMenuOpen} onclick={closeLeftMenu} />
                <ToastContainer />
                <div className="py-16 w-[96.3%] ml-[3.7%] bg-neutral-100 min-h-screen" onClick={closeLeftMenu}>
                    <div className='flex justify-end bg-neutral-100 sm:hidden'>
                        {login?<button onClick={logoutHandler} className="p-2 rounded bg-blue-300 m-2 hover:bg-blue-200 duration-200">Logout</button>:(<><Link className="p-2 rounded bg-blue-300 m-2 hover:bg-blue-200 duration-200" to='/login'>Login</Link>
                        <Link className="p-2 rounded bg-blue-300 m-2 hover:bg-blue-200 duration-200" to='/signup'>Signup</Link></>)}
                    </div>
                    <Routes>
                        <Route path="/" element={<Home id={0} />} />
                        <Route path="/about" element={<About id={1} />} />
                        <Route path="/careers" element={<Careers id={2} />} />
                        <Route path="/leave" element={<Leave id={3} />} />
                        <Route path="/projects" element={<Projects id={4} />} />
                        <Route path="/signup" element={<Signup id={5} />} />
                        <Route path="/login" element={<Login id={6} />} />
                    </Routes>
                </div>
            </ToastContext.Provider>
        </CurrentPageContext.Provider>
    )
}