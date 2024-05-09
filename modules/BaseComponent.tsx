import React from 'react'
import { useQuery } from '@apollo/client';
import queryMap from './queries'
import GetComponent from '@/modules/skeletons';
import ErrorPopUp from "@/modules/elements/ErrorPopUp";

const BaseComponent = (props:any) => {
  // console.log('BaseComponent ', props);
    const {module} = props
    // console.log('BaseComponentddd ', module);
    if (queryMap[module.sourceType]) {
      // console.log('BC ',{id: module.itemCode ?? module.source ?? "", userId: module.userId})
      const { loading, error, data: gqData } = useQuery(queryMap[module.sourceType], 
        {variables: {input: {id: module.itemCode ?? module.source ?? "", 
          userId: module.userId,
          countryCode: module.countryCode
        }}});
      // console.log('GQL DATA ', module, gqData, 'Loading', loading, error)
      let data = gqData?.[module.sourceType]?.items;
      // console.log('GQL DATA: ', module, 'gqData: ',gqData, 'data:',data);
      if (module.sourceType === 'content' 
        || module.sourceType === 'playlistHeader'
        || module.sourceType === 'bundleHeader'
        || module.sourceType === 'tvshow'
        || module.sourceType === 'tvshows'
        || module.sourceType === 'channel'
        || module.sourceType === 'channels') {
        data = gqData?.[module.sourceType];
        // console.log('GQL DATA dddd ');
      }
      // console.log('GQL DATA ', module, gqData)
      if (loading || 0 ) return (
        <>
          <GetComponent displayType={module?.displayType as string} />
        </>
      );
      if (error && 1) return (
        <ErrorPopUp message={"Sorry, Something went wrong!"} errorMsg={`GQL Error :${module?.sourceType as string} => ${module?.displayType as string} => ${module?.title as string} => ${error}`}/>
      );

      const newChild = React.cloneElement(props.children, {
          data,
          items: data,
        });
      // return <>{newChild}<GetComponent displayType={module?.displayType as string} /></>
      return <>{newChild}</>
    } else {
      return <>{props.children}</>
    }

}

export default BaseComponent;