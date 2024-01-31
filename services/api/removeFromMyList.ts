import axios from "axios";

const removeFromMyList = async (userId:string, itemId:string) => {
    console.log("addToMyList: ", userId, itemId);
    const url = `https://87kabuhi3g.execute-api.ap-southeast-1.amazonaws.com/dev/user/${userId}/watchlist`;
    let returnResponse = {
        status: '',
        message: '',
    };
    const headers = {
        "Content-Type": "application/json",
    };
    const data = {
        watchList: [itemId],
    };
    try {
        const response = await axios.delete(url, { headers, data });
        if (response?.status === 200) {
            console.log("Success case x: ", response);
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

export default removeFromMyList;
