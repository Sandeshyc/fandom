import React from 'react';
import parentControlList from '@/services/json/parentControl.json';
import {
    Lock
} from '@mui/icons-material';
import Text from '@/modules/Identities/Text';
type Props = {
    pcData : any;
}
const ParentControlReadOnly = ({pcData}:Props) => {
    return (
        <div className='relative py-6 px-2 sm:px-4 w-full mt-4'>
            <div className='absolute top-0 left-0 w-full h-full bg-black/10 z-10 rounded-md cursor-not-allowed'/>
            <div className='flex flex-wrap mb-4'>
                <input type="checkbox" 
                    checked={pcData?.pinRequireRent}
                    onChange={()=>{
                        console.log('pcData: ', pcData);
                    }}
                    className='default:ring-2 w-[20px]' id='pinRequireRent'/>
                <label htmlFor="pinRequireRent" className='w-[180px] grow pl-2 text-sm sm:text-base'>Require PIN to Rent content.</label>
            </div>
            <div className='flex flex-wrap mb-0'>
                <input type="checkbox" 
                    checked={pcData?.pinRequire}
                    onChange={()=>{
                        console.log('pcData: ', pcData);
                    }}
                    className='default:ring-2 w-[20px]' id='pinRequare'/>
                <label htmlFor="pinRequare" className='w-[180px] grow pl-2 text-sm sm:text-base'>Require PIN to watch content. Choose ratings to lock from below.</label>
            </div>
            <div className='relative py-4 px-2 sm:px-4 mb-4'>
                {(Array.isArray(parentControlList) && parentControlList.length > 0) && parentControlList.map((item, index) => (
                    <div className='flex flex-wrap mb-4 last:mb-0' key={item.id}>                    
                        {(pcData?.pinRequire && pcData?.roleId === item.roleId)?(
                        <span className='flex justify-center items-center cursor-pointer border-white bg-white/90 border w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full mr-2 mt-1'>
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
                            className='flex cursor-pointer border-white border w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] rounded-full mr-2 mt-1'></span>
                        )}
                        <div className='w-[200px] grow'>
                            <div className='sm:hidden'>
                                <Text size='md'>
                                    <span className='cursor-pointer'>
                                        {item.roleName}
                                    </span>
                                </Text>    
                            </div> 
                            <div className='hidden sm:block'>
                                <Text size='xl'>
                                    <span className='cursor-pointer'>
                                        {item.roleName}
                                    </span>
                                </Text>    
                            </div>                            
                            <div className='flex flex-wrap'>
                                {(Array.isArray(item?.roles) && item.roles.length > 0) && item.roles.map((role, index) => (  
                                    <span key={index} className='border-gray-500 border px-1 mr-1 mb-1 rounded-sm text-sm whitespace-nowrap'>{role}</span>
                                ))
                                }
                                
                            </div>
                        </div>
                    </div>
                ))}               
            </div>
        </div>
    );
}
export default ParentControlReadOnly;