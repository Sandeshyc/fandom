import React, { useEffect, useState } from 'react';
import { stableKeys } from '@/utils/stableKeys';
import {capFirstLetter} from '@/utils/capFirstLetter';
import { yearFromDate } from '@/utils/yearFromDate';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
// @ts-ignore
import ScrollSpy from 'react-scrollspy-navigation';
const MovieDetailsTab = ({data, isPackage=false}:{data:any, isPackage?:boolean}) => {
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
        if(!isPackage){
            tempTabArgs.push({
                label:'Related Movies',
                type:'text',
                content:'Related Movies'
            });
        }
        setTabArgs(tempTabArgs as any);
    }, [data]);

    useEffect(() => {
        const handleScroll = () => {
            const mainNavbar = document.querySelector('.mainNavbar');
            if(mainNavbar) {
                const mainNavbarBound = mainNavbar?.getBoundingClientRect();
                setMainNavHeight(mainNavbarBound?.height);
            }

            const navBar = document.querySelector('.ScrollSpyNav');
            if(navBar) {
                const navBarBound = navBar?.getBoundingClientRect();
                setNavbarTop(navBarBound?.top);
                console.log('navBarBound: ', mainNavHeight, 'navbarTop: ', navbarTop);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='text-white z-10 relative bg-black'>
            <div className='container mx-auto px-4'>
                <div className="ScrollSpyNav">
                    <div className={`mb-8 ${(mainNavHeight > navbarTop) ? 'z-50 fixed w-full left-0 bg-black' : ''}`}
                    style={{top: `${mainNavHeight}px`}}>
                        <div className='container mx-auto border-b border-gray-600 flex lg:pt-4 text-base overflow-x-auto'>
                            {(Array.isArray(tabArgs) && tabArgs.length > 0)&&(
                                <ScrollSpy>
                                    {
                                    tabArgs?.map((tab:any, index:number) => {
                                        return (
                                            <a key={stableKeys[index]} href={`#ssection${index}`} className='block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap' ref={React.createRef()}>{tab.label}</a>
                                        )
                                    })
                                    }
                                </ScrollSpy>
                            )}
                            
                        </div>
                    </div>
                    {tabArgs?.map((tab:any, index:number) => {
                        return (
                            <div id={`ssection${index}`} className='min-h-[380px] mx-auto pb-8 mb-8 border-b border-gray-600 last:border-0 last:mb-0' key={stableKeys[index]}>
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
                        )
                    })}
                </div>      
            </div>      
        </div>      
    )
};
export default MovieDetailsTab;