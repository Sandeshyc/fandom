import React, { useCallback, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import TextField from '@/components/elements/TextField';
import useEditChangePlaylistModal from '@/hooks/useEditChangePlaylistModal';
import usePlaylists from '@/hooks/usePlaylists';
import useCurrentPageStore, {layoutType} from '@/hooks/useCurrentPageStore';

import Select from '@/components/elements/Select';
import { set } from 'lodash';

const displayTypes = [
  {id: 1, name: 'animated', icon: '/images/layout/slider-animated.svg'},
  {id: 2, name: 'billboard', icon: '/images/layout/slider-billboard.svg'},
  {id: 3, name: 'extended', icon: '/images/layout/slider-extended.svg'},
  {id: 4, name: 'potrait', icon: '/images/layout/slider-portrait.svg'},
  {id: 5, name: 'roll', icon: '/images/layout/slider-landscape.svg'},
  {id: 6, name: 'top10', icon: '/images/layout/slider-top10.svg'},
];

interface EditChangePlaylistModalProps {
  visible?: boolean;
  onClose: any;
}

const EditChangePlaylistModal: React.FC<EditChangePlaylistModalProps> = ({ visible, onClose, region }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const [selected, setSelected] = useState({} as any);
  const [customTitle, setCustomTitle] = useState('' as string);
  const [layout, setLayout] = useState(displayTypes[0] as any);
  const [message, setMessage] = useState('' as string);

  // get playlists from state
  const { data: playlists = [] } = usePlaylists();
  const {currentLayout = {} as layoutType, setCurrentLayout} = useCurrentPageStore();

  const { playlist, index, updateType } = useEditChangePlaylistModal();

  const handlePlaylistChange = (add : boolean = false ) => {
    console.clear();
    console.log('click on handle change... ');
    console.log('selected ', selected);

    console.log('index ', index);
    if(index === -1) return;

    const newLayout = [...currentLayout.items];
    console.log('newLayout ', newLayout);

    const title = customTitle || selected.name || selected?.title;
    
    // if add is true, then add new playlist
    if(add) {
      // push just below the current index
      newLayout.splice(index + 1, 0, {
        title: title,
        displayType: layout.name ,
        items: selected?.list ?? selected?.items,
      });
    } else {
      newLayout[index] = {
        title: title,
        displayType: layout.name ,
        items: selected?.list ?? selected?.items,
      };
    }
    console.log('newLayout updated ', newLayout);

    setMessage('Playlist updated successfully');

    setCurrentLayout({...currentLayout, items: newLayout});

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 1000);
  };

  useEffect(() => {
    setIsVisible(!!visible);

    
  }, [visible]);

  useEffect(() => {
    console.log('inside useEffect ... playlist ', playlist);
    setSelected(playlist);

    const layout = displayTypes.find(item => item.name === playlist?.displayType);

    setLayout(layout || displayTypes[0]);
    setCustomTitle(playlist?.title || '');
    setMessage('');
  }, [playlist]);

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

  // console.log('selected ', selected);

  return (
    <div onClick={handleClose} className="EditChangePlaylistModal z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0" data-button="close">
      <div className="relative m-auto py-4 w-full max-w-3xl ">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

          <div className="relative">
            <div className="bg-white py-6 px-5 rounded-md">
              <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" >
                <XMarkIcon className="text-white w-6" data-button="close"/>
              </div>
              <h3 className="text-3xl mb-4">
                {updateType === 'playlist'? 'Change Playlist' : 'Change Layout' }
              </h3>
              <div className='mx-auto mt-4 mb-10 max-w-[80%] flex flex-col items-center '>

                {updateType === 'playlist' ? 
                  (<>
                    <Select list={playlists} current={selected} onChange={setSelected} lable='Playlist' />

                    <TextField 
                      label="Custom Title"
                      name="title"
                      value={customTitle} 
                      onChange={setCustomTitle} 
                      />
                  </>) :
                  (<Select list={displayTypes} current={layout} onChange={setLayout} lable='Layout' />)
                }

                {message && (<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 mt-4 px-4 py-3 shadow-md" role="alert">
                  <p className="font-bold">{message}</p>
                </div>)}

                <div className="flex justify-center mt-4 gap-6">
                  <button onClick={e => handlePlaylistChange()} className=" bg-green-700 text-white  rounded-md  py-1 md:py-2  px-3 md:px-8 w-auto  text-xl  font-semibold flex flex-row items-center hover:bg-gray-600 transition mt-6">
                    Update
                  </button>
                  <button onClick={e => handlePlaylistChange(true)} className=" bg-blue-700 text-white  rounded-md  py-1 md:py-2  px-3 md:px-8 w-auto  text-xl  font-semibold flex flex-row items-center hover:bg-gray-600 transition mt-6">
                    Add as a New Section
                  </button>
                </div>
                
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChangePlaylistModal;
