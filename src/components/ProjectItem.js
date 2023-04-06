import Photos from "./Photos";

export default function ProjectItem(){
    return(
        <div className="bg-neutral-50 shadow-2xl cursor-pointer hover:scale-105 duration-300 shadow-neutral-400 p-4 rounded">
            <p className="w-max bg-pink-600 text-neutral-50 px-1 rounded">REACT PROJECT</p>
            <h1 className="font-bold text-3xl">Movie Knight - A movie Catalog React App</h1>
            <p className="font-bold mt-8">Ongoing Work</p>
            <ul className="list-disc ml-8">
                <li className="marker:text-red-400">Design UI page for master page</li>
                <li className="marker:text-blue-400">Design UI for components</li>
                <li className="marker:text-red-400">Fixing Bug #14</li>
            </ul>
            <p className="ml-4 text-sm text-neutral-600 hover:underline cursor-pointer">+15 more</p>
            <h2 className="font-bold mt-8">Team</h2>
            <Photos />
        </div>
    )
}