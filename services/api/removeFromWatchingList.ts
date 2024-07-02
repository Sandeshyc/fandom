import client from './client';

const removeFromWatchingLists = async (userId:string, itemId:string) => {
    const url = `/user/${userId}/playerEvent`;
    let returnResponse = {
        status: '',
        message: '',
    };
    const data = {
        itemCode: itemId,
    };
    try {
        const response = await client.delete(url, {data});
        if (response?.status === 200) {
            console.log("Success case x: ", response);
            returnResponse = {
                status: 'success',
                message: 'Item removed from your list.',
            };
        }else {
            console.log("Error try: ", response);
            returnResponse = {
                status: 'error',
                message: 'Oops! Something went wrong.',
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

export default removeFromWatchingLists;
