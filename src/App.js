import { useState } from "react";
import Box1 from "./Components/Box1";
import minus from './data/minus.png'

export default function App(){
    const arr = [0,1,2,3,4,5,6,7,8]
    const [turn,setTurn] = useState(1)
    const [matrix,setMatrix] = useState([0,0,0,0,0,0,0,0,0])
    const [win,setWin] = useState(0)
    const [position,setPosition] = useState(0);
    const results = ["","X won","O won","Draw"]
    const turnArr = ["","X","O"]
    const positionArr = ['','-translate-y-16 -translate-x-[6.5rem]','-translate-x-[6.5rem]','translate-y-16 -translate-x-[6.5rem]','rotate-90 -translate-x-[10.6rem]','rotate-90 -translate-x-[6.5rem]','rotate-90 -translate-x-10','rotate-45 -translate-x-[6.5rem]','-rotate-45 -translate-x-[6.5rem]']

    function checkWin(arr1){

        for(var i=0;i<=6;i+=3){
            if(arr1[i]!==0&&arr1[i]===arr1[i+1]&&arr1[i+1]===arr1[i+2]){
                setPosition(i/3+1)
                return arr1[i];
            }
        }
        for(var m=0;m<3;m++){
            if(arr1[m]!==0&&arr1[m]===arr1[m+3]&&arr1[m+3]===arr1[m+6]){
                setPosition(m+4)
                return arr1[m];
            }
        }
        if(arr1[4]!==0){
            if(arr1[4]===arr1[0]&&arr1[8]===arr1[4]){
                setPosition(7)
                return arr1[4]
            }
            if(arr1[4]===arr1[2]&&arr1[4]===arr1[6]){
                setPosition(8)
                return arr1[4];
            }
        }
        for(var l=0;l<9;l++){
            if(arr1[l]===0)return 0;
        }
        return 3;
    }

    function changeTurn(index){
        const arr1 = [...matrix]
        if(arr1[index]!==0||win!==0)return;
        arr1[index] = turn
        setMatrix(arr1)
        setWin(checkWin(arr1));
        setTurn(3-turn)
    }

    function resetBoard(){
        setTurn(1);
        setMatrix([0,0,0,0,0,0,0,0,0])
        setWin(0)
        setPosition(0)
    }

    return (
        <>
            <div className="grid w-max grid-cols-3 my-10 mx-auto">
                {arr.map((item)=><Box1 key={item} id={item} matrix={matrix} onSuccess={changeTurn} />)}
            </div>
            <p className="text-center text-blue-900 text-3xl font-bold">{win!==0?results[win]:(turnArr[turn]+"'s turn")}</p>
            <div className="text-center mt-8"><button className="bg-red-800 text-neutral-100 px-4 py-2 m-2 rounded hover:bg-red-700" onClick={resetBoard}>Reset</button></div>
            {position!==0&&<img className={"fixed top-[1.9rem] w-52 left-1/2 "+positionArr[position]} src={minus} alt="logo" />}
        </>
    );
}