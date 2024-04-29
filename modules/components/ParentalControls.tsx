import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
    Visibility,
    VisibilityOff,
    RotateLeft,
    Lock
} from '@mui/icons-material';
import {
    updateProfile
} from '@/services/api';
import Text from '@/modules/Identities/Text';
import LinkRoute from '@/modules/Identities/LinkRoute';
import ParentControlPin from '@/modules/elements/ParentControlPin';
import ParentControlReadOnly from '@/modules/elements/ParentControlReadOnly';
import { useFormik } from "formik";
import * as Yup from "yup";
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_CLIENT_ID,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_IDENTITY_AUTH_DOMAIN,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

type Props = {
    pcData: any;
}
// Main Component
const ParentalControls = ({pcData}:Props) => {
    // console.log('pcData: ', pcData);
    const [userid, setUserid] = React.useState('');
    const [expanded, setExpanded] = useState(false);
    const [isOn, setIsOn] = useState(pcData?.isEnable);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [readPcData, setReadPcData] = useState(pcData);
    const [isEdit, setIsEdit] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    }
    const openEditHandler = () => {
        setIsEdit(true);
        setIsAuthOpen(true);
        values.userPassword = '';
    }
    const closeEditHandler = () => {
        setIsEdit(false);
        setIsAuthOpen(false);
        values.userPassword = '';
    }

    const toggleSwitch = () => {
        setIsAuthOpen(true);
        values.userPassword = '';
    };
    const togglePassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    // start Formik
    const schema = Yup.object().shape({
        userPassword: Yup.string().required("Password is required"),
    });
    const formiks = useFormik({
        initialValues: {
            userPassword: '',
        },
        // Pass the Yup schema to validate the form
        validationSchema: schema,
        // Handle form submission
        onSubmit: async ({
            userPassword,
        }) => {
            setIsLoading(true);
            try {
                const provider = localStorage.getItem('provider');
                if(provider === 'firebase') {
                    const userInfo = localStorage.getItem('userInfo');
                    if(userInfo){
                        const user = JSON.parse(userInfo);
                        if(user){
                            const userEmail = user?.email;
                            if(userEmail){
                                const userCredential = await signInWithEmailAndPassword(
                                    getAuth(),
                                    userEmail,
                                    userPassword
                                );
                                if(userCredential?.user){                                    
                                    if(isEdit){
                                        setIsEdit(false);
                                        setPinOpen(true);
                                        setIsAuthOpen(false);
                                        
                                    }else{
                                        if(isOn){
                                            let newPcData = pcData;
                                            newPcData.isEnable = false;
                                            newPcData.pinRequire = false;
                                            newPcData.pinRequireRent = false;
                                            newPcData.pin = '';
                                            newPcData.roleId = '';
                                            newPcData.roleName = '';
                                            newPcData.role = {};
                                            const data = {
                                                userId: userid,
                                                parentalControl: newPcData
                                            }
                                            const _updateProfile = async () => {
                                                const response = await updateProfile(data);
                                                if(response.status === 'success') {
                                                    setIsAuthOpen(false);
                                                    setPinOpen(false);
                                                    setIsOn(false);
                                                    setReadPcData(newPcData);
                                                }else{
                                                    formiks.setErrors({userPassword: 'Something went wrong'});
                                                }
                                            }
                                            _updateProfile();
                                        }else{
                                            setIsAuthOpen(false);
                                            setPinOpen(true);
                                        }
                                    }
                                    values.userPassword = '';                                    
                                }
                            }
                        }else{
                            formiks.setErrors({userPassword: 'Invalid Password'});
                        }
                    }else{
                        formiks.setErrors({userPassword: 'Invalid Password'});
                    }
                }else{
                    formiks.setErrors({userPassword: 'Only Firebase Auth is allowed'});
                }
            } catch (err:any) {
                formiks.setErrors({userPassword: 'Invalid Password'});                
            }            
            setIsLoading(false);
        },
        enableReinitialize: true,
    });
    const { errors, touched, values, handleChange, handleSubmit } = formiks;
    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserid(userInfoObj.sub);
          }
        }
    }, []);
    useEffect(() => {
        setReadPcData(pcData);
    }, [pcData]);
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
                    <Text size='base'>PIN required to set up and manage kids profiles. Turning off parental controls will clear all settings, including PIN.</Text>
                </div>
                <div className='w-[140px] flex flex-wrap justify-end'>                    
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
                        <div className="flex flex-wrap relative">
                            {(isLoading)&&
                                <p className='text-[#fff]/90 text-[14px] py-1 absolute top-0 left-0 h-full w-full z-10 bg-black/80 flex justify-center items-center'>
                                    <RotateLeft 
                                        className='animate-spin mr-2'
                                        sx={{
                                            fontSize: 22,
                                            color: '#fff',
                                        }}
                                    />
                                    Loading...
                            </p>}
                            <div className="relative bg-gray-900 rounded-md overflow-hidden">
                                <input 
                                    type={(!isShowPassword)?'password' : 'text'}
                                    placeholder="Password"
                                    name='userPassword'
                                    value={values.userPassword}
                                    autoComplete='off'
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
                        <div className='text-end mt-2'>
                            <LinkRoute 
                            type='unset'
                            href='/auth/forget-password'
                            className='text-[#fff]/90 text-[14px] py-1'>Forgot Password?</LinkRoute>
                        </div>
                        {(errors.userPassword && touched.userPassword)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userPassword}</p>:null}
                    </form>
                </div>
                <div className='relative block w-full'>
                    {(isOn && !pinOpen)&&(
                        <>
                        {(isEdit)?(
                            <button
                        className='absolute top-6 right-0 text-blue-600 text-base underline hover:text-blue-500 focus:outline-none px-1 mr-4 z-20'
                        onClick={closeEditHandler}>                            
                            Cancel
                        </button>
                        )
                        :(
                            <button
                        className='absolute top-6 right-0 text-blue-600 text-base underline hover:text-blue-500 focus:outline-none px-1 mr-4 z-20'
                        onClick={openEditHandler}>                            
                            Edit
                        </button>
                        )}
                        </>
                    )}
                    {(pinOpen)&&
                    <ParentControlPin 
                        setIsOn={setIsOn}                    
                        setPinOpen={setPinOpen}
                        pcData={readPcData}
                        setReadPcData={setReadPcData}
                        setIsEdit={setIsEdit}
                    />
                    }
                    {((pcData?.isEnable || isOn) && !pinOpen)&&
                    <ParentControlReadOnly 
                        pcData={readPcData}
                    />    
                    }
                </div>
            </div>
        </div>
    );
};
export default ParentalControls;