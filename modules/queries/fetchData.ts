import { useQuery } from '@apollo/client';
import queryMap from '@/modules/queries';

type dataProps = {
    module: any,
    moduleName: String
}

const fetchData = (inputProps: dataProps) => {
  
    const module = inputProps
    console.log('FETCH DATA ************** ', module)
    const moduleQuery = queryMap[module?.name];
    if (!moduleQuery) return {};
    const { loading, error, data: gqData } = useQuery(moduleQuery, 
      {variables: {input: {id: module.itemCode || module.source, userId: module.userId}}});
    const data = gqData?.content;
    if (loading) return console.log('FETCH DATA LOADING ', module.name, );
    if (error) console.log('FETCH DATA ERRR********** ', module.name, error.message)
    console.log('FETCH DATA RETURN********** ',module.name, '********** ', data)
    return data;
}

export default fetchData;