export default function IconInput(props){
    console.log(props.isTxtAr)
    return(
        <div>
            {props.icon}
            <input required className='rounded p-1 my-2 py-2 border border-black border-solid w-full pl-8' type="text" name={props.ipName} value={props.values[props.ipName]} placeholder={props.placeHolder} onChange={props.onchanged} />
        </div>
    )
}