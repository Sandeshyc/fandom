import React from "react";
import { stableKeys } from "@/utils/stableKeys";
import {capFirstLetter} from '@/utils/capFirstLetter';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
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
