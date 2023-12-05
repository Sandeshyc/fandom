import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {SearchIcon} from '@/utils/CustomSVGs';

const SearchBox = () => {
    const router = useRouter();
    const inputRef = useRef(null);
    const [isOpened, setIsOpened] = React.useState(false);
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(24);
    const [pageSize, setPageSize] = React.useState(24);
    const [offset, setOffset] = React.useState(0);  
    // const submitSearch = (e) => {
    //   e.preventDefault();
    //   if(title === '' || title === undefined || title === null) {
    //     setIsInvalid(true);    
    //   }else{
    //     setIsInvalid(false);
    //     router.push(`/search?title=${title}&page=${page}&limit=${limit}&pageSize=${pageSize}&offset=${offset}`);
    //   }
    // }
    return(<>
        {/* <div
          className='w-64 py-2 px-3 bg-gray-800 rounded-md'>
          <form 
            className={`w-full text-white bg-black rounded-lg focus:outline-none flex border-2 border-white`}>
            <input 
                ref={inputRef}
              type="text" 
              className="w-full bg-transparent text-white  px-4 py-2 focus:outline-none focus:border-transparent pr-[55px] h-16" 
              placeholder="Search Movies, Events..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            <button
              type='submit'
              className="h-full w-8"
            //   onClick={submitSearch}
              >
                <SearchIcon />
              </button>
          </form>
        </div> */}
        <span
            className='cursor-pointer'
            onClick={() => {
                setIsOpened(!isOpened);
            }}
        >
            <SearchIcon/>
        </span>
      </>
    );
}

export default SearchBox;