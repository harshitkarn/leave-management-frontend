import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CodeIcon from '@mui/icons-material/Code';
import LeftMenuItem from './LeftMenuItem';

export default function LeftMenu(props){
    var width = props.isLeftOpen?"w-48":"w-14 overflow-hidden"
    const data = [["Home",<HomeIcon className='mr-4' />,''],["About",<InfoIcon className='mr-4' />,'about'],["Careers",<WorkIcon className='mr-4' />,'careers'],["Leave",<EventNoteIcon className='mr-4' />,'leave'],["Projects",<CodeIcon className='mr-4' />,'projects']]
    return(
        <div className={width+" h-full fixed top-[3.75rem] duration-75 left-0 z-20 bg-neutral-50 border-neutral-300 border-solid border-r"}>
            {data.map((item,index)=><>
                <LeftMenuItem key={item[0]} id={index} linkName = {item[0]} icon={item[1]} link={item[2]} onclick={props.onclick} isLeftOpen={props.isLeftOpen} />
                
            </>)}
        </div>
    )
}