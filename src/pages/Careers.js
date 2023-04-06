import { useContext } from "react";
import CareerForm from "../components/CareerForm";
import CurrentPageContext from "../Context/CurrentPageContext";

export default function Careers(props){
    const {currentPageIndex,setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)
    return <CareerForm />
}