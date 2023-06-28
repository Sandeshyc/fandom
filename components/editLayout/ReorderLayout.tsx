import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Reorder from '@/components/elements/Reorder';
import useCurrentPageStore, { layoutType } from '@/hooks/useCurrentPageStore';
import { Button } from '@mui/material';
import { Event as EventIcon, BarChart as ShowChartIcon, Info as InfoIcon, Add as AddIcon } from '@mui/icons-material';

const labelMap = [
  { key: 'title', label: 'Playlist' },
  { key: 'displayType', label: <>Layout<InfoIcon className="w-4 h-4 ml-2 mb-1" /></> },
  { key: 'views', label: <ShowChartIcon style={{ color: 'white' }} /> },
  { key: 'date', label: <EventIcon style={{ color: 'white' }} /> },
];

const excludeItems = [
  { key: 'title', value: 'navbar' },
];

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
  title: any;
  topData: any;
}

const ReorderLayout: React.FC<InfoModalProps> = ({ visible, onClose, title, topData }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { currentLayout = {} as layoutType, setCurrentLayout } = useCurrentPageStore();
  const [currentTopData, setCurrentTopData] = useState(topData);
  const [addedItems, setAddedItems] = useState<any[]>([]); // New state to hold the added items
  const [initialLayout, setInitialLayout] = useState<layoutType>(currentLayout);



  // use a callback function to update CurrentLayout
  const updateCurrentLayout = useCallback((movieLists: any[]) => {
    setCurrentLayout({ pageName: 'iwantTFCHome', items: movieLists });
  }, [setCurrentLayout, initialLayout]);
  

  useEffect(() => {
    setIsVisible(!!visible);
    setCurrentTopData(topData);
    setInitialLayout(currentLayout);
  }, [visible, topData]);

  const handleClose = useCallback((e) => {
    if (e.target.dataset?.button !== 'close') return;

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleAdd = useCallback(() => {
    if (currentLayout.items.length > 0) {
      const topData = { ...currentLayout.items[1], title: '', displayType: '' };
      setAddedItems((prevItems) => [...prevItems, topData]);
    }
  }, [currentLayout.items]);

  const handleCancel = useCallback(() => {
    setCurrentLayout(initialLayout); // Reset the current layout to initial state
    setAddedItems([]); // Clear the added items
    setIsVisible(false);
  
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, initialLayout, setCurrentLayout]);
  
  

  console.log("updatedPlaylist", currentLayout.items)

  if (!visible) {
    return null;
  }

  return (
    <div style={{ width: "1200px", top: "17%", left: "0", right: "0", marginLeft: "auto", marginRight: "auto" }} className={`fixed z-[999] left-0 top-0 p-6 rounded-md shadow-lg overflow-hidden bg-black border-2 ${isVisible ? 'scale-100' : 'scale-0'}`}>
      <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>{title}</div>
      <div style={{ marginRight: "40px" }} className="cursor-pointer absolute top-6 right-40">
        <Button style={{width:"100px"}} variant="contained" data-button="close" onClick={handleAdd}>
        <AddIcon style={{marginRight:"5px"}}/>
          
          Add</Button>
      </div>
      <div className="cursor-pointer absolute top-6 right-20">
        <Button style={{width:"100px"}} variant="contained" data-button="cancel" onClick={handleCancel}>Cancel</Button>
      </div>
      <div onClick={handleClose} className="cursor-pointer absolute top-6 right-3 h-10 w-10 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
        <XMarkIcon className="text-white w-6" data-button="close" />
      </div>
      <div style={{ marginBottom: "40px" }}></div>
      <Reorder lables={labelMap} exclude={excludeItems} list={[...currentLayout.items, ...addedItems]} setList={updateCurrentLayout} />
    </div>
  );
};

export default ReorderLayout;
