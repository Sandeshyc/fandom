import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
const BackNavigation = (
    inputProps: any
) => {
    const {data} = inputProps
    console.log('data', data);
    const router = useRouter();
    const [mouseActive, setMouseActive] = useState(true);
    const [backBtnActive, setBackBtnActive] = useState(false);
    let timeout: NodeJS.Timeout;
    const onMouseMove = () => {
        clearTimeout(timeout);        
        setMouseActive(true);
        timeout = setTimeout(() => {
            setMouseActive(false);
        }, 3000);
    }
    const handleBack = () => {
        if(!backBtnActive){
          router.back();
          setBackBtnActive(true);
        }
    }
    return null;
    return (
        <>
        <div className="h-screen w-screen bg-black flex items-center" onMouseMove={onMouseMove}>
            {(mouseActive) && (<nav className={`fixed w-full p-4 z-50 top-1 flex flex-row items-center gap-8 bg-opacity-70 transition-opacity ease-in duration-700 ${(backBtnActive)?'opacity-50':'opacity-100'} videoPageNav`}>
                <ArrowLeftIcon 
                    onClick={handleBack} 
                    className={`w-8 md:w-12 text-white ${(backBtnActive)?'cursor-wait':'cursor-pointer'} hover:opacity-80 transition border-2 border-blue-500 rounded-full p-1`} 
                    />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>)}
        </div>
        </>
    )
}
export default BackNavigation;