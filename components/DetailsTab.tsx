import React, { useEffect } from "react";
import { yearFromDate } from '@/utils/yearFromDate';
import TabTitles from '@/modules/elements/TabTitles';
import TabContents from '@/modules/elements/TabContents';
import RelatedMovies from '@/modules/components/RelatedMovies';
const DetailsTab = ({data, isPackage=false}:{data:any, isPackage?:boolean}) => {
    const [openTab, setOpenTab] = React.useState(0);
    const [tabArgs, setTabArgs] = React.useState([]); 
    // push tab args label and content
    useEffect(() => {
        let tempTabArgs = [];
        tempTabArgs.push({
            id: 'section1',
            label:'Description', 
            type:'text',
            content:data?.description
        });
        tempTabArgs.push({
            id: 'section2',
            label:'Cast & Crew',
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
                    content:data?.director
                },
                {
                    label:'Writer',
                    type:'text',
                    content:data?.writer
                }
            ]
        });
        tempTabArgs.push({
            id: 'section3',
            label:'More Info', 
            type:'arrays',
            title: 'More Info',
            content:[                
                {
                    label:'Genres',
                    type:'array',
                    content:data?.genre
                },
                {
                    label:'Release year',
                    type:'text',
                    content: (data?.publishSchedule)?yearFromDate(data?.publishSchedule as string):'' as string
                },
                {
                    label:'Duration',
                    type:'text',
                    content:data?.duration
                },
                {
                    label:'Quality',
                    type:'text',
                    content:data?.quality
                },
                {
                    label:'Rating',
                    type:'text',
                    content:data?.contentRating
                },
                {
                    label:'Production Studio',
                    type:'text',
                    content:data?.contentProvider
                },                
                {
                    label:'Language',
                    type:'text',
                    content:data?.language
                },               
                
                {
                    label:'Tags',
                    type:'array',
                    content:data?.tags
                },
            ]
        });
        setTabArgs(tempTabArgs as any);
    }, [data]);
  return (
    <>
        <TabTitles tabArgs={tabArgs} openTab={openTab} setOpenTab={setOpenTab} />
        <TabContents tabArgs={tabArgs} openTab={openTab}/>
        {(Array.isArray(data?.relatedMovies) && data?.relatedMovies?.length > 0) && (
            <RelatedMovies data={data?.relatedMovies} />
        )}
    </>);
}

export default DetailsTab;