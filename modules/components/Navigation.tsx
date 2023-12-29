import React from 'react';
import NavigationHome from '@/modules/elements/NavigationHome';
import NavigationDetailsDesktop from '@/modules/elements/NavigationDetailsDesktop';
import { type } from 'os';

type NavigationProps = {
    template: string;
}
const Navigation = ({
    template
}:NavigationProps) => {
    
    return (<>{(template === 'iWantTFCHome' || template === 'iWantTFCHomeMobile')?(<NavigationHome/>):(template === 'iWantTFCDetailsDesktop' || template === 'iWantTFCPackageDetails')?(<NavigationDetailsDesktop/>):null}</>);
  
}
export default Navigation;