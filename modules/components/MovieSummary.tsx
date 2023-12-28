import React from 'react';
import PublishDate from '@/modules/Identities/PublishDate';
type dataProps = {
    data: any;
}
const MovieSummary = ({data}:dataProps) => {
    
    return (<div className="text-white max-w-[1600px] mx-auto px-[15px] z-10 relative my-4">
      <h1 className="text-2xl md:text-4xl h-full lg:text-5xl mb-2 lg:mb-3">{data?.title}</h1>
      {(data?.publishSchedule)?(<p className="mb-1 flex items-center"><PublishDate publishDate={data?.publishSchedule} short={true} /></p>):null}
      <div className="flex flex-row items-center mb-1">
        {(data?.duration)?(<p className="pr-1 text-green-400">{data?.duration}</p>):null}
        {(data?.quality)?(<p className="border-gray-500 border px-1 mr-1 text-xs">{data?.quality}</p>):null}
        {(data?.contentRating)?(<p className="border-gray-500 border px-1 mr-1 text-xs">{data?.contentRating}</p>):null}
      </div>      
      {(data?.contentPrivider)?(<p className="mb-1"><span className="text-gray-300">Content Provider:</span> {data?.contentPrivider}</p>):null}
    </div>);
  
}
export default MovieSummary;