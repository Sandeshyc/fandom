import axios from 'axios';
const reChapchaTokenVerify = async (token: string) => {
    let url = `${process.env.NEXT_PUBLIC_DATA_API}/utility/validateGoogleRecapV3/`;
    let returnResponse = {
        status: ''
    };
    try {
        const body = {
            token: token
        };
        const response = await axios.post(url, body);
        // console.log('response:::', response);
        if(response.status === 200) {
            returnResponse = {
                status: 'success'
            };
        }else {
            returnResponse = {
                status: 'error'
            };
        }
    } catch (error) {
        // console.log("error::::::::: ", error);
        returnResponse = {
            status: 'error'
        };
    }
    return returnResponse;
}
export default reChapchaTokenVerify;