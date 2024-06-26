import axios from 'axios';
const generateQRcode = async (email:string) => {
    const url = `${process.env.NEXT_PUBLIC_QR_CODE_GENERATE_URL}/user/qr`;
    let returnResponse = {
        status: '',
        data: '',
    };
    const data = {
        email: email
    };
    try {
        const response = await axios.post(url, data);
        if(response.status === 200) {
            returnResponse = {
                status: 'success',
                data: response.data
            };
            if(response?.data?.statusCode === 404){
                returnResponse = {
                    status: 'error',
                    data: ''
                };
            }
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
export default generateQRcode;