import React, {useState, useEffect} from 'react';
import PinInput from '@/modules/Identities/PinInput';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import {
    Lock
} from '@mui/icons-material';
import parentControlList from '@/services/json/parentControl.json';
const ParentControlPin = () => {
    const [pinRequire, setPinRequire] = useState(false);
    const [roleName, setRoleName] = useState('');
    const storeRoles = () => {
        if(pinRequire){
            // get the selected roles
            const selectedRoles = parentControlList.filter((item) => item.roleId === roleName);
            if(selectedRoles.length > 0){
                const data = {
                    "isEnable": true,
                    "pin": "1234",
                    "roleId": selectedRoles[0]?.roleId,
                    "roleName": selectedRoles[0]?.roleName,
                    "role": selectedRoles[0]?.roles
                }
                console.log('data: ', data);
            }
        }
    }
    return (
        <div>
            <div className='flex flex-wrap'>
                <div className='w-full sm:w-[60%]'>
                    <Title tag='h4' size='xl'>Set an account owner PIN</Title>
                    <Text size='base'>
                        Your PIN will be used to switch from kid to adult profiles, access restricted content, or when downloading.
                    </Text>
                </div>
                <div className='w-full sm:w-[40%] sm:flex sm:justify-end'>
                    <PinInput length={4} />
                </div>
            </div>
            <div className='flex flex-wrap mb-4'>
                <input type="checkbox" 
                    checked={pinRequire}
                    onChange={() => setPinRequire(!pinRequire)}
                    className='default:ring-2 w-[20px]' id='pinRequare'/>
                <label htmlFor="pinRequare" className='w-[180px] grow pl-2'>Require PIN to watch content. Choose ratings to lock from below.</label>
            </div>
            <div>
                {(Array.isArray(parentControlList) && parentControlList.length > 0) && parentControlList.map((item, index) => (
                    <div className='flex flex-wrap mb-4' key={item.id}>                    
                        {(roleName === item.roleId)?(
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
            </div>
            <div>
                <button 
                onClick={storeRoles}
                className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                    Save
                </button>
            </div>
        </div>
    );
}
export default ParentControlPin;