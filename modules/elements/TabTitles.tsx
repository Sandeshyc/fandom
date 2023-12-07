import React from "react";

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
    return (<ul className="flex items-center justify-start flex-wrap border-b border-white"
                role="tablist">
            {tabArgs.map((tab:any, index:number) => {
                return (
                    <li className={`mr-4 last:mr-0`}>
                        <a
                            className={`text-base block pb-4 px-1 min-w-full border-b ${(openTab === index) ? 'border-white' : 'border-transparent'}`}
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