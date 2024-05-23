import {
    cookies
} from 'next/headers';
const setUserCookieSession = async (userSession:any) => {
    let returnResponse = {
        status: ''
    };
    try {
        cookies().set("session", JSON.stringify(userSession) , {
            maxAge: 60 * 60 * 24 * 30
        });
        returnResponse = {
            status: 'success',
        };
    } catch (error) {
        console.log("Error case: ", error); 
        returnResponse = {
            status: 'error',
        };
    }
    return returnResponse;
}

export default setUserCookieSession;
