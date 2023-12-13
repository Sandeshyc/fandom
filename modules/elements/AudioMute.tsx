import { type } from "os";
import React from "react";
import {
    VolumeOff,
    VolumeUp,
  } from '@mui/icons-material';
type Props = {
    isMute: boolean,
    toggleMute: any,
}
const AudioMute = (
    {
        isMute,
        toggleMute,
    }: Props
) => {

    return (
        <div className='absolute bottom-2 right-2 w-[40px] rounded-full h-[40px] z-50 bg-black flex justify-center items-center'
        onClick={toggleMute}
        >
            {(!isMute)?(<VolumeUp className='w-[20px] h-[20px] m-auto text-white'/>):(<VolumeOff className='w-[20px] h-[20px] m-auto text-white'/>)} 
        </div>
    );
};

export default AudioMute;