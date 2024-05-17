import { set } from "lodash";
import React, { useRef, useState, useCallback, useEffect } from "react";

//  Need to Update code
type Props = {
    text: string;
    activeTab: string;
};  
const ReadMoreDescriptionV2 = ({text, activeTab}:Props) => {
    const OuterBox = useRef(null as any);
    const [hasMoreTxt, setHasMoreTxt] = useState<boolean>(false);
    const [fullTxtHeight, setFullTxtHeight] = useState<number>(0);
    const [truncatedTxtHeight, setTruncatedTxtHeight] = useState<number>(0);
    const [ifFullTxt, setIfFullTxt] = useState<boolean>(false);

    const handleToggle = () => {
      setIfFullTxt(!ifFullTxt);
    }
    useEffect(() => {
      const OuterBoxElement = OuterBox.current;  
      if(OuterBoxElement){
        setFullTxtHeight(OuterBoxElement.scrollHeight);
        setTruncatedTxtHeight(OuterBoxElement.offsetHeight);
        setHasMoreTxt(OuterBoxElement.scrollHeight > OuterBoxElement.offsetHeight);
      }
    }, [activeTab]);

    return (
      <>
        {/* <p className="text-red-600">
          Full: {fullTxtHeight} Truncated: {truncatedTxtHeight} has: {hasMoreTxt.toString()} ifFullTxt: {ifFullTxt.toString()}
        </p> */}
        {(!ifFullTxt)?(
          <p ref={OuterBox} className="line-clamp-4">{text}</p>          
        ):(
          <p>{text}</p> 
        )}
        {(hasMoreTxt)&&(
          <span className="text-blue-500 cursor-pointer" onClick={handleToggle}>
            {ifFullTxt ? 'Read Less' : 'Read More'}
          </span>
        )}
      </>
    );
};

export default ReadMoreDescriptionV2;