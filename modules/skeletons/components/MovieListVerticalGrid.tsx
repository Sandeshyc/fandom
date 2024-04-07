import SkeletonRollMultiRows from '@/components/Skeleton/SkeletonRollMultiRows';
const MovieListVerticalGrid = () => {
    return (
        <div className={`min-h-[95vh] z-10 relative px-4 max-w-[2400px] mx-auto mt-[120px]`}>
          <SkeletonRollMultiRows/>
        </div>
    );
}
export default MovieListVerticalGrid;