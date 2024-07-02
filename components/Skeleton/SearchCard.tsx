import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { stableKeys } from '@/utils/stableKeys';

type SkeletonListProps = {
    count: number
}
const SearchCard = ({
    count = 1
}:SkeletonListProps) => {    
    return (
        <>
        {(Array.from(Array(count).keys()))?.map((index) => (
            <div className="w-full lg:w-1/2 2xl:w-1/3 px-2 mb-4" key={stableKeys[index]}>
              <div className="w-full">
                  <Skeleton baseColor='#333' highlightColor='#666' className='aspect-[16/9] w-full rounded-md' />
              </div>
            </div>
        ))}
        </>
    )
}

export default SearchCard