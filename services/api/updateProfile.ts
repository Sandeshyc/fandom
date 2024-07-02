import client from './client';

const updateProfile = async (data:object) => {
    const url = `/user/profile`;
    let returnResponse = {
        status: ''
    };
    try {
        const response = await client.post(url, data);
        if(response.status === 200) {
            // console.log("Success case: ", response);
            returnResponse = {
                status: 'success',
            };
        }else {
            // console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
            };
        }
    } catch (error) {
        // console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
        };
    }
    return returnResponse;
}

export default updateProfile;
