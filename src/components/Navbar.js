import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
export default function Navbar(props){
    return (
        <div className="top-0 fixed w-full bg-neutral-50 flex justify-between items-center z-10 border-neutral-300 border-solid border-b">
            <div className='p-0.4 m-0 hover:bg-neutral-200 cursor-pointer duration-200' onClick={props.onclick}>{props.isLeftMenuOpen?<CloseIcon className='mx-[1rem] my-[1.1rem]' />:<MenuIcon className='mx-[1rem] my-[1.1rem]'/>}</div>
                
            <Link className="p-4 font-bold text-xl hover:bg-neutral-200 duration-200" to="/">Agathsya Technologies</Link>
            
            <div className='hidden sm:block'>
                {props.isLogin?(<button className="p-2 rounded bg-blue-300 m-2 hover:bg-blue-200 duration-200" onClick={props.onLogoutClick}>Logout</button>):
                (<><Link className="p-2 rounded bg-blue-300 m-2 hover:bg-blue-200 duration-200" to='/login'>Login</Link>
                <Link className="p-2 rounded bg-blue-300 m-2 hover:bg-blue-200 duration-200" to='/signup'>Signup</Link></>)}
            </div>
        </div>
    )
}