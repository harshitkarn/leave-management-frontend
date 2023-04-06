import Header from "../components/Header";
import { useContext } from "react";
import CurrentPageContext from "../Context/CurrentPageContext";

export default function About(props){
    const {currentPageIndex,setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)
    return(
        <>
            <Header />
            <div className="text-center text-neutral-500">
            <h1 className="w-max mx-auto text-[20px] font-black mt-20 mb-4 border-b border-neutral-700">About Us</h1>
            <p className='font-xl sm:w-1/2 mb-3 w-4/6 mx-auto'>Agathsya Technologies, founded in 2016, provides innovative software solutions for your digital transformation journey.</p>
            <p className='font-xl sm:w-1/2 mb-3 w-4/6 mx-auto'>In today’s ever-changing world of technology, you can find a strong partner in Agathsya Technologies to help you navigate the dynamics of the digital era. Our expertise lies in digitization consultancy and we have helped several customers thrive in the digital space. We are a Bengaluru based software services company with a skilled team of development professionals catering to a wide range of software development services.</p>
            <p className='font-xl sm:w-1/2 w-4/6 mx-auto'>Agathsya Technologies, is a knowledge driven organization which strives to provide innovative solutions in today’s ever-changing marketplace.</p>
            </div>
        </>
    )
}