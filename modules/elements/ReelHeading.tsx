import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
type Props = {
    title: string;
    link?: string;
    linkText?: string;
};

const ReelHeading: React.FC<Props> = ({ title, link, linkText }) => {
    const router = useRouter();
    return (
        <div className='flex items-center font-poppins'>
          <p className="text-white text-[24px] font-medium mb-4 mr-2">{title}</p>
          {(link)?<p className="text-[#0094FF] text-[16px] font-regular mb-4 cursor-pointer"
            onClick={() => router.push(link)}
          >{(linkText)?linkText:'Explore All'} <ChevronRightIcon
            className="inline-block w-4 h-4 text-[16px]" /></p>:null}
        </div>
    );
}

export default ReelHeading;