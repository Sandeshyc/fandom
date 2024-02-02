import axios from 'axios';

const useAllTickets = () => {
    const getAllTickets = async (userid: string) => {
      const headers = {
          'Content-Type' : 'application/json',
      };  
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/content/user/${userid}`, { headers });
        if(response.status === 200) {
          return response.data;
        }else{
          return response.data;
        }
      }catch(e){
        return e;
      }
    }
    return {getAllTickets};
}
export default useAllTickets;