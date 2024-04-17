import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const MovieDetails = () => {
    return (
        <div className='text-white bg-black z-10 relative'>
          <div className='container mx-auto px-4'>
            <div className="w-full mt-0">
                <div className="flex items-center justify-start flex-wrap border-b border-white/60 pb-4">
                    <div className='w-[120px] mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                    </div>
                    <div className='w-[80px] mr-4'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                    </div>
                    <div className='w-[100px]'>
                    <Skeleton baseColor='#333' highlightColor='#666' height={20}/>
                    </div>
                </div>
                <div className="pt-6 flex-auto text-base detailsPageTabContent">
                    <div className="tab-content">
                    <div className="block">
                        <div className='w-full'>
                        <Skeleton baseColor='#333' highlightColor='#666' height={20} count={4}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
};
export default MovieDetails;