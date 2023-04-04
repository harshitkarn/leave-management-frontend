import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook, faEnvelope, faChessKnight, faChessBishop, faChessKing, faChessQueen, faChessPawn } from "@fortawesome/free-solid-svg-icons"
import Square from './components/Square'
import { useState } from 'react'

export default function App(){
    const addl = ['White','Black']
    const status = Array(64).fill('')
    const indices = [0,7,56,63]
    const items = [<FontAwesomeIcon icon={faChessRook} />,<FontAwesomeIcon icon={faChessKnight} />,<FontAwesomeIcon icon={faChessBishop} />]
    const itemNames = ['rook','knight','bishop']
    const statusNames = Array(64).fill('')
    const colorsAll = Array(64).fill('')
    for(var k=48;k<64;k++)colorsAll[k]='text-neutral-50'
    for(var i=0;i<3;i++){
        indices.map(item=>{
            if(item%2===0){
                status[item+i]=items[i]
                statusNames[item+i] = itemNames[i]
            }
            else{
                status[item-i]=items[i]
                statusNames[item-i] = itemNames[i]
            }
        })
    }
    status[3] = <FontAwesomeIcon icon={faChessQueen} />
    status[59] = status[3];
    statusNames[3] = 'queen'
    statusNames[59] = statusNames[3]
    status[4] = <FontAwesomeIcon icon={faChessKing} />
    status[60] = status[4]
    statusNames[4] = 'king'
    statusNames[60] = statusNames[4]
    for(var v=8;v<16;v++){
        status[v] = <FontAwesomeIcon icon={faChessPawn} />
        status[63-v] = status[v]
        statusNames[v] = 'pawn'
        statusNames[63-v] = 'pawn'
    }
    const [statusState,setStatusState] = useState(status);
    const [statusNamesState,setStatusNamesState] = useState(statusNames)
    const [colorsAllStatus,setColorAllStatus] = useState(colorsAll)
    const [movesAvl,setMovesAvl] = useState([])
    const [turn,setTurn] = useState(0)
    const [isFocused,setIsFocused] = useState(-1)
    const [attackPos,setAttackpos] = useState([])
    const rows = Array(8).fill(0)
    const cols = Array(8).fill(0)
    const [win,setWin] = useState(-1)
    
    function reloadData(){
        setStatusState(status)
        setStatusNamesState(statusNames)
        setColorAllStatus(colorsAll)
        setMovesAvl([])
        setTurn(0)
        setIsFocused(-1)
        setAttackpos([])
        setWin(-1)
    }

    function checkMove(index){
        if(win!==-1)return
        const statusName = statusNamesState[index];
        if(statusName===''&&isFocused===-1)return
        const possibleMoves = [];
        const attPos = []
        if(isFocused!==-1){
            if(movesAvl.includes(index)||attackPos.includes(index)){
                const newStatus = [...statusState]
                const newStatusNames = [...statusNamesState]
                const newColor = [...colorsAllStatus]
                if(statusNamesState[index]=='king')setWin(turn)
                newStatus[index] = statusState[isFocused]
                newStatusNames[index] = statusNamesState[isFocused]
                newColor[index] = colorsAllStatus[isFocused]
                newStatus[isFocused] = ''
                newStatusNames[isFocused] = ''
                newColor[isFocused] = ''
                setStatusState(newStatus)
                setStatusNamesState(newStatusNames)
                setColorAllStatus(newColor)
                setMovesAvl([])
                setTurn(1-turn)
                setIsFocused(-1)
                setAttackpos([])
                return
            }
            else{
                setMovesAvl([])
                setIsFocused(-1)
                setAttackpos([])
                return
            }
        }
        if(statusName==='pawn'){
            if(colorsAllStatus[index]==='text-neutral-50'){
                if(turn===1)return
                if(statusNamesState[index-8]==='')possibleMoves.push(index-8)
                if(index>=48&&index<=55&&statusNamesState[index-16]==='')possibleMoves.push(index-16)
                if(index%8===0&&statusNamesState[index-7]!==''&&colorsAllStatus[index-7]==='')attPos.push(index-7)
                if(index%8===7&&statusNamesState[index-9]!==''&&colorsAllStatus[index-9]==='')attPos.push(index-9)
                if(index%8<7&&index%8>0){
                    if(statusNamesState[index-7]!==''&&colorsAllStatus[index-7]==='')attPos.push(index-7)
                    if(statusNamesState[index-9]!==''&&colorsAllStatus[index-9]==='')attPos.push(index-9)
                }
            }
            else{
                if(turn===0)return
                if(statusNamesState[index+8]==='')possibleMoves.push(index+8)
                if(index>=8&&index<=15&&statusNamesState[index+16]==='')possibleMoves.push(index+16)
                if(index%8===0&&statusNamesState[index+9]!==''&&colorsAllStatus[index+9]!=='')attPos.push(index+9)
                if(index%8===7&&statusNamesState[index+7]!==''&&colorsAllStatus[index+7]!=='')attPos.push(index+7)
                if(index%8<7&&index%8>0){
                    if(statusNamesState[index+7]!==''&&colorsAllStatus[index+7]!=='')attPos.push(index+7)
                    if(statusNamesState[index+9]!==''&&colorsAllStatus[index+9]!=='')attPos.push(index+9)
                }
            }
        }
        else if(statusName==='rook'||statusName==='bishop'||statusName==='queen'){
            if(colorsAllStatus[index]==='text-neutral-50'&&turn===1)return
            if(colorsAllStatus[index]===''&&turn===0)return
            if(statusName!=='bishop'){
                const rem = index%8;
                const leftLim = (Math.floor(index/8))*8
                const rightLim = leftLim+7
                const topLim = rem;
                const bottomLim = 56+rem;
                for(var i=index+1;i<=rightLim;i++){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
                for(var i=index-1;i>=leftLim;i--){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
                for(var i=index-8;i>=topLim;i-=8){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
                for(var i=index+8;i<=bottomLim;i+=8){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
            }
            if(statusName!=='rook'){
                var leftTop=index,rightBtm=index,leftBtm=index,rightTop=index;
                if(index%8!==0)for(var i=index-9;i>=-30;i-=9){
                    if(i%8==0||i<8){
                        leftTop=i;
                        break;
                    }
                }
                if(index%8!==7)for(var i=index+9;i<=130;i+=9){
                    if(i%8==7||i>55){
                        rightBtm=i;
                        break;
                    }
                }
                if(index%8!==7)for(var i=index-7;i>=-30;i-=7){
                    if(i%8==7||i<8){
                        rightTop=i;
                        break;
                    }
                }
                if(index%8!==0)for(var i=index+7;i<=130;i+=7){
                    if(i%8==0||i>55){
                        leftBtm=i;
                        break;
                    }
                }
                console.log(leftTop,rightBtm,leftBtm,rightTop)
                for(var i=index+9;i<=rightBtm;i+=9){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
                for(var i=index-9;i>=leftTop;i-=9){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
                for(var i=index-7;i>=rightTop;i-=7){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
                for(var i=index+7;i<=leftBtm;i+=7){
                    if(statusNamesState[i]!==''){
                        if(colorsAllStatus[index]!==colorsAllStatus[i])attPos.push(i)
                        break;
                    }
                    possibleMoves.push(i)
                }
            }
        }
        else if(statusName==='king'){
            if(colorsAllStatus[index]==='text-neutral-50'&&turn===1)return
            if(colorsAllStatus[index]===''&&turn===0)return
            const indices = []
            if(index%8!==0){
                indices.push(index-1)
                if(index>7)indices.push(index-9)
                if(index<56)indices.push(index+7)
            }
            if(index>7){
                indices.push(index-8)
                if(index%8!==7)indices.push(index-7)
            }
            if(index%8!==7){
                indices.push(index+1)
                if(index<56)indices.push(index+9)
            }
            if(index<56){
                indices.push(index+8)
            }
            indices.map((item)=>{
                if(statusNamesState[item]!==''){
                    if(colorsAllStatus[index]!==colorsAllStatus[item])attPos.push(item)
                }
                else possibleMoves.push(item)
            })
        }
        else if(statusName==='knight'){
            if(colorsAllStatus[index]==='text-neutral-50'&&turn===1)return
            if(colorsAllStatus[index]===''&&turn===0)return
            const rem = index%8;
            const arrmov = []
            if(index>15&&rem>0)arrmov.push(index-17)
            if(index>8&&rem>1)arrmov.push(index-10)
            if(index>15&&rem<7)arrmov.push(index-15)
            if(index>8&&rem<6)arrmov.push(index-6)
            if(index<48&&rem>0)arrmov.push(index+15)
            if(index<56&&rem>1)arrmov.push(index+6)
            if(index<48&&rem<7)arrmov.push(index+17)
            if(index<56&&rem<6)arrmov.push(index+10)
            arrmov.map((item)=>{
                if(statusNamesState[item]!==''){
                    if(colorsAllStatus[index]!==colorsAllStatus[item])attPos.push(item)
                }
                else possibleMoves.push(item)
            })
        }
        setMovesAvl(possibleMoves)
        setAttackpos(attPos)
        setIsFocused(index)
    }

    return(
        <div className='mt-10'>
            {rows.map((item,indexRow)=><div key={indexRow} className='flex w-max mx-auto'>
                {cols.map((item,indexCol)=>{
                    return <Square key={indexCol} status={statusState} colorsAll={colorsAllStatus} row={indexRow} col={indexCol} movesAvl={movesAvl} focus={isFocused} attackPosn={attackPos} onPress={checkMove} />
                })}
            </div>)}
            <div className='text-center'>
                {win===-1&&<p className='m-2 text-2xl font-bold text-blue-600'>{`${addl[turn]}'s Turn`}</p>}
                {win!==-1&&<p className='m-2 text-2xl font-bold text-red-600'>{`Checkmate! ${addl[win]} Won`}</p>}
                <button className='bg-neutral-300 px-4 py-2 m-3 rounded font-bold hover:bg-neutral-500 hover:text-neutral-200' onClick={reloadData}>Reload</button>
            </div>
        </div>
    )
}