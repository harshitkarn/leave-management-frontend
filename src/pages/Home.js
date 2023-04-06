import { useContext } from 'react';
import Header from '../components/Header';
import CurrentPageContext from '../Context/CurrentPageContext';


export default function Home(props){
    const {currentPageIndex,setCurrentPageIndex} = useContext(CurrentPageContext);
    setCurrentPageIndex(props.id)

    return(
        <Header />
    )
}