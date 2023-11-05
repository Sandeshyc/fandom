import React, {useState} from 'react';
import Alert from 'react-popup-alert'
import { BanknotesIcon } from '@heroicons/react/24/outline';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
interface PlayButtonProps {
  movieId: string;
}

const Buy: React.FC<PlayButtonProps> = ({ movieId }) => {
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
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default Buy;


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
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Sorry, currently purchase only avilable on mobile App!</DialogTitle>      
    </Dialog>
  );
}
