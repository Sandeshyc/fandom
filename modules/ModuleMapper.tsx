import React from 'react';
import { stableKeys } from '@/utils/stableKeys';

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
        if(module?.displayType === 'potrait' || module?.displayType === 'top10'){
            extraProps.portrait = true;
        }
        if(module?.displayType == 'gradient' ){
            extraProps.gradient = true;
        }
        if(module?.displayType == 'rollBordered' ){
            extraProps.isSquare = false;
            extraProps.portrait = true;
        }
        const Component = getComponent(module?.displayType || "");
        if(!Component) return null;
        return (
            <Component
                key={stableKeys[moduleIndex]}
                module={module}
                id={moduleIndex}
                data={module.items || null}
                isLoading={isLoading}
                {...module}
                {...extraProps}
            />
        );
    });
}