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
                      userId: '6B4223FA-EBD3-4C8E-813D-CCFC7AEF3BE4',
                      countryCode: 'BD'
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