import React from "react";
import Episode from '@/modules/elements/Episode';
import Pagination from '@/modules/Identities/Pagination';
import { stableKeys } from "@/utils/stableKeys";
import {capFirstLetter} from '@/utils/capFirstLetter';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import SearchIcon from '@mui/icons-material/Search';
type tabArgsProps = {
    tabArgs:any[],
    openTab:number,
}
const TabContents = ({
    tabArgs,
    openTab
}:tabArgsProps) => {
    return ( 
        <>     
        <div className="min-h-[120px] mx-auto py-6 detailsPageTabContent">
            <div className="tab-content">
                {tabArgs.map((tab:any, index:number) => {
                    return (
                        <div className={openTab === index ? "block" : "hidden"} id={"link" + index} key={stableKeys[index]}>
                            <div className='mt-4'> 
                                {(tab?.title)&&
                                <Title tag='h3' size='2xl'>{tab.title}</Title>}                                      
                                {(tab.type === 'episodes') && (
                                    <div className='max-w-[1000px] mx-auto'>
                                        <div 
                                        className={`bg-gray-700 text-white rounded-md flex w-full max-w-full mb-8`}>
                                        <input 
                                            type="text" 
                                            className="w-full bg-transparent text-white rounded-md px-4 py-2 focus:outline-none focus:border-transparent pr-[55px] h-[44px]" 
                                            placeholder="Search episodes"
                                            />
                                            <button
                                            type='submit'
                                            className="w-[40px]">
                                                <SearchIcon className="text-gray-400 w-6 h-6" />
                                            </button>
                                        </div>
                                        {Array.from({length: 6}, (_, i) => {
                                            return <Episode key={i}/>
                                        })}
                                        <div className='my-4'>
                                            <Pagination totalPages={5} currentPage={1} setCurrentPage={() => {}}/>
                                        </div>
                                    </div>
                                )}
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
                                                        <p className="mb-1 md:mb-2 last:mb-0 text-gray-400">
                                                        <span className="text-white/90">{item.label}: </span>
                                                            {item.content}
                                                        </p>
                                                    )}
                                                    {(item.type === 'array' && Array.isArray(item?.content) && item?.content?.length > 0) && (
                                                        <p className="mb-1 md:mb-2 last:mb-0 text-gray-400">
                                                        <span className="text-white/90">{item.label}: </span>
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
        </>
    )
}
export default TabContents;
