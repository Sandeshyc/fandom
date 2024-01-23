import React from 'react';
import { stableKeys } from '@/utils/stableKeys';
import ErrorPopUp from '@/modules/elements/ErrorPopUp';

interface ModuleWrapperProps {
    modules: any;
    getComponent: Function;
    id?: string;
    colIndex?: number;
    isLoading?: boolean;
}

export default function ModuleMapper ({
  modules,
  getComponent,
  isLoading,
} : ModuleWrapperProps) {
    return modules?.map((module:any, moduleIndex:number) => {
        const extraProps = {};
        if(module?.displayType === 'potrait' || module?.displayType === 'top10' || module?.displayType === 'portrait'){
            extraProps.portrait = true;
        }
        if(module?.displayType == 'gradient' ){
            extraProps.gradient = true;
        }
        if(module?.displayType == 'rollBordered' ){
            extraProps.isSquare = false;
            extraProps.portrait = true;
        }
        if(module?.name == 'error' ){
            return(
                <div key={stableKeys[moduleIndex]}>
                    <ErrorPopUp 
                    message='Test'/>
                </div>
            )
        }
        const Component = getComponent(module?.displayType || "");
        if(!Component) return null;
        return (
            <Component
                key={stableKeys[moduleIndex]}
                module={module}
                id={moduleIndex}
                data={module.items || null}
                items={module.items || null}
                isLoading={isLoading}
                {...module}
                {...extraProps}
            />
        );
    });
}