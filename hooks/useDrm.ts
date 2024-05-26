import { useState } from 'react';
import axios from "axios";
import { getCookie } from "@/utils";

const kid = process.env.NEXT_PUBLIC_DKID || '';
let kidEnc = kid as string;
if(kid){
    kidEnc = Buffer.from(kid).toString('base64');
}

const useDrm = () => {
    const getDrmTokens = async () => {
        const returnResponse = {
            status: '',
            data: {} as any,
        };
        try{
            let token = getCookie(`tfctDT_${kidEnc}`);
            if(token){
                token = JSON.parse(token);
                returnResponse.status = 'success';
                returnResponse.data = token;
            }else{
                // get DRM tokens from API
                const tokens = await axios ({
                    method: 'get',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/item/${kid}/dkey`,
                });
                if(tokens?.data?.data){
                    // save token in cookies with 30 day expiry
                    const tokes_string = JSON.stringify(tokens?.data?.data);
                    document.cookie = `tfctDT_${kidEnc}=${tokes_string}; max-age=${60*60*23*3}; path=/`;
                    returnResponse.status = 'success';
                    returnResponse.data = tokens?.data?.data;
                }
            }            
        } catch(e){ 
            returnResponse.status = 'error';
        }
        return returnResponse;
    }
    return { getDrmTokens };
}
export default useDrm;