import React, { useEffect } from "react";
import TabTitles from '@/modules/elements/TabTitles';
import TabContents from '@/modules/elements/TabContents';
const DetailsTab = ({data}:{data:any}) => {
    // console.log('DetailsTab: ', data);
    const [openTab, setOpenTab] = React.useState(0);
    const [tabArgs, setTabArgs] = React.useState([]); 
    // push tab args label and content
    useEffect(() => {
        let tempTabArgs = [];
        tempTabArgs.push({
            label:'Description', 
            type:'text',
            content:data?.description
        });
        tempTabArgs.push({
            label:'Casts',
            type:'arrays',
            content: [
                {
                    label:'Cast',
                    type:'array',
                    content:data?.cast
                },
                {
                    label:'Director',
                    type:'text',
                    content:data?.author
                }

            ]
        });
        tempTabArgs.push({
            label:'Others', 
            type:'arrays',
            content:[
                {
                    label:'Tags',
                    type:'array',
                    content:data?.tags
                },
                {
                    label:'Genres',
                    type:'array',
                    content:data?.genre
                }
            ]
        });
        setTabArgs(tempTabArgs as any);
    }, [data]);
    // console.log('tabArgs', tabArgs);
  return (
    <>
      <div className="w-full">
            <TabTitles tabArgs={tabArgs} openTab={openTab} setOpenTab={setOpenTab} />
            <TabContents tabArgs={tabArgs} openTab={openTab}/>
        </div>
    </>);
}

export default DetailsTab;