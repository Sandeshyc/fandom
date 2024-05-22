import {
    cookies
} from 'next/headers';
const userCookieSession = (userSession:any) => {
    cookies().set("session", JSON.stringify(userSession) , {
        maxAge: 60 * 60 * 24 * 30
    });
}
export default userCookieSession;