import axios from 'axios';
const getOrderReceipt = async (userId: string, transactionId: string) => {
    const url = `https://sandbox-payments-api.abs-cbn.com/transactions/pdf/user-id/${userId}/transaction-id/${transactionId}`;
    const responseType = 'blob';
    let returnResponse = {
        status: '',
        data: '' as any,
    };
    try {
        const response = await axios.get(url, { responseType });
        if(response.status === 200) {            
            returnResponse = {
                status: 'success',
                data: response.data,
            };
        }else {
            console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
                data: '',
            };
        }
        
    } catch (error) {
        console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
            data: '',
        };
    }
    return returnResponse;
}
export default getOrderReceipt;