import React, {useEffect, useState, useCallback, useMemo} from 'react';
import { useToast } from './useToast';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const Toast: React.FC<InfoModalProps> = ({visible, onClose}) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { data } = useToast();


  // use memo for type class
  const typeClass = useMemo(() => {
    switch (data?.type) {
      case 'success':
        return 'bg-green-200 text-green-700';
      case 'error':
        return 'bg-red-200 text-red-700';
      case 'warning':
        return 'bg-yellow-200 text-yellow-700';
      case 'info':
        return 'bg-blue-200 text-blue-700';
      default:
        return 'bg-blue-200 text-blue-700';
    }
  }, [data?.type])

  useEffect(() => {
    setIsVisible(!!visible);

    if (visible) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }
      , 3000);
    }
  }, [visible]);

  const handleClose = useCallback((e) => {
    // if(e.target.dataset?.button !== 'close') return;

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`${isVisible ? 'scale-100' : 'scale-0'} fixed z-[1300] right-2 bottom-2 mx-2 sm:mx-auto max-w-sm  flex flex-row items-center justify-between ${typeClass} p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap`}>
      <div className="inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd" />
        </svg>
        {data.message}
      </div>
      <div onClick={handleClose} className="ml-10 text-green-700 cursor-pointer hover:text-green-800" >
        <span
          className="flex-shrink-0 inline-flex item-center justify-center border-l-2 border-t-2 border-green-700 p-1 leading-none rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" >
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Toast
export * from './useToast'