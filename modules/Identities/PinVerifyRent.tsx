import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  stableKeys
} from 'utils/stableKeys';

interface Props {
  length?: number;
  onChange?: (otp: string) => void;
  isReset?: boolean;
  isSuccess?: boolean;
  isFail?: boolean;
  myPin?: string;
}

const PinVerifyRent: React.FC<Props> = ({ 
  length = 4, 
  onChange, 
  myPin,
  isReset,
  isSuccess,
  isFail,
 }) => {
  const [otp, setOtp] = useState<Array<string>>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null));
  const [borderColorClass, setBorderColorClass] = useState('border-white/20');

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string ) => {
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
    }else if(index === length - 1 && value !== ''){
        inputRefs.current[index]?.blur();
        if(myPin === joinedOtp){
            setBorderColorClass('border-green-500');            
        }else{
            setBorderColorClass('border-red-500/80');
        }
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
    //   setOtp(Array(length).fill(''));
      inputRefs.current[0]?.focus();
    }

  },[isReset]);

  useEffect(() => {
    if(isSuccess){
      setBorderColorClass('border-green-500');
    }else if(isFail){
      setBorderColorClass('border-red-500/80');
    }else{
      setBorderColorClass('border-white/20');
    }
  },[isSuccess, isFail]);
  return (
    <div className='mt-2 mx-auto'>
      {otp.map((digit, index:number) => (
        <input
          key={stableKeys[index]}
          type="password"
          inputMode='numeric'
          maxLength={1}
          value={digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className={`no-arrows text-white/80 w-8 h-12 sm:w-10 lg:w-12 lg:h-16 m-1 lg:m-2 last:mr-0 first:ml-0 text-xl lg:text-3xl text-center bg-white/10 rounded-md border ${(borderColorClass)}`}
        />
      ))}
    </div>
  );
};

export default PinVerifyRent;