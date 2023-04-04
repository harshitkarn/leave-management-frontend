import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Square(props){
    
    const colors = ['bg-neutral-400','bg-neutral-500']
    var colorIndex = ((props.row%2)+(props.col%2))%2;
    const index = props.row*8+props.col;
    var focusColor = props.focus===index?'bg-yellow-400':colors[colorIndex]
    focusColor = props.attackPosn.includes(index)?'bg-red-500':focusColor
    return(
        <span onClick={()=>props.onPress(index)} className={`${props.colorsAll[index]} sm:w-16 sm:h-16 sm:leading-[4rem] sm:text-2xl cursor-pointer w-10 h-10 leading-10 text-xl inline-block text-center ${focusColor}`}>
            {props.status[index]}
            {props.movesAvl.includes(index)&&<span className="opacity-50 text-sm text-center text-yellow-300"><FontAwesomeIcon icon={faCircle} /></span>}
        </span>
    )
}