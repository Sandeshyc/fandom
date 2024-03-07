import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
type Props = {
    title?: string;
    link?: string;
    linkText?: string;
};

const ReelHeading: React.FC<Props> = ({ title, link, linkText }) => {
    const router = useRouter();
    return (<>{(title)?<div className='flex items-center'>
          <p className="text-white text-xl lg:text-2xl	font-medium mb-1 lg:mb-4 mr-2">{title}</p>
          {(link)?<Link className="text-[#0094FF] text-[16px] font-regular mb-2 lg:mb-4 cursor-pointer"
            href={link}
          >{(linkText)?linkText:'Explore All'} <ChevronRightIcon
            className="inline-block w-4 h-4 text-[16px]" /></Link>:null}
        </div>:null}
    </>);
}

export default ReelHeading;