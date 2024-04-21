import React, { useCallback, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import TextField from '@/components/elements/TextField';
import useEditChangePlaylistModal from '@/hooks/useEditChangePlaylistModal';
import usePlaylists from '@/hooks/usePlaylists';
import useCurrentPageStore, {layoutType} from '@/hooks/useCurrentPageStore';

import Select from '@/components/elements/Select';
import { set } from 'lodash';

const displayTypes = [
  {id: 1, name: 'animated'},
  {id: 2, name: 'billboard'},
  {id: 3, name: 'roll'},
  {id: 4, name: 'extended'},
  {id: 5, name: 'potrait'},
  {id: 6, name: 'top10'},
];

interface EditChangePlaylistModalProps {
  visible?: boolean;
  onClose: any;
}

const EditPlaylistModal: React.FC<EditChangePlaylistModalProps> = ({ visible, onClose, region }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const [selected, setSelected] = useState({} as any);
  const [customTitle, setCustomTitle] = useState('' as string);
  const [layout, setLayout] = useState(displayTypes[0] as any);
  const [message, setMessage] = useState('' as string);

  // get playlists from state
  const { data: playlists = [] } = usePlaylists();
  const {currentLayout = {} as layoutType, setCurrentLayout} = useCurrentPageStore();

  const { playlist, index } = useEditChangePlaylistModal();

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
    <div onClick={handleClose} className="EditPlaylistModal z-50 transition duration-300 bg-black bg-opacity-70 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0" data-button="close">
      <div className="relative m-auto py-4 w-full max-w-7xl h-[90%] ">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} rounded-md  overflow-hidden transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md h-full`}>

          <div className="relative h-full">
            <div className="bg-white  pb-20 h-full">
              <div className="flex items-center justify-between pt-6 px-5  bg-white relative z-2 ">
                <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" >
                  <XMarkIcon className="text-white w-6" data-button="close"/>
                </div>
                <h3 className="text-3xl  px-5">Edit a Playlist</h3>
              </div>
              <iframe className="top-0 left-0 w-full h-full" src={`https://d1ej2uyebavk7j.cloudfront.net/playlist-details/${playlist?._id}`}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPlaylistModal;
