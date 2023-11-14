import SearchCard from './SearchCard'

const SkeletonSearch = () => {
  return (
    <>
      <div className="lg:px-6 pb-6 flex flex-wrap">
        <SearchCard count={12}/>
      </div>
    </>
  )
}

export default SkeletonSearch