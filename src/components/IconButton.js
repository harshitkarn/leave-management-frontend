export default function IconButton(props){
    return (<button onClick={props.onclick} className={'rounded text-center w-[49%] '+props.color+' text-neutral-50 opacity-90 duration-100 hover:opacity-100 p-2 hover:scale-105'}>{props.icon}{props.btnName}</button>);
}