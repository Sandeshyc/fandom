import axios from "axios";

const getEntitlementList = async (userId:string) => {
    const url = `/entitlement/user/${userId}?childs=true`;
    let returnResponse = {
        status: '',
        data: {} as any
    };
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_DATA_API + url, { timeout: 10000 });
        if(response.status === 200) {
            returnResponse = {
                status: 'success',
                data: response.data
            };
        }else {
            returnResponse = {
                status: 'error',
                data: {} as any
            };
        }
    } catch (error) {
        returnResponse = {
            status: 'error',
            data: {} as any
        };
    }
    return returnResponse;
}

export default getEntitlementList;
