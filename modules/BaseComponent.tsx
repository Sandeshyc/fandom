import React from 'react'
import { useQuery } from '@apollo/client';
import queryMap from './queries'


const BaseComponent = (props) => {

    const {module} = props
    console.log('MODULE ****** ', module)
    if (queryMap[module.sourceType]) {
      const { loading, error, data: gqData } = useQuery(queryMap[module.sourceType], 
        {variables: {input: {id: module.itemCode ?? module.source, userId: module.userId}}});
      let data = gqData?.[module.sourceType]?.items;
      if (module.sourceType === 'content' || module.sourceType === 'playlistHeader') {
        data = gqData?.[module.sourceType];
      }
      if (loading) return <p></p>;
      if (error) return <p>BillboardSlider Error : {error.message}</p>;

      const newChild = React.cloneElement(props.children, {
          data,
        });
      return <>{newChild}</>
    } else {
      return <>{props.children}</>
    }

}

export default BaseComponent;