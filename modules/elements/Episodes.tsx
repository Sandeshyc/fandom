import React, {useState, useEffect} from 'react';
import Episode from '@/modules/elements/Episode';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@/modules/elements/Pagination';
import { stableKeys } from '@/utils/stableKeys';
type Props = {
    episodes:any
}
const itemPerPage = 10;
const Episodes = ({episodes}:Props) => {    
    const [episodeLists, setEpisodeLists] = React.useState(episodes || []);
    console.log('episodes', episodes);
    console.log('episodeLists', episodeLists);
    const [displayedEpisodes, setDisplayedEpisodes] = useState( [] as any);
    const [searchKey, setSearchKey] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (e:any) => {
        setSearchKey(e.target.value);        
    };

    useEffect(() => {
        let tempEpisodes = episodes;
        if(Array.isArray(episodes) && episodes.length > 0 ) {
            tempEpisodes = episodes.filter((item: any) => item && item._id);
            setEpisodeLists(tempEpisodes);
        }
    }, [episodes]);

    useEffect(() => {
        if(searchKey !== '' && searchKey !== null && searchKey !== undefined && searchKey.length > 0){
            const filteredData = episodes.filter((episode:any) => {
                return episode.title.toLowerCase().includes(searchKey.toLowerCase());
            });
            setEpisodeLists(filteredData);
        }else{
            if(Array.isArray(episodes)) {
                setEpisodeLists(episodes);
            }
        }
    }, [searchKey]);
    // need to Update Search Filter for Pagination


    // useEffect(() => {
    //     const indexOfLastItem = currentPage * itemPerPage;
    //     const indexOfFirstItem = indexOfLastItem - itemPerPage;
    //     const currentItems = episodeLists?.slice(indexOfFirstItem, indexOfLastItem);
    //     setDisplayedEpisodes(currentItems);
    // }, [currentPage]);
    return (
        <div className='min-h-[160px]'>
            <div className={`bg-gray-700 text-white rounded-md flex w-full max-w-full mb-8`}>
                <input 
                type="text" 
                className="w-full bg-transparent text-white rounded-md px-4 py-2 focus:outline-none focus:border-transparent pr-[55px] h-[44px]" 
                placeholder="Search episodes"
                value={searchKey}
                onChange={handleSearch}
                />
                <button
                type='submit'
                className="w-[40px]">
                    <SearchIcon className="text-gray-400 w-6 h-6" />
                </button>
            </div>
            {episodeLists?.map((episode:any, index:number) => (
                <>
                {/* <p>ddd</p> */}
                <Episode key={stableKeys[index]} episode={episode} slNo={index+1} />
                </>
            ))}
            {(itemPerPage < episodes?.length) &&
            <div className='my-4'>
                <Pagination
                    totalItems={episodeLists?.length || episodes?.length}
                    itemsPerPage={itemPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            }            
        </div>
    );
}
export default Episodes;