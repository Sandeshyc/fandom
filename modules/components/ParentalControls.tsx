import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import Text from '@/modules/Identities/Text';
import { useFormik } from "formik";
import * as Yup from "yup";
const ParentalControls = () => {
    const [expanded, setExpanded] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    const toggleSwitch = () => {
        if(isOn) {
            setIsOn(false);
        }else{
            setIsAuthOpen(true);
        }
    };
    const togglePassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    // start Formik
    const schema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
    });
    const formiks = useFormik({
        initialValues: {
        password: '',
        },
        // Pass the Yup schema to validate the form
        validationSchema: schema,

        // Handle form submission
        onSubmit: async ({ 
        password,
        }) => {
            setIsOn(true);
            setIsAuthOpen(false);
            values.password = '';
        },
        enableReinitialize: true,
      });
      const { errors, touched, values, handleChange, handleSubmit } = formiks;
    return (
        <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>  
            <div className="flex justify-between">
                <div className="pr-2">
                    <p className='text-lg lg:text-[22px] text-[#DACFDA] font-medium'>Parental Controls</p>
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
                <div className='w-[200px] max-w-[600px] pr-4 grow'>
                    <Text size='lg'>PIN required to set up and manage kids profiles. Turning off parental controls will clear all settings, including PIN.</Text>
                </div>
                <div className='w-[100px]'>
                    <div className="flex items-center space-x-2">
                        <span>{isOn ? 'On' : 'Off'}</span>
                        <button
                            className={`relative rounded-full w-12 h-6 transition-colors duration-300 focus:outline-none ${
                            isOn ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                            onClick={toggleSwitch}>
                            <span
                            className={`absolute left-0 top-0 inline-block w-6 h-6 transform transition-transform duration-300 rounded-full shadow-lg bg-white ${
                                isOn ? 'translate-x-full' : ''
                            }`}
                            ></span>
                        </button>
                    </div>
                </div>
                <div className={`w-full ${(isAuthOpen)?'flex':'hidden'} flex-wrap justify-end`}>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="flex flex-wrap ">
                            <div className="relative bg-gray-900 rounded-md overflow-hidden">
                                <input 
                                    type={(!isShowPassword)?'password' : 'text'}
                                    placeholder="Password"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    className='w-[200px] text-white text-[14px] lg:text-[16px] py-1 pl-2 pr-10 border rounded-md border-[#767680] h-[42px] sm:h-[46px] xl:h-[52px] bg-[#767680] bg-opacity-[22%] focus:bg-transparent active:bg-transparent'
                                />
                                <div className="absolute top-[8px] sm:top-[11px] xl:top-[14px] right-0 px-2 flex justify-center items-center h-[24px] border-l border-[#5F576F] text-[10px]">
                                    {(!isShowPassword)?<><span 
                                    onClick={togglePassword}>
                                    <VisibilityOff
                                        sx={{
                                        fontSize: 18,
                                        color: '#fff',
                                        }}
                                    />
                                    </span></>:<><span
                                    onClick={togglePassword}>
                                    <Visibility
                                    sx={{
                                        fontSize: 18,
                                        color: '#fff',
                                    }}
                                    />
                                    </span></>}
                                </div>
                            </div>
                            <button
                            className='bg-gradient-to-l to-[#1D82FC] from-[#2D45F2] text-white h-[42px] sm:h-[46px] xl:h-[52px] py-2 ml-1 rounded-md px-4' 
                            type="submit">Submit</button>
                        </div>
                        {(errors.password && touched.password)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.password}</p>:null}
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ParentalControls;