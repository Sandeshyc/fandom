import axios from 'axios';
const reChapchaTokenVerify = async (token: string) => {
    // Google reCaptcha v3
    // const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`;
    let returnResponse = {
        status: ''
    };
    // cross origin issue
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    };
    try {
        // const response = await axios.post(url);
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, headers, {
            params: {
                secret: process.env.NEXT_PUBLIC_RECAPTHA_SECRET_KEY,
                response: token,
            },
        });
        console.log("response::::::::: ", response);
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
        console.log("error::::::::: ", error);
        returnResponse = {
            status: 'error'
        };
    }
}
export default reChapchaTokenVerify;