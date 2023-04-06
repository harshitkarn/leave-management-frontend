import { useState } from "react";
import PhotoItem from "./PhotoItem";

export default function Photos(){
    const [loadedImgs,setLoadedImgs] = useState([])
    fetch('https://picsum.photos/v2/list?page=10&limit=3')
        .then(response => response.json())
        .then(data => {
            const arr = []
            data.map(item=>arr.push(item.download_url))
            setLoadedImgs(arr)
        });
    return(
        <div className="ml-4">
            {loadedImgs.map(item=><PhotoItem key={item} imgLink={item} />)}
            <div className="text-center text-xs h-8 w-8 text-neutral-700 bg-neutral-200 rounded-full border-2 hover:h-10 hover:w-10 duration-100 my-2 py-1 hover:my-0 hover:py-2 cursor-pointer border-white inline-block -ml-2">+5</div>
        </div>
    )
}