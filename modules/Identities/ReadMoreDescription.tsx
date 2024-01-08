import React, { FunctionComponent, useState, useCallback } from "react";

//  Need to Update code
type ReadMoreDescriptionProps = {
    text: string;
};  
const ReadMoreDescription: FunctionComponent<ReadMoreDescriptionProps> = ({
    text,
  }) => {
    const [shouldTruncate, setShouldTruncate] = useState<boolean>(false);
    const [readMore, setReadMore] = useState<boolean>(false);
  
    // Measure the element to calculate the number of lines and
    // determine whether to truncate
    const measuredRef = useCallback(
      (node: any) => {
        // Before the component mounts the node ref will be null
        if (node?.parentElement) {
          // Calculate the number of lines based on height
          const elHeight = node.offsetHeight;
          const styles = window.getComputedStyle(node);
          const lineHeight = styles
            .getPropertyValue('line-height')
            .replace('px', '');
          const elLineCount = elHeight / parseInt(lineHeight, 10);
  
          setShouldTruncate(elLineCount > 4);
        }
      },
      [text]
    );
  
    const shouldClamp = shouldTruncate && !readMore;
  
    // Our toggle for expanding or hiding truncated text
    let toggle;
    if (readMore) {
      toggle = (
        <span onClick={() => setReadMore(false)} className="text-blue-500 cursor-pointer">
          less
        </span>
      )
    } else {
      toggle = (
        <span onClick={() => setReadMore(true)} className="text-blue-500 cursor-pointer">
          More
        </span>
      );
    }
  
    return (
      <div>
        <p
          ref={measuredRef}
          className={`${shouldClamp ? 'line-clamp-4' : 'line-clamp-none'}`}>
          {text}
        </p>
        {shouldTruncate && toggle}
      </div>
    );
};

export default ReadMoreDescription;