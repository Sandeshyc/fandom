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
        if(module.displayType == 'roll' ){
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