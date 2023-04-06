import { useContext } from "react";
import ProjectItem from "../components/ProjectItem";
import CurrentPageContext from "../Context/CurrentPageContext";

export default function Projects(props){
    const {currentPageIndex,setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)
    const arr=[0,0,0,0,0,0,0,0]
    return(
        <div className="grid xl:grid-cols-3 p-8 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:p-8 md:p-12 sm:p-16 min-[100px]:p-16 gap-16">
            {arr.map((item,index)=><ProjectItem key={index} />)}
        </div>
    )
}