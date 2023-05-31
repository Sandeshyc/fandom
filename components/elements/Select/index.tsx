import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { capFirstLetter } from '@/utils/capFirstLetter'


interface SelectProps {
    list: any[];
    current: object;
    onChange: (item: object) => void;
    lable: string;
}

export default function Select({list, current, onChange, lable} : SelectProps) {
  
  const [query, setQuery] = useState('');

  // console.log('list ', list);
  // console.log('current ', current);
  // console.log('selected ', selected);

  const filteredPeople =
    query === ''
      ? list
      : list.filter((item) =>
          (item.title || item.name)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="mt-4 w-full">
      <label className="block text-gray-700 text-lg font-bold mb-1" htmlFor="username">
        {lable}
      </label>
      <Combobox value={current} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md border-2 border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-xl sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-4 pl-3 pr-10 text-xl leading-5 text-gray-900 focus:ring-0"
              displayValue={(item) => capFirstLetter(item.title || item.name)}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xl ">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <div className='flex justify-between items-center'>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.name || item.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                        {item.icon && (
                          <img src={item.icon} className=" inset-y-0 left-0 h-14 w-14" />
                        )}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
