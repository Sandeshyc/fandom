import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { stableKeys } from '@/utils/stableKeys';
type Props = {
    item: any;
    movieId: string;
    isPackage: boolean;
}
const PlanItemCard = ({
    item,
    movieId,
    isPackage
  }:Props) => {
    let descriptions:any = [];
    if(item?.description){
      // replace all , with <li>
      descriptions = [...item?.description?.split(',')];
    }
    const router = useRouter();
    const goPurchase = (productId:string) => {
      const userInfor = localStorage.getItem('userInfo');
      if(userInfor){
        const userInfo = JSON.parse(userInfor);
        const {sub} = userInfo;
        if(sub){
          const entitleCall = async () => {
            const transactionId = uuidv4();
            const headers = {
                'Content-Type': 'application/json',
            };      
            const data = {
                "userID": sub,
                "itemCode": movieId,
                "priceSKU": productId,
                "isPackage": isPackage,
                "transactionId": transactionId,
            };
            // console.log('Data:', data);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/entitlement/audit/`, data, { headers })
                .then(response => {
                if(response.status === 200) {
                  window.localStorage.setItem('itemCode', movieId);
                  if(process.env.NODE_ENV === 'production'){
                    let forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}`;
                    router.replace(forwordPurchaseUrl);
  
                  }
                  if(process.env.NODE_ENV === 'development'){
                    let forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}/payment/?userid=${sub}&productId=${productId}&transactionId=${transactionId}&env=dev`;
                    router.replace(forwordPurchaseUrl);
                  }
                }
                // console.log('Success:', response);
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
      <div className='text-white px-6 mb-4 w-[280px] min-w-[260px]'>
        <div>
        <div className='bg-[#0F0F0F] flex-grow w-full rounded-md overflow-hidden py-4 px-2 border-2 border-b-0 border-[#262626]'>
          <div className='text-xl font-semibold mb-4'>{item?.name}</div>
          <div className='text-white text-base text-left'>
            {/* <p className='mb-1 text-white/60 text-sm'>Ticket Details:</p> */}
            <ul className='list-disc list-inside ml-2 min-h-[100px]'>{
              descriptions?.map((desc:string, index:number)=>{
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
        </div>
      </div></>
    )
}

export default PlanItemCard;