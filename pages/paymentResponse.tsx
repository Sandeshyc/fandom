import React, { use, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';



const MyProfile = () => {
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const { productId, userid, transactionId, paymentStatus, paymentId } = router.query;
  useEffect(() => {
    if(paymentStatus){
        if(paymentStatus === 'success'){
            const entitleCall = async () => {
                const headers = {
                    'Content-Type': 'application/json',
                };      
                const data = {
                    "userID": userid,
                    "receipt": paymentId,
                    "sourcePlatform": "web",
                    "itemCode": transactionId,
                    "priceSKU": productId,
                    "pricePlan": productId,
                    "transactionId": transactionId
                };
                console.log('Data:', data);
                await axios.post(`https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/entitlement/user/${userid}`, data, { headers })
                    .then(response => {
                    if(response.status === 200) {
                        setIsSuccess(true);
                        setSuccessMessage('Payment successfull.');

                        console.log('Success:', response?.data?.createRes?.itemCode);
                        const movieID = response?.data?.createRes?.itemCode;
                        setTimeout(() => {
                            router.push(`/details/${movieID}`);        
                        }, 3000);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setIsError(true);
                    setErrorMessage('Payment failed. Please try again later.');
                }); 
            }
            entitleCall();
        }else{
            setIsError(true);
            setErrorMessage('Payment failed. Please try again later.');
        }
        // setTimeout(() => {
        //     router.push(`/details/${transactionId}`);        
        // }, 3000);
    }
  }, [paymentStatus]);
  useEffect(() => {
    // is not parent window
    if (window.self !== window.top) {
        window.parent.location.href = window.location.href;       
        return; 
    }
    setIsReady(true);
  }, []);

  return (<>
      {(isReady) && (<><SideBar />
      <div className="py-16 bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-30% to-[#271055] to-85% min-h-full">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner max-w-[1200px] mx-auto">
            <p className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4 lg:pl-6">
                Payment verification
            </p>
            <div className="lg:px-6 pb-6 text-white">
                {
                    (!isError && !isSuccess)?<>
                    <h2
                    className='text-xl mb-4'
                >
                    Payment verification is in progress...
                </h2>
                <h3
                    className='text-xl mb-4'
                >
                    Please wait for a while...
                </h3>
                <h4
                    className='text-xl text-red-600'
                >
                    Don't close this window...
                </h4></>:null
                }
                {
                    (isError)?<>
                    <h2
                    className='text-xl mb-4 text-red-800 bg-red-100 py-2 px-4 rounded-md'
                >
                    Payment failed.
                </h2>
                <h3
                    className='text-xl mb-4'
                >
                    Please try again later.
                </h3></>:null

                }
                {
                    (isSuccess)?<>
                    <h2
                    className='text-xl mb-4 text-green-800 bg-green-100 py-2 px-4 rounded-md'>
                    Payment successfull.
                </h2>
                <h3
                    className='text-xl mb-4'
                >
                    Please wait for a while...
                </h3>
                <h4
                    className='text-xl text-red-600'
                >
                    We are redirecting you to the movie page...
                </h4></>:null
                    
                    }

            </div>
          </div>
        </div>
      </div></>)}
  </>)
}

export default MyProfile;