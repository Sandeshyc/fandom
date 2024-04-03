import React from "react";
import { stableKeys } from "@/utils/stableKeys";
import ErrorPopUp from "@/modules/elements/ErrorPopUp";
import BaseComponent from "./BaseComponent";

interface ModuleWrapperProps {
  modules: any;
  getComponent: Function;
  id?: string;
  colIndex?: number;
  isLoading?: boolean;
}

export default function ModuleMapper({
  modules,
  getComponent,
  isLoading,
} : ModuleWrapperProps) {
    return modules?.map((module:any, moduleIndex:number) => {
        const extraProps = {
            marginTop: false,
        };
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
                    message='Sorry, Something went wrong!'
                    />
                </div>
            )
        }
        const Component = getComponent(module?.displayType || "");
 
        if((moduleIndex == 0 && modules[0].displayType !== 'navigation') || moduleIndex == 1){
            // console.log('moduleIndex', moduleIndex, modules.displayType);
            if(module.displayType !== 'detailsHeroImage' && module.displayType !== 'billboard' && module.displayType !== 'LayoutCoverflowSlider' ){
                extraProps.marginTop = true;
            }
        }

    if (
      (moduleIndex == 0 && modules[0].displayType !== "navigation") ||
      moduleIndex == 1
    ) {
      // console.log('moduleIndex', moduleIndex, modules.displayType);
      if (
        module.displayType !== "detailsHeroImage" &&
        module.displayType !== "billboard" &&
        module.displayType !== "LayoutCoverflowSlider"
      ) {
        extraProps.marginTop = true;
      }
    }

    if (!Component) return null;
    return (
      <BaseComponent module={module} key="baseComp">
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
      </BaseComponent>
    );
  });
}
