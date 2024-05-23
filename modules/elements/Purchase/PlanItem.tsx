import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import {
    auditEntitlement,
    getProfile
  } from '@/services/api';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import LinkRoute from '@/modules/Identities/LinkRoute';
import PinVerifyRent from '@/modules/Identities/PinVerifyRent';
import {
    AutorenewOutlined
} from '@mui/icons-material';
import { stableKeys } from '@/utils/stableKeys';

type Props = {
  item: any;
  movieId: string;
  rentText?: string;
  itemData?: any;
}
const PlanItem = ({
  item,
  movieId,
  rentText='Rent',
  itemData
}:Props) => {
    // console.log('item', item);
  const isLoginUser = useCheckAuthentication();
  const [isLoading, setIsLoading] = useState(false); 
  const [isRentPinEnable, setIsRentPinEnable] = useState(false);
  const [rentPin, setRentPin] = useState('');
  const [isRentPinPopup, setIsRentPinPopup] = useState(false);
  const [userId, setUserId] = useState('');
  const [isPinSuccess, setIsPinSuccess] = useState(false);
  const [isPinFail, setIsPinFail] = useState(false);
  const [rentProductId, setRentProductId] = useState('');
  const [rentTransactionId, setRentTransactionId] = useState('');
  let descriptions = [] as any;
  if(item?.description){
    // replace all , with <li>
    descriptions = [...item?.description?.split(',')];
  }
  const router = useRouter();
  const handleOtpChange = (otp:string) => {
    if(otp.length !== 4){
      setIsPinFail(false);
      setIsPinSuccess(false);
      return;
    }
    if(rentPin === otp){
      setIsPinSuccess(true);
      setIsPinFail(false);
      const _auditEntitlementCall = async () => {    
        let itemUrl = '/details/'+movieId;
        if(itemData?.contentType === 'TVShow'){
          itemUrl = '/tvshow/'+movieId;
        }else if(itemData?.contentType === 'TvChannel'){
          itemUrl = '/channel/'+movieId;
        }      
        const data = {
          "userID": userId,
          "contentId": movieId,
          "planId": rentProductId,
          "transactionId": rentTransactionId,
          "contentType" : itemData?.contentType
        };
        console.log('data s', data);
        let res = await auditEntitlement(data);
        console.log('res', res);
        if(res.status === 'success' || res.status === 'process'){
          if(res.status === 'process'){
            setRentTransactionId(res.transitionId);
          }
          window.localStorage.setItem('itemCode', movieId);
          window.localStorage.setItem('itemUrl', itemUrl);
          let forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${userId}&productId=${rentProductId}&transactionId=${(res.status === 'process')?res.transitionId:rentTransactionId}`;
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
      setIsPinSuccess(false); 
      setIsPinFail(true);   
    }
  }
  const goPurchase = (productId:string) => {
    const userInfor = localStorage.getItem('userInfo');
    const transactionId = uuidv4();
    setIsLoading(true);
    let itemUrl = '/details/'+movieId;
    if(itemData?.contentType === 'TVShow'){
      itemUrl = '/tvshow/'+movieId;
    }else if(itemData?.contentType === 'TvChannel'){
      itemUrl = '/channel/'+movieId;
    }
    if(userInfor){
      const userInfo = JSON.parse(userInfor);
      const {sub} = userInfo;
      if(sub){
        setUserId(sub);
        setRentProductId(productId);
        setRentTransactionId(transactionId);
        const _auditEntitlementCall = async () => {          
          const data = {
            "userID": sub,
            "contentId": movieId,
            "planId": productId,
            "transactionId": transactionId,
            "contentType" : itemData?.contentType
          };
          console.log('data', data);
          const res = await auditEntitlement(data);
          console.log('res', res);
          if(res.status === 'success' || res.status === 'process'){
            if(res.status === 'process'){
              setRentTransactionId(res.transitionId);
            }
            window.localStorage.setItem('itemCode', movieId);
            window.localStorage.setItem('itemUrl', itemUrl);
            let forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${(res.status === 'process')?res.transitionId:transactionId}`;
            if(process.env.NODE_ENV === 'development'){
              forwordPurchaseUrl = forwordPurchaseUrl+'&env=dev';
            }
            router.replace(forwordPurchaseUrl);
          }else{
            window.location.reload();
          }
        }
        const _getProfile = async () => {
          const res = await getProfile(sub);
          // console.log('res', res);
          if(res.status === 'success'){
            const {data:profile} = res;
            // console.log('profile', profile);
            if(profile?.parentalControl?.isEnable && profile?.parentalControl?.pinRequireRent){
              setIsRentPinEnable(true);
              setRentPin(profile?.parentalControl?.pin);
              setIsRentPinPopup(true);
            }else{
              _auditEntitlementCall();
            }
          }else{
            window.location.reload();
            setIsLoading(false); 
          }
        }
        _getProfile();
        // _auditEntitlementCall(); 
      }else{
        window.location.reload();
      }
    }else{
      localStorage.setItem('callbackAction', 'rent');
      const callbackParams = {
        "itemCode": movieId,
        "priceSKU": productId,
        "transactionId": transactionId,
        "itemUrl": itemUrl
    };
      localStorage.setItem('callbackParams', JSON.stringify(callbackParams));
      router.push('/auth');    
    }
  }
  const handlePinClose = () => {
    setIsRentPinPopup(false);
    setIsLoading(false);
  };
  return (<>
    {(isRentPinPopup)&&(
      <div className='!fixed top-0 left-0 w-full h-full bg-black/80 z-50 py-[150px] px-8 flex justify-center items-center'>
      <div className='py-2 px-4 bg-gray-800 w-[280px] sm:w-[420px] max-w-full flex justify-center flex-col rounded-md'>
        <Title tag='h3' size='xl' className='text-white text-center'>Parental Control</Title>
        <Text size='base' className='text-white text-center'>Enter your PIN</Text>
        <PinVerifyRent
          length={4}
          onChange={handleOtpChange}
          myPin={rentPin}
        />
        <div className='mt-4 justify-center flex flex-col items-center'>
          {(isPinSuccess)&&(
            <p className='text-green-500 text-[14px]'>PIN Success, Please wait a moment...</p>
          )}
          {(isPinFail)&&(
            <p className='text-red-500 text-[14px]'>Incorrect PIN. Try again.</p>
          )}
          <LinkRoute 
            type='unset'
            href='/myprofile'
            className='text-[#fff]/90 text-[14px] py-1'>Forgot PIN?</LinkRoute>
          <button 
            onClick={handlePinClose}
            className='text-[#fff]/70 text-[14px] py-1'>
            Cancel
          </button>
        </div>
      </div>
    </div>
    )}
    <div className='text-white px-6 mb-4 w-[280px] min-w-[260px] '>
      <div className='relative'>
      {(isLoading)&&(<div className='absolute top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-10 cursor-wait'>
        <AutorenewOutlined 
          className='animate-spin'
          sx={{ color: 'white', fontSize: 40 }}/>
      </div>)}
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
          text-[16px]">{(!isLoginUser)&&'Login and '}{rentText}      
          </button></>)}
      </div>
      </div>
    </div></>
    );
};
export default PlanItem;