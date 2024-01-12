import SearchCard from './SearchCard'

const SkeletonSearch = () => {
  return (
    <>
    <div className="flex flex-wrap mx-[-5px]">
        <SearchCard count={6}/>
    </div>
    </>
  )
}

export default SkeletonSearch