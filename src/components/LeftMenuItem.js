import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentPageContext from "../Context/CurrentPageContext";

export default function LeftMenuItem(props){
    const {currentPageIndex} = useContext(CurrentPageContext);
    var bg = currentPageIndex===props.id?'bg-neutral-300':'';
    return(
        <Link to={props.link}>
            <div className={'hover:bg-neutral-200 pb-4 duration-100 cursor-pointer '+bg}>
                <div className={'p-4 pb-0 flex allign-center'} onClick={props.onclick}>
                    {props.icon}
                    <p>{props.linkName}</p>
                </div>
                {!props.isLeftOpen&&<div className='text-xs text-center'>{props.linkName}</div>}
            </div>
        </Link>
    )
}