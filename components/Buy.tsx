import React, {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import { v4 as uuidv4 } from 'uuid';
import { stableKeys } from '@/utils/stableKeys';
import { capFirstLetter } from '@/utils/capFirstLetter';

import {
  auditEntitlement
} from '@/services/api'

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
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('s');
  // const myElementRef = useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // URLSearchParams perchasePlan 
    const urlParams = new URLSearchParams(window?.location?.search);
    if(urlParams?.get('viewPlan') === 'true' && (Array.isArray(allowedPlans) && allowedPlans.length > 0 && !(Array.isArray(messages) && messages?.length))){
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
        className=" cursor-not-allowed bg-gradient-to-r from-blue-700 to-blue-500
        text-white
        rounded-full 
        py-1
        px-3
        w-[100px]
        lg:w-[220px]
        text-base
        flex
        flex-row
        justify-center
        items-center
        transition
        h-[36px] lg:h-[44px]">
          Rent
        </button>): <button 
        onClick={handleClickOpen}
        className="
        bg-gradient-to-r from-blue-700 to-blue-500
        text-white
        rounded-full 
        py-1
        px-3
        w-[120px]
        lg:w-[220px]
        text-base
        flex
        flex-row
        justify-center
        items-center
        transition
        h-[36px] lg:h-[44px]
        active:opacity-65
        ">Rent</button>}
<Modal
  open={open}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  onClose={handleClose}
  className='flex justify-center jkBuyModal'>
    <div className='border-[3px] border-[#262626] rounded-md  bg-opacity-[100%] w-[90%] max-w-[1200px] bg-[#1A1A1A]  px-[20px] py-[30px] relative '>
      <button
      onClick={handleClose}
      className='absolute top-0 right-0 text-white text-4xl px-2 py-1 active:opacity-65'>
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
    <h3 className='text-xl md:text-2xl font-semibold '>Choose Your Plan</h3>
  </div>
  <div className=''>
    <div className='bg-[#0F0F0F] text-white p-4 border-[3px] border-[#262626] rounded-md mb-6 flex flex-wrap items-center'>
      {(thumbURl)?(<div className='mr-2 w-[80px]'>
        <img src={thumbURl} alt={data?.title} className='w-[72px] rounded-md aspect-[6/9] object-cover'/>
      </div>):null}
      <div className='flex-grow flex flex-wrap w-[200px]'>
        <div className='w-full flex flex-wrap'>
          <div className='mr-6'>
            <p className="font-medium text-3xl">{data?.title || ""}</p>
          </div>
          <div className='flex flex-row items-center gap-2 mr-6'>
            {(data?.contentRating)?(<p className="leading-normal py-1 px-2 text-xs font-medium text-white/80 rounded-md border border-white/80">{data?.contentRating}</p>):null}
            {(data?.duration)?(<p className="text-sm font-medium text-white/80">{data?.duration}</p>):null}
          </div>
          {(Array.isArray(data?.genre) && data?.genre?.length > 0)?<div className='popUpGenre flex items-center'>{data?.genre?.map((itemTxt, index) => <span key={stableKeys[index]} className="inline-flex items-center text-sm font-medium mr-2 last:mr-0 text-white/80">
            {capFirstLetter(itemTxt)}
          </span>)}</div>:null} 
        </div>
        <div className='w-full mt-2'>
          {(data?.description) && <p className="font-normal	text-sm mb-2 text-white/80 line-clamp-2">{data?.description}</p>}
        </div>
      </div>
    </div>
    
    <div className={`${items?.length<5 ? 'justify-center' : ''} flex overflow-x-auto planListsWrapper`}>
      {items?.map((item, index)=>{
        return (<PlanCard 
          item={item}
          movieId={movieId}
          isPackage={data?.isPackage}
          key={stableKeys[index]}
          />)
      })}
    </div>
    
  </div>
  </>)
}

const PlanCard = ({
  item,
  movieId,
  isPackage
}:any) => {
  // console.log('item', item);
  let descriptions = [] as any;
  if(item?.description){
    // replace all , with <li>
    descriptions = [...item?.description?.split(',')];
  }
  const router = useRouter();
  const goPurchase = (productId:string) => {
    const userInfor = localStorage.getItem('userInfo');
    const transactionId = uuidv4();
    if(userInfor){
      const userInfo = JSON.parse(userInfor);
      const {sub} = userInfo;
      if(sub){
        const _auditEntitlementCall = async () => {          
          const data = {
              "userID": sub,
              "itemCode": movieId,
              "priceSKU": productId,
              "isPackage": isPackage,
              "transactionId": transactionId,
          };
          const res = await auditEntitlement(data);
          if(res.status === 'success'){
            window.localStorage.setItem('itemCode', movieId);
            let forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}`;
            if(process.env.NODE_ENV === 'development'){
              forwordPurchaseUrl = forwordPurchaseUrl+'&env=dev';
            }
            router.replace(forwordPurchaseUrl);
          }else{
            window.location.reload();
          }
        }
        _auditEntitlementCall();        
      }else{
        window.location.reload();
      }
    }else{
      localStorage.setItem('callbackAction', 'rent');
      const callbackParams = {
          "itemCode": movieId,
          "priceSKU": productId,
          "isPackage": isPackage,
          "transactionId": transactionId
      };
      localStorage.setItem('callbackParams', JSON.stringify(callbackParams));
      router.push('/auth');    
    }
  }
  return (<>
    <div className='text-white px-6 mb-4 w-[280px] min-w-[260px]'>
      <div className=''>
      <div className='bg-[#0F0F0F] flex-grow w-full rounded-md overflow-hidden py-4 px-2 border-2 border-b-0 border-[#262626]'>
        <div className='text-xl font-semibold mb-4'>{item?.name}</div>
        <div className='text-white text-base text-left'>
          {/* <p className='mb-1 text-white/60 text-sm'>Ticket Details:</p> */}
          <ul className='list-disc list-inside ml-2 min-h-[100px]'>{
            descriptions?.map((desc:any, index:number)=>{
              return (<li key={stableKeys[index]}
                className='text-sm mb-1 last:mb-0 font-light'
              >{desc}</li>)
            })
            }</ul>
        </div>  
      </div>
      <div className="g-container">
          <div className='g-containerInner'>
          <img src={'/images/purchaseCurve.png'} alt={'Plan'} className="w-[-96.4%]"/>
          </div>
      </div>
      <div className='bg-[#0F0F0F] w-full overflow-hidden rounded-md  py-4 px-2 border-2 border-t-0 border-[#262626]'>
        <p className='mb-0 text-white/60 text-sm'>Price:</p>
        <p className='mb-4'>
            <span className='text-white text-[32px] font-medium'
            >{item?.price} {item?.currency ?? ''}</span>
          </p>
          {(item?.bought)?(<><button
          className="
          bg-transparent
          border border-blue-500
          text-white
          rounded-full
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
          active:opacity-65
          text-[16px]">Rent            
          </button></>)}
      </div>
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


