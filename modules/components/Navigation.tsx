import React, { useEffect, } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { type } from 'os';

type NavigationProps = {
    template: string;
}
const Navigation = ({
    template
}:NavigationProps) => {
    const [backBtnActive, setBackBtnActive] = React.useState(false);
    const router = useRouter();

    const backBtn = () => {
        if(!backBtnActive){
          router.back();
          setBackBtnActive(true);
        }
    }
    useEffect(() => {
        setBackBtnActive(false);
    }, []);
    
    useEffect(() => {
        setBackBtnActive(false);
    }, [router.query]); 

    return (<nav className={`absolute w-full p-4 z-10 flex flex-row items-center gap-8 transition-opacity ease-in duration-700 ${(backBtnActive)?'opacity-50 cursor-wait':'opacity-100'} videoPageNav`}>
    <ArrowLeftIcon onClick={backBtn} className={`w-8 md:w-12 text-white ${(backBtnActive)?'cursor-wait':'cursor-pointer'} hover:opacity-80 transition border-2 border-blue-500 rounded-full p-1`} />
    <p className={`text-white/80 text-1xl md:text-3xl font-bold ${(backBtnActive)?'cursor-wait':'cursor-pointer'}`} onClick={backBtn}>
      <span className="font-light">Back</span>
    </p>
  </nav>);
  
}
export default Navigation;