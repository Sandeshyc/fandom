import client from './client';

const setEntitlementValidity = async (userId:string, data:object) => {
    console.log('data', data);    
    const url = `/entitlement/validity/${userId}`;
    console.log('url', url);
    let returnResponse = {
        status: '',
        message: '',
    };
    try {
        const response = await client.post(url, data);
        if (response?.status === 200) {
            console.log("Success case: ", response);
            returnResponse = {
                status: 'success',
                message: response?.data?.message,
            };
        }else {
            console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
                message: response?.data?.statusMessage,
            };
        }
    } catch (error) {
        console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
            message: `Oops! Something went wrong.`,
        };
    }
    return returnResponse;
}

export default setEntitlementValidity;
