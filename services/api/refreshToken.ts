import axios from "axios";

const reqRefreshToken = async (data:object) => {
    console.log('data', data);
    const url = `https://phoenix-identity-api-dev.abs-cbn.com/iam/refresh?api-version=1.2`;
    let returnResponse = {
        status: '',
        accessToken: '',
        refreshToken: '',
    };
    try {
        const response = await axios.post(url, data);
        console.log('response refresh', response);
        if (response?.status === 200) {
            if(response?.data?.statusCode === "1") {
                returnResponse = {
                    status: 'success',
                    accessToken: response?.data?.data?.accessToken,
                    refreshToken: response?.data?.data?.refreshToken,
                };
            }else {
                returnResponse = {
                    status: 'error',
                    accessToken: '',
                    refreshToken: '',
                };
            }
        }else {
            returnResponse = {
                status: 'error',
                accessToken: '',
                refreshToken: '',
            };
        }
    } catch (error) {
        returnResponse = {
            status: 'error',
            accessToken: '',
            refreshToken: '',
        };
    }
    return returnResponse;
}
export default reqRefreshToken;