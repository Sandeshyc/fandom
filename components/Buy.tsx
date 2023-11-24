import React, {useEffect, useState, useRef} from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { stableKeys } from '@/utils/stableKeys';
interface PlayButtonProps {
  movieId: string;
  allowedPlans: any;
  messages?: any;
  allowed?: boolean;
}

const Buy: React.FC<PlayButtonProps> = ({ 
  movieId, 
  allowedPlans,
  messages,
  allowed
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
      setOpen(true);
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
        className="
        bg-yellow-500 
        text-black
        rounded-md 
        py-1 md:py-1 
        px-3 md:px-6
        cursor-not-allowed
        w-auto 
        text-base lg:text-xl 
        font-semibold
        flex
        flex-row
        items-center
        transition
        h-[36px]
        xl:h-[42px]
        xxl:h-[48px]
        ">
            <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
          Buy / Rent
        </button>): <button 
        onClick={handleClickOpen}
        className="
        bg-yellow-500 
        text-black
        rounded-md 
        py-1 md:py-1 
        px-3 md:px-6
        w-auto 
        text-base lg:text-xl 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        h-[36px]
        xl:h-[42px]
        xxl:h-[48px]
        ">
            <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
          Buy / Rent
        </button>}
<Modal
  open={open}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  onClose={handleClose}
  className='flex justify-center items-center'>
    <div className='border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[12%] w-[90%] max-w-[1200px] bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-20% to-[#210424] to-55% px-[20px] py-[30px] relative max-h-[90%]'>
      <button
      onClick={handleClose}
      className='absolute top-0 right-0 text-white text-2xl px-2 py-1'>
        &times;
      </button>
      {(Array.isArray(allowedPlans) && allowedPlans?.length > 0) ? (<PlanItems 
        movieId={movieId}
        items={allowedPlans}/>):(<NoPlanFound/>)}
  </div>
</Modal>
    </div>
  );
}
export default Buy;

const PlanItems = ({
  items,
  movieId
}:any) => {
return (<>
  <div 
    className='
    text-white
    text-center
    mb-6
    w-full'>
    <h3 className='text-xl md:text-2xl font-semibold'>Select a plan</h3>
    <p className='text-sm'>Choose from the plans below</p>
  </div>
  <div className='flex flex-wrap justify-center text-center w-full overflow-y-auto overflow-x-hidden max-h-[60vh]
  h-full
  '>
    {items?.map((item, index)=>{
      return (<PlanCard 
        item={item}
        movieId={movieId}
        key={stableKeys[index]}
        />)
    })}
  </div>
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
  return (
    <div className='
      w-[280px]
      max-w-full
      border border-blue-500
      bg-blue-500
      bg-opacity-10
      rounded-md
      m-2
      py-4
      px-2
      pb-20
      relative
      '>
        <div className='text-white text-xl font-semibold mb-4'>{item?.name}</div>
        <div className='text-white text-base mb-8  text-left ml-6'><ul className='list-disc list-inside'>{
        descriptions?.map((desc, index)=>{
          return (<li key={stableKeys[index]}>{desc}</li>)
        })
        }</ul></div>        
        <div className='w-full absolute bottom-0 left-0 pb-5'>
        <p className='mb-2'>
          <span className='text-white text-xl font-semibold'>Price: </span>
          <span className='text-white text-xl font-semibold'>${item?.price}</span>
        </p>
        <button 
          onClick={
            ()=>goPurchase(item?.priceSKU)
          }
          className="
          bg-yellow-500 
          text-black
          rounded-md 
          py-1 md:py-1 
          px-3 md:px-6
          mx-auto
          w-auto 
          text-base lg:text-xl 
          font-semibold
          flex
          flex-row
          items-center
          hover:bg-neutral-300
          transition">
              <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
            Buy / Rent
          </button>
        </div>
    </div>
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


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Sorry, currently purchase only avilable on mobile App!</DialogTitle>    
      <DialogContent>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus vitae consequatur fugit possimus ipsum obcaecati assumenda reiciendis. Repellendus inventore modi voluptatum aliquid ipsa molestiae, recusandae ex expedita, ab voluptate ipsam!
      </DialogContent>  
    </Dialog>
  );
}
