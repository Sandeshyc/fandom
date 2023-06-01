import React, {useState, useEffect, useCallback} from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline';

import Reorder from '@/components/elements/Reorder';
import useCurrentPageStore, {layoutType} from '@/hooks/useCurrentPageStore';

const lableMap = [
    {key : 'name', lable: 'Name'},
    {key : 'title', lable: 'Title'},
    {key : 'displayType', lable: 'Layout'}
];

const excludeItems = [
    {key : 'title', value: 'navbar'},
];

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
  }

const ReorderLayout: React.FC<InfoModalProps> = ({visible, onClose }) => {
    const [isVisible, setIsVisible] = useState<boolean>(!!visible);

    const {currentLayout = {} as layoutType, setCurrentLayout} = useCurrentPageStore();

    // use a callback function to update CurrentLayout
  const updateCurrentLayout = useCallback((movieLists : any[]) => {
    setCurrentLayout({pageName: 'iwantTFCHome', items: movieLists});
  }, [setCurrentLayout]);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback((e) => {
    if(e.target.dataset?.button !== 'close') return;

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div onClick={handleClose} className={`fixed z-[41] left-0 top-0 p-6 rounded-md shadow-lg overflow-hidden bg-white border-2 ${isVisible ? 'scale-100' : 'scale-0'}`}>
        <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" >
              <XMarkIcon className="text-white w-6" data-button="close"/>
            </div>
        <h3 className="mb-6 text-3xl">Reorder (drag-drop)</h3>
        <Reorder lables={lableMap} exclude={excludeItems} list={currentLayout.items} setList={updateCurrentLayout} />
    </div>
  )
}

export default ReorderLayout