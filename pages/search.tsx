import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import useSearchMovies from '@/hooks/useSearchMovies';
import MovieCardSearch from '@/components/MovieCardSearch';
import { Info } from '@mui/icons-material';
import { stableKeys } from '@/utils/stableKeys';
import SkeletonSearch from '@/components/Skeleton/SkeletonSearch';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { set } from 'lodash';

const Search = (props) => {
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();
  const [userIdToken, setUserIdToken] = React.useState('');

  const [searchKeyWord, setSearchKeyWord] = React.useState('');
  const [queryString, setQueryString] = React.useState('');
  const [openFilter, setOpenFilter] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [contentType, setContentType] = React.useState('');
  const [cast, setCast] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(24);
  const [pageSize, setPageSize] = React.useState(24);
  const [author, setAuthor] = React.useState('');
  const [offset, setOffset] = React.useState(0);  

  const submitSearch = (e) => {
    e.preventDefault();
    if(title === '' || title === undefined || title === null) {
      setIsInvalid(true);      
    }else{
      router.push('/search', `/search?title=${title}&genre=${genre}&contentType=${contentType}&page=${page}&limit=${limit}&pageSize=${pageSize}&author=${author}&offset=${offset}&cast=${cast}`, {
        shallow: true,
      });

      setQueryString(`title=${title}&genre=${genre}&contentType=${contentType}&page=${page}&limit=${limit}&pageSize=${pageSize}&author=${author}&offset=${offset}&cast=${cast}`);
      setSearchKeyWord(title);
      setIsInvalid(false);
    }
  }

  const { data: movies, isLoading } = useSearchMovies(
    'web',
    queryString 
  );
  console.log('movies: ', movies);
  
  const allParams = router.query;
  // const allParams = window.location.search;
  console.log('allParams: ', allParams);  
  useEffect(() => {
    setIsReady(true);
    const userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        setUserIdToken(userInfoObj.sub);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }

    // get All Params
    if(allParams?.title) {
      setTitle(allParams?.title?.toString());
      setQueryString(`title=${allParams?.title}&genre=${allParams?.genre}&contentType=${allParams?.contentType}&page=${allParams?.page}&limit=${allParams?.limit}&pageSize=${allParams?.pageSize}&author=${allParams?.author}&offset=${allParams?.offset}&cast=${allParams?.cast}`);
      setSearchKeyWord(allParams?.title?.toString());
    }

    if(allParams?.genre) {
      setGenre(allParams?.genre?.toString());
    }

    if(allParams?.contentType) {
      setContentType(allParams?.contentType?.toString());
    }

    if(allParams?.author) {
      setAuthor(allParams?.author?.toString());
    }

    if(allParams?.cast) {
      setCast(allParams?.cast?.toString());
    }

  }, [allParams]);


  // useEffect(() => {
  //   setQueryString(`title=${title}&genre=${genre}&contentType=${contentType}&page=${page}&limit=${limit}&pageSize=${pageSize}&author=${author}&offset=${offset}&cast=${cast}`);
  // }, [title, genre, contentType, page, limit, pageSize, author, offset, cast]);
  
  return (
    <>
      {(isReady) ? (<><SideBar />
      <div className="py-16">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl font-semibold mb-4 lg:pl-6">Result of "{searchKeyWord}"</p>
            <div className='w-full lg:px-6 mb-4'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch(e);
                }}
                className="flex flex-wrap mx-[-7px]">
                  <div className='w-full mb-2 px-[7px]'>
                    <div 
                      className={`bg-gray-700 text-white rounded-md flex w-[300px] sm:w-[450px] max-w-full ${(isInvalid && !title)?'border-red-800 border shadow  shadow-orange-700':''}`}>
                      <input 
                        type="text" 
                        className="w-full bg-transparent text-white rounded-md px-4 py-2 focus:outline-none focus:border-transparent pr-[55px] " 
                        placeholder="Search title here" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                      {(!openFilter)?(<button
                        type='submit'
                        className="w-[50px] lg:hidden">
                          <SearchIcon className="text-gray-400 w-6 h-6" />
                      </button>):null}
                    </div>
                  </div>
                  <button 
                    type='button'
                    onClick={() => setOpenFilter(!openFilter)}
                    className='w-[150px] mb-2 px-[7px] bg-[#eee] text-[#222] rounded-sm px-4 py-2 focus:outline-none  focus:border-transparent flex justify-between items-center ml-[7px]'>
                    Filter <TuneIcon className="text-[#222] w-4 h-4 ml-2" />
                  </button>
                  <div className={`flex-wrap ${(openFilter)?'flex':'hidden lg:flex'}`}>                    
                    <div className='w-[200px] mb-2 px-[7px]'>
                      <input 
                      type="text" 
                      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                      placeholder="Author Name" 
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      />                    
                    </div>
                    <div className='w-[200px] mb-2 px-[7px]'>
                      <input 
                      type="text" 
                      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                      placeholder="Cast Name"
                      value={cast}
                      onChange={(e) => setCast(e.target.value)}
                      />
                    </div>
                    <div className='w-[150px] mb-2 px-[7px]'>
                      <select 
                      defaultValue={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                        <option value="">Genre</option>
                        <option value="comedy">Comedy</option> 
                        <option value="drama">Drama</option> 
                        <option value="romance">Romance</option>
                      </select>
                    </div>
                    <div className='w-[150px] mb-2 px-[7px]'>
                      <select 
                      defaultValue={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                        <option value="">Content Type</option>
                        <option value="Movie">Movie</option>
                        <option value="TV Show">TV Show</option>
                      </select>
                    </div>
                    <div className='w-[150px] mb-2 px-[7px]'>
                      <button type="submit" className="w-full bg-[#2D45F2] text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D45F2] focus:border-transparent">Search</button>
                    </div>
                  </div>
              </form>
            </div>

            <div className="lg:px-6 flex flex-wrap">
            {(!isLoading)?((Array.isArray(movies?.list) && movies?.list?.length > 0)?(movies?.list?.map((item: any, index) => <MovieCardSearch data={item} key={stableKeys[index]}/>)):<NoMovies searchKeyWord={searchKeyWord}/>):<SkeletonSearch/>}
            </div>
          </div>
        </div>
      </div></>) : null}
    </>
  )
}

export default Search;

type NoMoviesProps = {
  searchKeyWord: boolean;
}
const NoMovies = ({searchKeyWord}:NoMoviesProps) => {
  return (
    <>
    {
      (searchKeyWord)?(<div className="flex flex-col items-center justify-center w-[450px] max-w-full bg-gray-600 p-8 rounded-md">
      <Info className="w-[100px] h-[100px] text-yellow-500 mb-4 text-xl" />
      <p className="text-white text-2xl">No movies found!</p>
    </div>):null
    }
    </>
  )
}