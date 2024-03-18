import axios from "axios";

const getConnect = async (accessToken:string) => {
    // console.log('accessToken ddd', accessToken);
    const url = `https://phoenix-identity-api-dev.abs-cbn.com/api/iam/get-contact?api-version=1.2`; // Need to update
    let returnResponse = {
        status: '',
        data: {} as any,
    };
    const headers = {
        "Authorization": "Bearer " + accessToken,
    };

    try { 
        const response = await axios.post(url, {}, {headers: headers});
        console.log("Connect Response: ", response);
        if (response?.status === 200) {
            returnResponse = {
                status: 'success',
                data: response?.data?.data,
            };
        }else {
            returnResponse = {
                status: 'error',
                data: {},
            };
        }   
    } catch (error) {
        console.log('error', error);
        returnResponse = {
            status: 'error',
            data: {},
        };
    }
    return returnResponse;
}

export default getConnect;