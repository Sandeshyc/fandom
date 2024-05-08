import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const WatchAndBuy = () => {
    return (
        <div className="relative z-10 bg-black/90">
            <div className="container mx-auto px-4">
                <div className="flex flex-row items-center lg:mb-5 flex-wrap justify-between mx-[-7px]">
                    <div className="w-1/2 px-[7px]">
                        <div className='rounded-full overflow-hidden'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={34}/>
                        </div>
                    </div>
                    <div className="w-1/2 px-[7px]">
                        <div className='rounded-full overflow-hidden'>
                            <Skeleton baseColor='#333' highlightColor='#666' height={34}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default WatchAndBuy;