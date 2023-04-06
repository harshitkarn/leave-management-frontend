import SignupForm from "../components/SignupForm";
import { useContext } from "react";
import CurrentPageContext from "../Context/CurrentPageContext";
import { useNavigate } from "react-router-dom";

export default function Signup(props){
    const navigate = useNavigate()
    if(localStorage.getItem("loginDetails")){
        navigate('/')
    }
    const {setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)

    return <SignupForm />
}