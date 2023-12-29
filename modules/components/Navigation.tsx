import React from 'react';
import NavigationHome from '@/modules/elements/NavigationHome';
import NavigationHomeMobile from '@/modules/elements/NavigationHomeMobile';
import NavigationDetailsDesktop from '@/modules/elements/NavigationDetailsDesktop';
import { type } from 'os';

type NavigationProps = {
    template: string;
}
const Navigation = ({
    template
}:NavigationProps) => {
    
    return (<>{(template === 'iWantTFCHome')?(<NavigationHome/>):
    (template === 'iWantTFCHomeMobile')?(<NavigationHomeMobile/>):
    (template === 'iWantTFCDetailsDesktop' || template === 'iWantTFCPackageDetails' || template === 'iWantTFCPackageDetailsDesktop')?(<NavigationDetailsDesktop/>):
    null}</>);
  
}
export default Navigation;