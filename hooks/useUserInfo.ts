import axios from 'axios';

const useUserInfo = () => {
    const checkUser = async (
        userid: string,
        providerId: string,
        email: string,
        providerName: string,
        emailVerified?: boolean,
        oneLogInAccessToken?: string,
        googleIndentityAccessToken?: string,
        isLogin: boolean = true,
        tnc: boolean = true,
        marketing: boolean = false,
    ) => {
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
        };
        console.log('data', data);
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
            window.localStorage.setItem('provider', providerName);
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
            if(oneLogInAccessToken){
              window.localStorage.setItem('oneLogInAccessToken', oneLogInAccessToken);
            }else{
              window.localStorage.setItem('googleIndentityAccessToken', googleIndentityAccessToken || 'testData');// Need to Update
            }
            let redirectUrl = localStorage.getItem('redirectUrl');
          if(!redirectUrl){
              redirectUrl = '/';
          }
          localStorage.removeItem('redirectUrl');
            window.location.replace(redirectUrl);
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