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
        const headers = {
            'Content-Type' : 'application/json',
        };   
        const data = {
            "providerId": providerId,
            "email": email,
            "providerName": providerName,
            "emailVerified": emailVerified,
            "tnc": tnc,
            "marketing": marketing,
            "firstName": firstName,
            "lastName": lastName,
            "birthday": birthDate,
            "phone": phoneNumber,
        };
        // console.log('data', data);
        // return false;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/info`, data, { headers })
        .then(response => {
        // console.log('response', response);
        if(response.data?.status === 200 || response.data?.status === 201) {
          if(isLogin){
            const userInfoData = response.data?.data;
            const userInfo = {
              sub: userInfoData?.userId,
              email: userInfoData?.email,
              uid: userInfoData?.userId,
              providerName: userInfoData?.providerName,
              emailVerified: emailVerified,
            }
            const userSession = {
              userId: userInfoData?.userId,
              email: userInfoData?.email,
              providerName: userInfoData?.providerName,
              emailVerified: emailVerified,
              accessToken: userInfoData?.accessToken,
            }
            const _getFingerPrintId = async () => {
              const response = await getFingerPrintId();
              if(response.status === 'success'){
                  setFingerPrintId(response.fingerPrintId);
              }
            }
            _getFingerPrintId();
            const _setUserEventRecord = async () => {
              const eventData = {
                "eventType": "Login",
                  "data": {
                      "deviveId": fingerPrintId,
                      "sessionId": userInfoData?.accessToken,
                      "userId": userInfoData?.userId,
                      "time": new Date().toISOString(),
                  }
              };
              await setEventRecord(eventData);
            }
            _setUserEventRecord();
            window.localStorage.setItem('provider', providerName || userInfoData?.providerName);
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.localStorage.setItem('accessToken', accessToken || '');
            let callbackAction = localStorage.getItem('callbackAction');
            if(callbackAction === 'rent'){
              let callbackParams = localStorage.getItem('callbackParams');
              if(callbackParams){
                const callbackParamsObj = JSON.parse(callbackParams);
                const {itemCode, priceSKU, isPackage, transactionId, itemUrl} = callbackParamsObj;
                let forwordPurchaseUrl = `${process.env.NEXT_PUBLIC_SSO_DOMAIN}`;
                if(itemUrl){
                  forwordPurchaseUrl += itemUrl;
                }
                localStorage.removeItem('callbackAction');
                localStorage.removeItem('callbackParams');
                window.location.replace(forwordPurchaseUrl);
              }else{
                window.location.href = '/bini';
              }
            }else{
              let redirectUrl = localStorage.getItem('redirectUrl');
              if(!redirectUrl){
                  redirectUrl = '/bini';
              }
              localStorage.removeItem('redirectUrl');
              window.location.replace(redirectUrl);
            }            
          }
          return 200;
        }else{
        //   console.log('error', response.data?.message);
        //   return response.data?.message;
          return 400;
        }
      })
      .catch(error => {
        // console.log('error', error);
        // return error;
        return 400;
      });
        return response;
    }
    return {checkUser};
}
export default useUserInfo;