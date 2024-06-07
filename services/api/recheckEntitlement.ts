import axios from "axios";

const recheckEntitlement = async (trainsitionId:string) => {
    const url = `/entitlement/paymentStatus/` + trainsitionId;
    let returnResponse = {
        status: ''
    };
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, { timeout: 10000 });
        if(response.status === 200 || response.status === 201) {
            returnResponse = {
                status: 'success'
            };
        }else if(response.status === 204) {
            returnResponse = {
                status: 'noChange'
            };
        }else{
            returnResponse = {
                status: 'error'
            };
        }
    } catch (error:any) {
        console.log("Error case: ", error);
        returnResponse = {
            status: 'error'
        };
    }
    return returnResponse;
}

export default recheckEntitlement;
