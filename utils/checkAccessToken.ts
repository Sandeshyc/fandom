var jwt = require('jsonwebtoken');
const checkAccessToken = async (accessToken:string) => {
    try {
        const decode = jwt.decode(accessToken);
        if(decode){
            const exp = decode.exp;
            const current = Math.floor(Date.now() / 1000);
            // console.log('exp', exp);
            // console.log('current', current);
            if(exp < current){
                return false;
            }
            return decode;
        }else{
            return false;        
        }
    }
    catch (error) {
        return false;
    }
}
export default checkAccessToken;