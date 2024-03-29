import React from "react";
import { stableKeys } from "@/utils/stableKeys";
type tabArgsProps = {
    tabArgs:any[],
    openTab:number,
    setOpenTab:any,
}
const TabTitles = ({
    tabArgs,
    openTab,
    setOpenTab,
}:tabArgsProps) => {
    return (<ul className="container mx-auto border-b border-gray-600 flex text-base overflow-x-auto"
                role="tablist">
            {tabArgs.map((tab:any, index:number) => {
                return (
                    <li 
                    className={`block text-sm lg:text-base text-center border-b-4 border-transparent whitespace-nowrap ${(openTab === index) ? 'border-b-blue-600' : ''}`} key={stableKeys[index]}>
                        <a 
                            className="block py-3 px-2 lg:px-4 lg:min-w-[160px]"
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(index);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            {tab.label}
                        </a>
                    </li>
                )
            })}
        </ul>       
    )
}
export default TabTitles;