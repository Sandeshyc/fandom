import React, {useState, useEffect} from 'react';
import PinInput from '@/modules/Identities/PinInput';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import {
    updateProfile
} from '@/services/api';
import {
    Lock
} from '@mui/icons-material';
import parentControlList from '@/services/json/parentControl.json';
type Props = {
    setIsOn: (isOn: boolean) => void;
    setPinOpen: (pinOpen: boolean) => void;
    pcData: any;
    setReadPcData: (pcData: any) => void;
}
const ParentControlPin = (
    {setIsOn, setPinOpen, pcData, setReadPcData}: Props
) => {
    const [userid, setUserid] = React.useState('');
    const [pinRequire, setPinRequire] = useState(pcData?.pinRequire);
    const [pinRequireRent, setPinRequireRent] = useState(pcData?.pinRequireRent || false);
    // console.log('pinRequireRent: ', pinRequireRent)
    const [roleName, setRoleName] = useState(pcData?.roleId);
    const [pin, setPin] = useState(pcData?.pin);
    const [validateError, setValidateError] = useState('');
    const storeRoles = () => {
        let parentalControl = {};
        if(pinRequire){
            // get the selected roles
            const selectedRoles = parentControlList.filter((item) => item.roleId === roleName);
            // console.log('selectedRoles: ', selectedRoles);
            if(selectedRoles.length > 0 && Array.isArray(selectedRoles[0]?.roles) && selectedRoles[0]?.roles.length > 0){
                parentalControl = {
                    "isEnable": true,
                    "pinRequire": true,
                    "pinRequireRent": (pinRequireRent)?true:false,
                    "pin": pin,
                    "roleId": selectedRoles[0]?.roleId,
                    "roleName": selectedRoles[0]?.roleName,
                    "role": selectedRoles[0]?.roles
                }
                // console.log('data: ', parentalControl);
                setValidateError('');
            }else{
                setValidateError('Please select a role');
            }
        }else{
            parentalControl = {
                "isEnable": true,
                "pinRequire": false,
                "pinRequireRent": (pinRequireRent)?true:false,
                "pin": pin,
                "roleId": '',
                "roleName": '',
                "role": []
            }
            // console.log('data: ', parentalControl);
            setValidateError('');        
        }
        const data = {
            userId: userid,
            parentalControl: parentalControl
        }
        const _updateProfile = async () => {
            // console.log('data: ', data);
            const response = await updateProfile(data);
            if(response.status === 'success') {
                setPinOpen(false);
                setIsOn(true);    
                setReadPcData(parentalControl);            
            }else{
                setValidateError('Something went wrong');
            }
        }
        if(Object.hasOwnProperty.call(parentalControl, 'isEnable')){
            _updateProfile();
        }else{
            setValidateError('Please select a role');        
        }
    }
    const handleOtpChange = (pin:any) => {
        setPin(pin);
    };
    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
          const userInfoObj = JSON.parse(userInfo);
          if(userInfoObj.sub) {
            setUserid(userInfoObj.sub);
          }
        }
    }, []);
    return (
        <div className='mt-8'>
            <div className='flex flex-wrap mb-4'>
                <div className='w-full sm:w-[60%]'>
                    <Title tag='h4' size='xl'>Set an account owner PIN</Title>
                    <Text size='base'>
                        Your PIN will be used to switch from kid to adult profiles, access restricted content, or when downloading.
                    </Text>
                </div>
                <div className='w-full sm:w-[40%] sm:flex sm:justify-end'>
                    <PinInput 
                    pin={pin}
                    length={4} 
                    onChange={handleOtpChange}
                    />
                </div>
            </div>
            <div className='relative p-4'>
                {(pin?.length !== 4) && (
                    <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-10 rounded-md cursor-not-allowed'/>
                )}
                <div className='flex flex-wrap mb-4'>
                    <input type="checkbox" 
                        checked={pinRequireRent}
                        onChange={() => setPinRequireRent(!pinRequireRent)}
                        className='default:ring-2 w-[20px]' id='pinRequireRent'/>
                    <label htmlFor="pinRequireRent" className='w-[180px] grow pl-2'>Require PIN to Rent content.</label>
                </div>
                <div className='flex flex-wrap mb-0'>
                    <input type="checkbox" 
                        checked={pinRequire}
                        onChange={() => setPinRequire(!pinRequire)}
                        className='default:ring-2 w-[20px]' id='pinRequare'/>
                    <label htmlFor="pinRequare" className='w-[180px] grow pl-2'>Require PIN to watch content. Choose ratings to lock from below.</label>
                </div>
                <div className='relative p-4 mb-4'>
                    {(!pinRequire) && (
                        <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-10 rounded-md cursor-not-allowed'/>
                    )}
                    {(Array.isArray(parentControlList) && parentControlList.length > 0) && parentControlList.map((item, index) => (
                        <div className='flex flex-wrap mb-4 last:mb-0' key={item.id}>                    
                            {(pinRequire && roleName === item.roleId)?(
                            <span className='flex justify-center items-center cursor-pointer border-white bg-white/90 border w-[24px] h-[24px] rounded-full mr-2 mt-1'>
                                <Lock 
                                    sx={{
                                        fontSize: 16,
                                        color: '#222'
                                    }}
                                />
                            </span>
                            )
                            :                    
                            (
                                <span 
                                onClick={() => setRoleName(item.roleId)}
                                className='flex cursor-pointer border-white border w-[18px] h-[18px] rounded-full mr-2 mt-1'></span>
                            )}
                            <div className='w-[200px] grow'>
                                <Text size='xl'>
                                    <span className='cursor-pointer' onClick={() => setRoleName(item.roleId)}>
                                        {item.roleName}
                                    </span>
                                </Text>                            
                                <div className=''>
                                    {(Array.isArray(item?.roles) && item.roles.length > 0) && item.roles.map((role, index) => (  
                                        <span key={index} className='border-gray-500 border px-1 mr-1 mb-1 rounded-sm text-sm'>{role}</span>
                                    ))
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    ))} 
                    {(validateError)&&
                    <p className='text-sm text-red-600 mb-6'>{validateError}</p>
                    }               
                </div>
                <div>
                    <button 
                    onClick={storeRoles}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                        Save
                    </button>                    
                </div>
            </div> 
        </div>
    );
}
export default ParentControlPin;