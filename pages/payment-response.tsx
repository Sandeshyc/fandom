import React, { use, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import NavigationHome from '@/modules/elements/NavigationHome';
import Footer from '@/components/Footer';
import SkeletonMyProfile from '@/components/Skeleton/SkeletonMyProfile';
import { set } from 'lodash';
import {
    Loop
} from '@mui/icons-material';



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
                const itemCode = window.localStorage.getItem('itemCode');
                const headers = {
                    'Content-Type': 'application/json',
                };      
                const data = {
                    "userID": userid,
                    "receipt": paymentId,
                    "sourcePlatform": "web",
                    "transactionId": transactionId,
                };
                // console.log('Data:', data);
                // console.log('URL:', `${process.env.NEXT_PUBLIC_API_URL}/entitlement/user/${userid}`)
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/entitlement/user/${userid}`, data, { headers })
                    .then(response => {
                        // console.log('Response:', response);
                        if(response.status === 200 || response.status === 201 || response.status === 204) {
                            setIsSuccess(true);
                            setSuccessMessage('Payment successfull.');

                            // console.log('Success:', response?.data?.createRes?.itemCode);
                            const movieID = response?.data?.createRes?.itemCode;
                            setTimeout(() => {
                                // remove browser history /payment/
                                // window.history.pushState(null, '', `/details/${itemCode}`);                            

                                // router.push(`/details/${itemCode}`);
                                // router.replace(`/details/${itemCode}`);
                                router.replace(`/details/${itemCode}`);
                            }, 2000);
                        }else{
                            setIsError(true);
                            setErrorMessage('Something went wrong. Please try again later.');
                            setTimeout(() => {
                                router.replace(`/`);
                            }, 4000);
                        }
                    }
                )
                .catch(error => {
                    console.error('Error:', error);
                    setIsError(true);
                    setErrorMessage('Something went wrong. Please try again later.');
                    setTimeout(() => {
                        router.replace(`/`);
                    }, 4000);
                }); 
            }
            entitleCall();
        }else{
            setIsError(true);
            setErrorMessage('Something went wrong. Please try again later.');
        }
        // setTimeout(() => {
        //     router.push(`/details/${transactionId}`);        
        // }, 3000);
    }
  }, [paymentStatus]);

  useEffect(() => {
    // is not parent window
    if (window.self !== window.top) {
        window.parent.location.replace(window.location.href);       
        // return; 
    }
    setIsReady(true);
  }, []);

  return (<>
      {(isReady) && (<><NavigationHome />
      <div className="py-16  min-h-[80vh]">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner max-w-[1200px] mx-auto mt-16">
            <h1 className="text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-4 lg:pl-6">
            <Loop className='animate-spin'
            /> Redirecting... 
            </h1>
            <div className="lg:px-6 pb-6 text-white">
                <h3 className='text-xl mb-4'>
                    Please wait for a while...
                </h3>
                {(isError)?<>
                    <h2 className='text-xl mb-4 text-red-800 bg-red-100 py-2 px-4 rounded-md'>
                        {errorMessage}
                </h2></>:null
                }
                {(isSuccess)?<>
                    <h2 className='text-xl mb-4 text-green-800 bg-green-100 py-2 px-4 rounded-md'>
                        {successMessage}
                </h2></>:null
                }
            </div>
          </div>
        </div>
      </div><Footer/></>)}
  </>)
}

export default MyProfile;