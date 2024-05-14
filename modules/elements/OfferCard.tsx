import React from 'react'
type Props = {
  data: any;
};
const OfferCard = ({ data }: Props) => {
    const title = data?.title;
    
    return (
        <div 
        className={`group bg-zinc-900 rounded-md col-span relative movieCard cursor-pointer aspect-[16/9]`} >
            <div className='img relative h-full w-full rounded-md overflow-hidden'>   
                <p className={`text-center min-w-[100px] text-[11px] lg:text-xs py-1 px-2 lg:px-4 w-auto absolute top-0 right-0 z-20 rounded-bl-xl rounded-tr-md shadow-lg bg-gradient-to-l from-orange-700 to-orange-500 text-white/90`}>50% off</p>
                <img src="" className='w-full h-full bg-red-500 !object-cover' alt="Test" />
            </div>
        </div>
    )
}
export default OfferCard;