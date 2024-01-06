import React, {useEffect} from 'react';
import axios from 'axios';
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
    const [userId, setUserId] = React.useState('');
    const [isInLish, setIsInLish] = React.useState(data?.isInWatchList);
    const movieId = data?._id;
    const toggleFavorites = async () => {
        const checkUserID = async () => {
          if(!userId) {
            const userInfo = window.localStorage.getItem('userInfo');
            if(userInfo) {
              const userInfoObj = JSON.parse(userInfo);
              if(userInfoObj.sub) {
                setUserId(userInfoObj.sub);
              }
            }
          }
        }
        await checkUserID();
        if (isInLish) {
          const headers = {
            'Content-Type': 'application/json',
          };
          const data = {
            watchList: [movieId],
          };
          let result;
            // Need to Update API URL
          axios.delete(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userId}/watchlist`, { headers, data })
            .then(response => {
              if(response.status === 200) {
                setIsInLish(false);
                result = response.data;
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }else{
          const headers = {
            'Content-Type': 'application/json',
          };      
          const data = {
            watchList: [movieId],
          };
          let result;
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/watchlist`, data, { headers })
            .then(response => {
              if(response.status === 200) {
                setIsInLish(true);
                result = response.data;
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });      
        }
    }

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if(userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }
    }, []);

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
                icon={(isInLish)?<Remove
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
                handelClick={() => {
                    toggleFavorites();
                }}/>
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