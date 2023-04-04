import CloseIcon from '@mui/icons-material/Close';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
export default function Box1(props){
    var borderArr = 'border-r-2 border-b-2';
    if(props.id===2||props.id===5)borderArr = 'border-b-2'
    if(props.id===6||props.id===7)borderArr = 'border-r-2'
    if(props.id===8)borderArr=''
    return <div className={"w-16 h-16 border-black p-4 text-neutral-900 hover:bg-neutral-100 cursor-pointer text-center "+borderArr} onClick={()=>props.onSuccess(props.id)}>
        {props.matrix[props.id]===1 && <CloseIcon className='scale-150' />}
        {props.matrix[props.id]===2 && <PanoramaFishEyeIcon className='scale-150' />}
    </div>
}