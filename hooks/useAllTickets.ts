import { useQuery } from '@apollo/client';
import queryMap from '@/modules/queries';

const useAllTickets = () => {
    const getAllTickets = async (userid: string, countryCode:string) => {
      console.log('saim allTickets: ', userid, countryCode);
      try{
        const { loading, error, data: gqData } = useQuery(queryMap['purchasesAll'], 
          {variables: 
              {input: 
                  { 
                      userId: userid,
                      countryCode: countryCode
                  }
              }
          }
      );
      console.log('saim gqData: ', gqData);
      let purchasesAll = gqData?.purchasesAll?.items;
      console.log('saim allTickets: ', purchasesAll);
      return purchasesAll;
      }catch(e){
        return e;
      }
    }
    return {getAllTickets};
}
export default useAllTickets;