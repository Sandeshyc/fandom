import React from 'react';
import ReelHeading from '@/modules/elements/ReelHeading';
import ExtendedBillboard from '@/modules/elements/ExtendedBillboard';
import ExtendedBillboardRoll from '@/modules/elements/ExtendedBillboardRoll';
type Props = {
    data: any;
    title?: string;
};
const Extended = ({data, title}:Props) => {
  const [item, setItem] = React.useState(data?.[0] || {}); 
  const [itemEnded, setItemEnded] = React.useState(1);
  const onVideoCompleted = (completed:boolean) => {
    if(completed === true){
      setItemEnded(itemEnded + 1);
    }
  }
  return (
    (item?.videoUrl)?<div className={`mb-[3vw]`}>
        <div className="px-4 md:px-16">
            <ReelHeading title={title} />
        </div>
      <div className={`gap-2`}>
        <div className='relative'>
          <ExtendedBillboard data={item} isComplited={onVideoCompleted} />
          <div className="absolute left-0 right-0 bottom-0 pl-4 md:pl-16">
              <ExtendedBillboardRoll               
                data={data} 
                portrait={true}
                className={`mt-2`}
                setCurrentMovie={setItem} 
                itemEnded={itemEnded} />
          </div>
        </div>
      </div>
  </div>:null  
  )
}
export default Extended;
