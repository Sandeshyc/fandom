import React, { useEffect, useState } from 'react';
import { stableKeys } from '@/utils/stableKeys';
import {capFirstLetter} from '@/utils/capFirstLetter';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
// @ts-ignore
import ScrollSpy from 'react-scrollspy-navigation';
const MovieDetailsTab = ({data}:{data:any}) => {
    const [mainNavHeight, setMainNavHeight] = useState(0);
    const [navbarTop, setNavbarTop] = useState(0);
    const [tabArgs, setTabArgs] = React.useState([]);
    useEffect(() => {
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
                    content:data?.author
                }
            ]
        });
        tempTabArgs.push({
            label:'Reviews', 
            type:'arrays',
            title:'Ratings & Reviews',
            content:[
                
            ]
        });
        tempTabArgs.push({
            label:'More Info', 
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
                    label:'Content Privider',
                    type:'text',
                    content:data?.contentPrivider
                }
            ]
        });
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
                                            <a key={stableKeys[index]} href={`#section${index}`} className='block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap' ref={React.createRef()}>{tab.label}</a>
                                        )
                                    })
                                    }
                                </ScrollSpy>
                            )}
                            
                        </div>
                    </div>
                    {tabArgs?.map((tab:any, index:number) => {
                        return (
                            <div id={`section${index}`} className='max-w-[1000px] min-h-[160px] mx-auto pb-8 mb-8 border-b border-gray-600 last:border-0 last:mb-0' key={stableKeys[index]}>
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
                                                    <div key={stableKeys[index]}>
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