import React, { useEffect, useState } from 'react';
import { stableKeys } from '@/utils/stableKeys';
import {capFirstLetter} from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import WithNavMenu from '@/modules/elements/scrollSpy/NavMenu';
const MovieDetailsTab2 = ({data}:{data:any}) => {
    const [mainNavHeight, setMainNavHeight] = useState(0);
    const [navbarTop, setNavbarTop] = useState(0);
    const [tabArgs, setTabArgs] = React.useState([]);
    const [relaseYear, setRelaseYear] = useState('');
    useEffect(() => {
        if(data?.publishSchedule){
            setRelaseYear(yearFromDate(data?.publishSchedule as string) as any);
        }
        let tempTabArgs = [];
        tempTabArgs.push({
            label:'Description', 
            type:'text',
            content:data?.description
        });
        tempTabArgs.push({
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
                    content: relaseYear as string
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
                    label: 'Released year',
                    type: 'text',
                    content: data?.publishSchedule
                },
                {
                    label:'Tags',
                    type:'array',
                    content:data?.tags
                },
            ]
        });
        tempTabArgs.push({
            label: 'Related Movies',
            type: 'text',
            content: 'Related Movies'
        });
        setTabArgs(tempTabArgs as any);
    }, [data]);
  return (
    <div className='text-white z-10 relative bg-black'>
        <div className='container mx-auto px-4'>
            {(Array.isArray(tabArgs) && tabArgs.length > 0)&&(
                <WithNavMenu 
                selector="section">
                    {
                    tabArgs?.map((tab:any, index:number) => {
                        return (
                            <section 
                                key={stableKeys[index]} 
                                id={`section${index}`} 
                                data-nav-title={tab.label} 
                                data-scrollspy>
                                <div className='min-h-[260px] mx-auto pb-8 mb-8 border-b border-gray-600'>
                                    <div className='mt-4'> 
                                        {(tab?.title)&&<Title tag='h3' size='2xl'>{tab.title}</Title>}                                      
                                        {(tab.type === 'text') && (
                                            <div className='text-white/80'>
                                                <Text size='lg'>{tab.content}</Text>
                                            </div>
                                        )}
                                        {(tab.type === 'arrays') && (                              
                                            <div>
                                                {tab?.content?.map((item:any, index:number) => {
                                                    return (
                                                        <div key={stableKeys[index]} className='my-3'>
                                                        {(item.type === 'text' && (item?.content)) && (
                                                            <p className="mb-1 md:mb-2 last:mb-0 text-gray-300">
                                                            <span className="text-white">{item.label}: </span>
                                                                {item.content}
                                                            </p>
                                                        )}
                                                        {(item.type === 'array' && Array.isArray(item?.content) && item?.content?.length > 0) && (
                                                            <p className="mb-1 md:mb-2 last:mb-0 text-gray-300">
                                                            <span className="text-white">{item.label}: </span>
                                                                {capFirstLetter(item?.content?.join(", "))}
                                                            </p>
                                                        )}
                                                        </div>
                                                    )
                                                })}
                                            </div> 
                                        )}
                                    </div>
                                </div>
                            </section>
                        )
                    })
                    }
                </WithNavMenu>
            )} 
        </div>
    </div>
  );
}

export default MovieDetailsTab2;