import { useState } from 'react';
import axios from 'axios';
import setUserCookieSession from '@/services/api/setUserCookieSession';
import {
  auditEntitlement,
  getFingerPrintId,
  setEventRecord
} from '@/services/api'

type Props = {
  userid: string;
  providerId: string;
  email: string;
  providerName: string;
  emailVerified?: boolean;
  accessToken?: string;
  isLogin?: boolean;
  tnc?: boolean;
  marketing?: boolean;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phoneNumber?: string;
};
const useUserInfo = () => {
  const [fingerPrintId, setFingerPrintId] = useState('');
    const checkUser = async ({
      userid,
      providerId,
      email,
      providerName,
      emailVerified,
      accessToken,
      isLogin = true,
      tnc = true,
      marketing = false,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
  }:Props) => {

        const encodedEmail = encodeURIComponent(email);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/email/?email=${encodedEmail}`)
        .then(response => {
        console.log('response :: ', response.data);
        if(response.data?.userId) {
          if(isLogin){
            const userInfoData = response.data;
            const userInfo = {
              sub: userInfoData?.userId,
              email: userInfoData?.email,
              uid: userInfoData?.userId,
              providerName: userInfoData?.providerName,
              emailVerified: emailVerified,
            }

            window.localStorage.setItem('provider', providerName || userInfoData?.providerName);
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.localStorage.setItem('accessToken', accessToken || '');
            window.location.href = '/bini';            
          }
          return 200;
        }else{
          console.error('error', response.data?.message);
          return 400;
        }
      })
      .catch(error => {
        console.error('error', error);
        return 400;
      });
      return response;
    }
    return {checkUser};
}
export default useUserInfo;