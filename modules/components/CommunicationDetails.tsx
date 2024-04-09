import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
const CommunicationDetails = () => {
    const [expanded, setExpanded] = useState(false);
    const [field1, setField1] = useState(false);
    const [field2, setField2] = useState(true);
    const [field3, setField3] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    const toggleField1 = () => {
        setField1(!field1);
    }
    const toggleField2 = () => {
        setField2(!field2);
    }
    const toggleField3 = () => {
        setField3(!field3);
    }
    return (
        <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>  
            <div className="flex justify-between">
                <div className="pr-2">
                    <p className='text-lg lg:text-[22px] text-[#DACFDA] font-medium'>Communication Details</p>
                </div>
                <button 
                    type="button"
                    onClick={toggleExpanded}
                    className="w-[25px]">
                    <ChevronDownIcon 
                    className={`active:opacity-65 h-6 w-6 text-white ${(expanded)?'rotate-180':null}`}/>
                </button>
            </div>
            <div className={`text-white/80 bg-gray-700/40 p-4 rounded-md mt-4 flex justify-between flex-wrap ${(!expanded)?'hidden':'flex'}`}>
                <InputCheckbox 
                    id='field1'
                    label="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    checked={field1}
                    onChange={toggleField1}

                />
                <InputCheckbox 
                    id='field2'
                    label="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    checked={field2}
                    onChange={toggleField2}
                />
                <InputCheckbox 
                    id='field3'
                    label="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    checked={field3}
                    onChange={toggleField3}
                />
            </div>
        </div>
    );
};
export default CommunicationDetails;

type InputCheckboxProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputCheckbox = ({id, label, checked, onChange}:InputCheckboxProps) => {
    return (
        <div className="flex flex-wrap w-full mb-4">            
            <div className='w-[70px] mt-2'>
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="hidden"
                    id={id}
                />
                <label
                    htmlFor={id}
                    className={`relative block rounded-full w-12 h-6 transition-colors duration-300 focus:outline-none ${
                        checked ? 'bg-blue-600' : 'bg-gray-300'
                    }`} >
                    <span
                    className={`absolute left-0 top-0 inline-block w-6 h-6 transform transition-transform duration-300 rounded-full shadow-lg bg-white ${
                        checked ? 'translate-x-full' : ''
                    }`}
                    ></span>
                </label>
            </div>
            <p className='w-[200px] grow'>
                {label}
            </p>
        </div>
    );
}