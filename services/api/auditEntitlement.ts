import client from './client';

const auditEntitlement = async (data:object) => {
    const url = `/entitlement/audit`;
    let returnResponse = {
        status: '',
        transitionId: ''
    };
    try {
        const response = await client.post(url, data);
        console.log("response: ", response);
        if(response.status === 200) {
            console.log("Success case: ", response);
            returnResponse = {
                status: 'success',
                transitionId: ''
            };
        }else {
            console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
                transitionId: ''
            };
        }
    } catch (error:any) {
        console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
            transitionId: ''
        };
        if(error?.response?.status === 400) {
            console.log("Error 400: ", error.response);
            if(error?.response?.data?.statusCode === '40002') {
                returnResponse = {
                    status: 'purcahsed',
                    transitionId: ''
                };
            }else{
                // console.log("trainsitionId: ", error?.response?.data?.data?.transactionId);
                returnResponse = {
                    status: (error?.response?.data?.data?.transactionId) ? 'process' : 'error',
                    transitionId: error?.response?.data?.data?.transactionId
                };
            }            
        }else{
            returnResponse = {
                status: 'error',
                transitionId: ''
            };
        }
    }
    return returnResponse;
}

export default auditEntitlement;
