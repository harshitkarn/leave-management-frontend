export default function PhotoItem(props){
    return <img src={props.imgLink} alt='icons' className="h-8 w-8 text-neutral-50 rounded-full border-2 hover:h-10 hover:w-10 duration-100 my-2 hover:my-0 cursor-pointer border-white inline-block -ml-2" />;
}