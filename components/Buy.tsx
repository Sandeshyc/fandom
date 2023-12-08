import React, {useEffect, useState, useRef} from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { stableKeys } from '@/utils/stableKeys';
import { capFirstLetter } from '@/utils/capFirstLetter';
import {
  PurchaseCardCurveIcon
} from '@/utils/CustomSVGs';

interface PlayButtonProps {
  movieId: string;
  allowedPlans: any;
  messages?: any;
  allowed?: boolean;
  data: any;
}

const Buy: React.FC<PlayButtonProps> = ({ 
  movieId, 
  allowedPlans,
  messages,
  allowed,
  data
}:PlayButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('s');
  // const myElementRef = useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // URLSearchParams perchasePlan 
    const urlParams = new URLSearchParams(window?.location?.search);
    if(urlParams?.get('viewPlan') === 'true' && (Array.isArray(allowedPlans) && allowedPlans.length > 0)){
      setTimeout(() => {
        setOpen(true);
      }, 1000);
    }
  }, [allowedPlans]);

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  // useEffect(() =>{
  //   const clientHeight = myElementRef.current.clientHeight;
  //   console.log('Client Height:', clientHeight);
  // }, []);


  return (
    <div>      
        {(allowed !== true && Array.isArray(messages) && messages?.length) ?  (<button
        disabled={true}
        className=" bg-yellow-500 text-black rounded-md py-1 md:py-1 px-3 md:px-6 cursor-not-allowed w-auto text-base lg:text-xl font-semibold flex flex-row items-center
        transition h-[36px] xl:h-[42px] xxl:h-[48px]">
          <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
          Buy / Rent
        </button>): <button 
        onClick={handleClickOpen}
        className="
        bg-gradient-to-r from-blue-700 to-blue-500
        text-white
        rounded-full 
        py-1
        px-3
        w-[220px]
        text-base
        flex
        flex-row
        justify-center
        items-center
        transition
        h-[44px]
        ">Rent</button>}
<Modal
  open={open}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  onClose={handleClose}
  className='flex justify-center items-center'>
    <div className='border-[3px] border-[#262626] rounded-md  bg-opacity-[100%] w-[90%] max-w-[1200px] bg-[#1A1A1A]  px-[20px] py-[30px] relative max-h-[90%]'>
      <button
      onClick={handleClose}
      className='absolute top-0 right-0 text-white text-4xl px-2 py-1'>
        &times;
      </button>
      {(Array.isArray(allowedPlans) && allowedPlans?.length > 0) ? (<PlanItems 
        movieId={movieId}
        items={allowedPlans}
        data={data}
        />):(<NoPlanFound/>)}
  </div>
</Modal>
    </div>
  );
}
export default Buy;

const PlanItems = ({
  items,
  movieId,
  data
}:any) => {
  let thumbURl = data?.thumbnailPotrait;
  if(!thumbURl){
    thumbURl = data?.thumbnailUrl;
  }
return (<>
  <div 
    className='
    text-white
    mb-2
    w-full'>
    <h3 className='text-xl md:text-2xl font-semibold font-poppins'>Choose Your Plan</h3>
  </div>
  <div className='bg-[#0F0F0F] text-white p-4 border-[3px] border-[#262626] rounded-md mb-6 flex flex-wrap items-center'>
    <div className='mr-2 w-[80px]'>
      <img src={thumbURl} alt={data?.title} className='w-[72px] rounded-md aspect-[6/9] object-cover'/>
    </div>
    <div className='flex-grow flex flex-wrap w-[200px]'>
      <div className='w-full flex'>
        <div className='mr-6'>
          <p className="font-medium text-3xl">{data?.title || "upcoming..."}</p>
        </div>
        <div className='flex flex-row items-center gap-2 mr-6'>
          <p className="leading-normal py-1 px-2 text-sm font-medium text-white/80 rounded-md border border-white/80">U/A</p>
          <p className="text-sm font-medium text-white/80">{data?.duration} </p>
        </div>
        {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80">
          {capFirstLetter(itemTxt)}
        </span>)}</div>:null} 
      </div>
      <div className='w-full'>
        {(data?.description) && <p className="font-normal	text-sm mb-2 text-white/80 line-clamp-2">{data?.description}</p>}
      </div>
    </div>
  </div>
  <div className='flex flex-wrap justify-center  w-full overflow-y-auto overflow-x-hidden max-h-[60vh]
  h-full planListsWrapper'>
    {items?.map((item, index)=>{
      return (<PlanCard 
        item={item}
        movieId={movieId}
        key={stableKeys[index]}
        />)
    })}
  </div>
  {/* <p className='text-white/80 text-xs my-2 text-center'>This gives you access for 48 hrs. starting Nov 20, 10:00AM PH/Manila time.</p> */}
  </>)
}

const PlanCard = ({
  item,
  movieId
}:any) => {
  // console.log('item', item);
  let descriptions = [];
  if(item?.description){
    // replace all , with <li>
    descriptions = [...item?.description?.split(',')];
  }
  const goPurchase = (productId:string) => {
    const userInfor = localStorage.getItem('userInfo');
    if(userInfor){
      const userInfo = JSON.parse(userInfor);
      const {sub} = userInfo;
      if(sub){
        // const forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_PAYMENT_URI}?userid=${sub}&productId=${productId}`;
        // check if env is production Or development
        const entitleCall = async () => {
          const transactionId = uuidv4();
          const headers = {
              'Content-Type': 'application/json',
          };      
          const data = {
              "userID": sub,
              "itemCode": movieId,
              "pricePlan": productId,
              "transactionId": transactionId
          };
          console.log('Data:', data);
          await axios.post(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/entitlement/audit/`, data, { headers })
              .then(response => {
              if(response.status === 200) {
                if(process.env.NODE_ENV === 'production'){
                  // window.open(`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}`, '_blank');
                  window.location.href = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}`;
                }
                if(process.env.NODE_ENV === 'development'){
                  // window.open(`${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}&env=dev`, '_blank');
                  window.location.href = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}&env=dev`;
                }
              }
              console.log('Success:', response);
          })
          .catch(error => {
              console.error('Error:', error);
          }); 
      }
      entitleCall();
        
      }
    }
  }
  return (<>
    <div className='text-white px-6 flex flex-col flex-wrap'>
      <div className='bg-[#0F0F0F] flex-grow w-[280px] rounded-md overflow-hidden py-4 px-2 border-2 border-b-0 border-[#262626]'>
        <div className='text-xl font-semibold mb-4'>{item?.name}</div>
        <div className='text-white text-base text-left'>
          {/* <p className='mb-1 text-white/60 text-sm'>Ticket Details:</p> */}
          <ul className='list-disc list-inside ml-2'>{
            descriptions?.map((desc, index)=>{
              return (<li key={stableKeys[index]}
                className='text-sm mb-1 last:mb-0 font-light'
              >{desc}</li>)
            })
            }</ul>
        </div>  
      </div>
      <div className="g-container">
          <div className='g-containerInner'>
          <img src={'/images/purchaseCurve.png'} alt={'Plan'} className="w-[270px]"/>
          </div>
      </div>
      <div className='bg-[#0F0F0F] w-[280px] overflow-hidden rounded-md  py-4 px-2 border-2 border-t-0 border-[#262626]'>
        <p className='mb-0 text-white/60 text-sm'>Price:</p>
        <p className='mb-4'>
            <span className='text-white text-[32px] font-medium'
            >{item?.price}</span>
          </p>
          {(item?.bought)?(<><button
          className="
          bg-transparent
          border border-blue-500
          text-white
          rounded-[10px] 
          cursor-not-allowed
          flex
          flex-row
          justify-center
          items-center
          py-2 
          px-3 md:px-6
          w-full 
          font-light
          text-[16px]">
            Purchased           
          </button></>):(<><button 
          onClick={
            ()=>goPurchase(item?.priceSKU)
          }
          className="
          bg-gradient-to-r from-[#1E80FC] from-10%  to-[#2D45F2] to-55%
          text-white
          rounded-[50px] 
          flex
          flex-row
          justify-center
          items-center
          py-2 
          px-3 md:px-6
          font-light
          w-full 
          text-[16px]">Rent            
          </button></>)}
      </div>
    </div></>
  )
}

const NoPlanFound = () => {
  return (
    <div 
      className='
      text-white 
      text-xl 
      md:text-2xl 
      lg:text-2xl 
      font-semibold 
      mx-auto 
      lg:pl-6 
      w-[250px] 
      min-h-[200px]
      flex
      justify-center
      items-center
      border border-blue-500
      bg-blue-500
      bg-opacity-10
      rounded-md
      '>
      Payment is not allowed...
    </div>
  )
}


