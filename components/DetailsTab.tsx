import React, { useEffect } from "react";
import TabTitles from '@/modules/elements/TabTitles';
import TabContents from '@/modules/elements/TabContents';
const DetailsTab = ({data}:{data:any}) => {
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
                },
                {
                    label:'Director',
                    type:'text',
                    content:data?.author
                }
            ]
        });
        setTabArgs(tempTabArgs as any);
    }, [data]);

  return (
    <>
      <div className="w-full">
            <TabTitles tabArgs={tabArgs} openTab={openTab} setOpenTab={setOpenTab} />
            <TabContents tabArgs={tabArgs} openTab={openTab}/>
        </div>
    </>);
}

export default DetailsTab;