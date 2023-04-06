import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import CurrentPageContext from "../Context/CurrentPageContext";
import { useNavigate } from "react-router-dom";

export default function Login(props){
    const navigate = useNavigate()
    if(localStorage.getItem("loginDetails")){
        navigate('/')
    }
    const {setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)
    return <LoginForm />
}