import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  stableKeys
} from 'utils/stableKeys';

interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
  isReset?: boolean;
  isSuccess?: boolean;
  isFail?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ 
  length = 6, 
  onChange, 
  isReset,
  isSuccess,
  isFail
 }) => {
  const [otp, setOtp] = useState<Array<string>>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null));
  const [borderColorClass, setBorderColorClass] = useState('border-white/20');

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Join the OTP digits and pass it to the parent component
    const joinedOtp = newOtp.join('');
    if (onChange) {
      onChange(joinedOtp);
    }

    // Move to the next input field
    if (index < length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to the previous input field on backspace
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    // reset the OTP input
    if (isReset) {
      setOtp(Array(length).fill(''));
      inputRefs.current[0]?.focus();
    }

  },[isReset]);

  useEffect(() => {
    if(isSuccess){
      setBorderColorClass('border-green-500');
    }else if(isFail){
      setBorderColorClass('border-red-500/80');
    }else{
      setBorderColorClass('border-black/20');
    }
  },[isSuccess, isFail]);
  return (
    <div className='mt-4'>
      {otp.map((digit, index:number) => (
        <input
          key={stableKeys[index]}
          type="number"
          inputMode='numeric'
          maxLength={1}
          value={digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className={`no-arrows text-black/80 w-8 h-12 sm:w-10 lg:w-12 lg:h-16 m-1 lg:m-2 text-xl lg:text-3xl text-center bg-black/10 rounded-md border ${(borderColorClass)}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;