import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
type Props = {
    title?: string;
    link?: string;
    linkText?: string;
};

const ReelHeading: React.FC<Props> = ({ title, link, linkText }) => {
    return (<>{(title)?<div className='flex items-center justify-between pr-4 lg:pr-8'>
          <p className="text-white text-xl lg:text-2xl	font-medium mb-1 lg:mb-4 mr-2">{title}</p>
          {(link)?<Link className="text-primary text-[16px] font-regular mb-2 lg:mb-4 cursor-pointer text-shadow-md"
            href={link}>{(linkText)?linkText:'Explore All'} <ChevronRightIcon
            className="inline-block w-4 h-4 text-[16px]" /></Link>:null}
        </div>:null}
    </>);
}

export default ReelHeading;