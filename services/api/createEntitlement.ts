import client from './client';
const createEntitlement = async (userId:string, data:object) => {
    const url = `/entitlement/user/${userId}`;
    let returnResponse = {
        status: '',
        data: '',
    };
    try {
        const response = await client.post(url, data);
        // console.log('xxx Response:', response);
        if(response.status === 200 || response.status === 201 || response.status === 204) {
            returnResponse = {
                status: 'success',
                data: response.data
            };
        }else {
            returnResponse = {
                status: 'error',
                data: ''
            };
        }
    }catch(error:any) {
        returnResponse = {
            status: 'error',
            data: ''
        };
    }
    
    return returnResponse;
}
export default createEntitlement;