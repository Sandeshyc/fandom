import axios from "axios";
import useUser from "@/hooks/useUser";

// make a API call to save player event log
const usePlayerEvent = () => {
    const { getUserId } = useUser();
  // make a axios post call to save player event log
    const logPlayerEvent = async (data: any) => {
        const userId = getUserId();
        // console.log('savePlayerEvent', data);
        // console.log('savePlayerEvent res', res);
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/playerEvent`, data);
            return res;
        }catch(e){
            console.log(e);
            return e;
        }

    };
    return {
        logPlayerEvent
    };
};

export default usePlayerEvent;