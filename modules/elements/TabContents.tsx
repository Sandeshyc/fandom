import React from "react";
import { stableKeys } from "@/utils/stableKeys";
import {capFirstLetter} from '@/utils/capFirstLetter';
import ReadMoreDescription from '@/modules/Identities/ReadMoreDescription';
type tabArgsProps = {
    tabArgs:any[],
    openTab:number,
}
const TabContents = ({
    tabArgs,
    openTab
}:tabArgsProps) => {
    return (
        <div className="pt-6 flex-auto text-base detailsPageTabContent">
            <div className="tab-content">
                {tabArgs.map((tab:any, index:number) => {
                    return (
                        <div className={openTab === index ? "block" : "hidden"} id={"link" + index} key={stableKeys[index]}>
                            {(tab.type === 'text') && (
                                <ReadMoreDescription text={tab.content}/>
                            )}
                            {(tab.type === 'arrays') && (                              
                                <div>
                                    {tab?.content.map((item:any, index:number) => {
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
                    )
                })}
            </div>
        </div>
    )
}
export default TabContents;
