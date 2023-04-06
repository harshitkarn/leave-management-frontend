import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Header(){
    return(
        <div className="text-center text-neutral-400">
            <h1 className="sm:text-[40px] md:text-[50px] lg:text-[60px] text-[20px] font-black mt-20">Agathsya Technologies</h1>
            <hr className="w-4/6 my-4 mx-auto" />
            <p className='font-bold w-1/2 mx-auto'>Agathsya Technologies, founded in 2016, provides innovative software solutions for your digital transformation journey.</p>
            <div className='flex space-x-6 w-max mx-auto my-10'>
                <a href='https://linkedin.com' target='_blank' rel='noreferrer'><LinkedInIcon className='hover:text-neutral-600 scale-125' /></a>
                <a href='https://fb.com' target='_blank' rel='noreferrer'><FacebookIcon className='hover:text-neutral-600 scale-125' /></a>
                <a href='https://twitter.com' target='_blank' rel='noreferrer'><TwitterIcon className='hover:text-neutral-600 scale-125' /></a>
            </div>
        </div>
    )
}