import React from 'react';
import {
    ThumbUpOffAlt,
    Add,
    Remove,
    Download,
    Share,
    Celebration,
} from '@mui/icons-material';

type dataProps = {
    data: any;
}
const ShareBtnGroup = ({data}:dataProps) => {
    return (<>
        <div className="text-white/90 flex justify-start pr-4 items-end overflow-y-hidden overflow-x-auto my-8">
            <ShareItem 
                icon={<ThumbUpOffAlt
                    sx={{
                        fontSize: 32,
                        color: '#eee',
                    }}
                />} 
                label='Like' 
                handelClick={() => {}}/>
            <ShareItem 
                icon={(data?.isInWatchList)?<Remove
                    sx={{
                        fontSize: 32,
                        color: '#eee',
                        border: '2px solid #ddd',
                        borderRadius: '50%',
                    }}
                />:<Add
                    sx={{
                        fontSize: 32,
                        color: '#eee',
                    }}
                />} 
                label='Watchlist' 
                handelClick={() => {}}/>
            <ShareItem 
                icon={<Download
                    sx={{
                        fontSize: 32,
                        color: '#eee',
                    }}
                />} 
                label='Download' 
                handelClick={() => {}}/>
            <ShareItem 
                icon={<Share
                    sx={{
                        fontSize: 32,
                        color: '#eee',
                    }}
                />} 
                label='Share' 
                handelClick={() => {}}/>
            <ShareItem 
                icon={<Celebration
                    sx={{
                        fontSize: 32,
                        color: '#eee',
                    }}
                />} 
                label='Watch Party' 
                handelClick={() => {}}/>
        </div>
    </>);
};
export default ShareBtnGroup;

type ShareItemProps = {
    icon: any;
    label: string;
    handelClick: any;    
};
const ShareItem = ({icon, label, handelClick}:ShareItemProps) => {
    return (
        <button className="flex flex-col justify-center items-center py-2 px-4 cursor-pointer min-w-[100px]" 
            onClick={() => {
                handelClick();          
            }}>
            {icon}
            <span className='mt-2 text-xs whitespace-nowrap'>{label}</span>
        </button>
    )
}