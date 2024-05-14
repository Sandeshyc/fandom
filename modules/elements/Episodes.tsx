import React, {useState, useEffect, use} from 'react';
import Episode from '@/modules/elements/Episode';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@/modules/elements/Pagination';
import { stableKeys } from '@/utils/stableKeys';
import {
    SwapVert
} from '@mui/icons-material';
type Props = {
    episodes:any
}
const itemPerPage = 10;
const Episodes = ({episodes}:Props) => {    
    const [episodeLists, setEpisodeLists] = React.useState(episodes || []);
    const [searchKey, setSearchKey] = useState('');
    const [isSorted, setIsSorted] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (e:any) => {
        setSearchKey(e.target.value);        
    };
    const handleSort = () => {
        setIsSorted(!isSorted);
    }

    useEffect(() => {
        let tempEpisodes = episodes;
        if(Array.isArray(episodes) && episodes.length > 0 ) {
            tempEpisodes = episodes.filter((item: any) => item && item._id);
            setEpisodeLists(tempEpisodes);
        }
        setSearchKey('');
    }, [episodes]);

    useEffect(() => {
        if(searchKey !== '' && searchKey !== null && searchKey !== undefined && searchKey.length > 0){
            const filteredData = episodeLists.filter((episode:any) => {
                if(episode === null || episode === undefined) return false;
                return episode?.title.toLowerCase().includes(searchKey.toLowerCase());
            });
            setEpisodeLists(filteredData);
        }else{
            if(Array.isArray(episodes)) {
                setEpisodeLists(episodes);
            }
        }
    }, [searchKey]);
    useEffect(() => {
        setEpisodeLists([...episodeLists].reverse());
    }, [isSorted]);

    // need to Update Search Filter for Pagination


    // useEffect(() => {
    //     const indexOfLastItem = currentPage * itemPerPage;
    //     const indexOfFirstItem = indexOfLastItem - itemPerPage;
    //     const currentItems = episodeLists?.slice(indexOfFirstItem, indexOfLastItem);
    //     setDisplayedEpisodes(currentItems);
    // }, [currentPage]);
    return (
        <div className='min-h-[160px]'>
            <div className='mb-8 flex flex-wrap'>
                <div className={`bg-gray-700 text-white rounded-md flex max-w-full w-[120px] grow`}>
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
                <button className={`h-[44px] border border-white/${(isSorted)?'80':'50'} rounded-md ml-2 w-[44px]`}
                    onClick={handleSort}    
                >
                    <SwapVert 
                        sx={{ 
                            color: (isSorted) ? 'white' : 'gray', 
                            fontSize: 25
                        }}
                    />
                </button>
            </div>
            {episodeLists?.map((episode:any, index:number) => (
                <Episode key={stableKeys[index]} episode={episode} slNo={(isSorted)?(episodeLists.length - index) : index + 1} />
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