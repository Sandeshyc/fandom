import React, {useState} from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import Modal from '@mui/material/Modal';
interface PlayButtonProps {
  movieId: string;
  allowedPlans: any;
}

const Buy: React.FC<PlayButtonProps> = ({ movieId, allowedPlans }:PlayButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('s');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div>
      <button 
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
        ">
            <BanknotesIcon className="w-5 md:w-9 text-black mr-2" />
          Buy / Rent
        </button>
        {/* <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        /> */}
<Modal
  open={open}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  onClose={handleClose}
  className='flex justify-center items-center'>
    <div className='border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[12%] w-[90%] max-w-[1200px] bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-20% to-[#210424] to-55% px-[20px] py-[30px] relative'>
      <button
      onClick={handleClose}
      className='absolute top-0 right-0 text-white text-2xl px-2 py-1'>
        &times;
      </button>
      {(Array.isArray(allowedPlans) && allowedPlans.length > 0) ? (<PlanItems 
        items={allowedPlans}/>):(<NoPlanFound/>)}
  </div>
</Modal>
    </div>
  );
}
export default Buy;

const PlanItems = ({items}:any) => {
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
  <div className='flex justify-center  text-center w-full'>
    {items?.map(item=>{
      return (<PlanCard item={item}/>)
    })}
  </div>
  </>)
}

const PlanCard = ({item}:any) => {
  console.log('item', item);
  return (
    <div className='
      w-[280px]
      border border-blue-500
      bg-blue-500
      bg-opacity-10
      rounded-md
      mx-2
      py-4
      px-2
      '>
        <div className='text-white text-xl font-semibold mb-4'>{item?.name}</div>
        <div className='text-white text-base mb-8'>{item?.description}</div>
        <div className='w-full'>
        <button 
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
      No Plan Found!
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
