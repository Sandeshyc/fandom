import client from './client';

const getProfile = async (userId:string) => {
    const url = `user/${userId}/profile/`;
    let returnResponse = {
        status: '',
        data: {} as any
    };
    try {
        const response = await client.get(url);
        if(response.status === 200) {
            // console.log("Success case: ", response);
            returnResponse = {
                status: 'success',
                data: response.data
            };
        }else {
            // console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
                data: {} as any
            };
        }
    } catch (error) {
        // console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
            data: {} as any
        };
    }
    return returnResponse;
}

export default getProfile;
