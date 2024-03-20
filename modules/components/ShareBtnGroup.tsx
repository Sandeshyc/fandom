import React, {useEffect, useState} from 'react';
import checkAuthentication from '@/utils/checkAuth';
import {
  addToMyList,
  removeFromMyList,
  removeFromWatchingLists,
} from '@/services/api';
import {
    ThumbUpOffAlt,
    Add,
    Remove,
    Download,
    Share,
    Celebration,
} from '@mui/icons-material';
import SocialShare from '@/modules/elements/SocialShare';

type dataProps = {
    data: any;
}
const ShareBtnGroup = ({data}:dataProps) => {
    const [userId, setUserId] = React.useState('');
    const [isInLish, setIsInLish] = React.useState(data?.isInWatchList);
    const movieId = data?._id;
    const [open, setOpen] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    }
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
        let result;
        if (isInLish) {
          result = await removeFromMyList(userId, movieId);
          if(result.status === 'success'){
            setIsInLish(false);
          }
        }else{
          result = await addToMyList(userId, movieId);
          if(result.status === 'success'){
            setIsInLish(true);
          }   
        }
    }

    useEffect(() => {
      const _checkAuthentication = async () => {
        const isAuthenticated = await checkAuthentication();
        setIsAuthenticated(isAuthenticated);
      }
      _checkAuthentication();
        const userInfo = window.localStorage.getItem('userInfo');
        if(userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserId(userInfoObj.sub);
          }
        }
    }, []);

    return (<div className='bg-black py-4 pb-12'>
        <div className="text-white/80 flex justify-center items-end overflow-y-hidden overflow-x-auto relative z-10 border border-white/30 rounded-xl">
            {(isAuthenticated)&&<ShareItem 
              icon={(isInLish)?<Remove
                  sx={{
                      fontSize: 28,
                      color: '#ccc',
                      border: '2px solid #ddd',
                      borderRadius: '50%',
                  }}
              />:<Add
                  sx={{
                      fontSize: 28,
                      color: '#ccc',
                      border: '2px solid #ddd',
                      borderRadius: '50%',
                  }}
              />} 
              label='Watchlist' 
              handelClick={() => {
                  toggleFavorites();
              }}/>}
            
            {(data?._id)?<>
              <ShareItem 
                icon={<Share
                    sx={{
                        fontSize: 28,
                        color: '#ccc',
                    }}
                />}
                label='Share' 
                handelClick={handleToggle}/>
                  
                  <SocialShare 
                      open={open}
                      setOpen={setOpen}
                      url={`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/details/${data?._id}`}
                      title={data?.title}
                  />
              </>:null}
        </div>
    </div>);
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