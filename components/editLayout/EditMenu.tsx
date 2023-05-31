import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {EllipsisVerticalIcon} from '@heroicons/react/24/outline'

import useEditPlaylistModal from '@/hooks/useEditPlaylistModal';
import useEditChangePlaylistModal from '@/hooks/useEditChangePlaylistModal';
import useCurrentPageStore, {layoutType} from '@/hooks/useCurrentPageStore';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface EditMenuProps {
  className?: string;
  index: number;
  playlist: object;
    
}

const EditMenu: React.FC<EditMenuProps> = ({className = '', index, playlist}) => {

  console.log('EditMenu index ', index);

  const {openModal: editPlaylistOpenModal} = useEditPlaylistModal();
  const {openModal: changePlaylistOpenModal} = useEditChangePlaylistModal();
  const {currentLayout = {} as layoutType, setCurrentLayout} = useCurrentPageStore();
  

  const handleRemovePlaylistFromLayout = (index: number) => {
    if(index === -1) return;

    const newLayout = [...currentLayout.items];
    // remove playlist from layout
    newLayout.splice(index, 1);
    setCurrentLayout({...currentLayout, items: newLayout});
  }

  const handleDuplicatePlaylistItem = (index: number) => {
    if(index === -1) return;

    const newLayout = [...currentLayout.items];
    const laylist = newLayout[index];
    newLayout.splice(index, 0, laylist);
    setCurrentLayout({...currentLayout, items: newLayout});
  }

  return (
    <Menu as="div" className={`relative z-2 inline-block text-left ${className}`}>
      <div>
        <Menu.Button className="gap-x-1.5 rounded-md text-white shadow-sm ring-1 ring-inset ring-transparent  hover:ring-gray-300 active:ring-gray-300">
            <EllipsisVerticalIcon className="w-10" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" aria-selected>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        console.log(' onclick index set to ', index);
                      changePlaylistOpenModal(currentLayout, playlist, index, 'playlist')
                    }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg w-full text-left'
                  )}
                >
                  Change Playlist
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        console.log(' onclick index set to ', index);
                      changePlaylistOpenModal(currentLayout, playlist, index, 'layout')
                    }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg w-full text-left'
                  )}
                >
                  Change Layout
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => editPlaylistOpenModal(currentLayout, playlist, index)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg w-full text-left'
                  )}
                >
                  Edit Playlist
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg w-full text-left'
                  )}
                >
                  Style
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={e => handleDuplicatePlaylistItem(index)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg w-full text-left'
                  )}
                >
                  Duplicate
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={e => handleRemovePlaylistFromLayout(index)}
                  className={classNames(
                    active ? 'bg-gray-100 text-red-700' : 'text-red-600',
                    'block px-4 py-2 text-lg w-full text-left'
                  )}
                >
                  Remove
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}


export default EditMenu;