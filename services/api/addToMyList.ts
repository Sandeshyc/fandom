import client from './client';

const addToMyList = async (userId:string, itemId:string) => {
    console.log("addToMyList: ", userId, itemId);
    const url = `/user/${userId}/watchlist`;
    let returnResponse = {
        status: '',
        message: '',
    };
    const data = {
        watchList: [itemId],
      };
    try {
        const response = await client.post(url, data);
        if (response?.status === 200) {
            console.log("Success case: ", response);
            returnResponse = {
                status: 'success',
                message: response?.data?.message,
            };
        }else {
            console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
                message: response?.data?.statusMessage,
            };
        }
    } catch (error) {
        console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
            message: `Oops! Something went wrong.`,
        };
    }
    return returnResponse;
}

export default addToMyList;
