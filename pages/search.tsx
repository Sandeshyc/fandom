import React, { useRef, useEffect, useState, use } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import queryMap from "@/modules/queries";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Navigation from "@/modules/components/Navigation";
import Header from "@/modules/elements/Header";
import Footer from "@/components/Footer";
import BottomNavigation from "@/modules/elements/Navigation/BottomNavigation";
import useIsMobile from "@/hooks/useIsMobile";
import ReelHeading from "@/modules/elements/ReelHeading";
import SearchResults from "@/modules/components/SearchResults";
const GenreList = [
  'Romance',
  'Drama',
  'Comedy',
  'Action',
  'Horror',
  'Science fiction',
  'Thriller',
  'Adventure',
  'Fantasy',
  'Historical',
  'Crime',
  'Musicals',
  'Mystery',
  'Sports',
  'Western',
  'Adult',
];
const ContentTypeList = ["Movie", "Event", "Episode", "TvShow"];
const Search = (props: any) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchContentType, setSearchContentType] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [contentType, setContentType] = useState("");




  // start Formik
  const schema = Yup.object().shape({
    searchTitle: Yup.string().required("Title is required"),   
    searchGenre: Yup.string(),
    searchContentType: Yup.string(),
  });
  const formiks = useFormik({
    initialValues: {
      searchTitle: title,
      searchGenre: genre,
      searchContentType: contentType,
    },
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({
      searchTitle,
      searchGenre,
      searchContentType
      }) => {  
        setSearchKeyWord(searchTitle);
        setSearchTitle(searchTitle);
        setSearchGenre(searchGenre);
        setSearchContentType(searchContentType);
        router.push(
          "/search",
          `/search?title=${searchTitle}&genre=${searchGenre}&contentType=${searchContentType}`,
          {
            shallow: true,
          }
        );
        console.log('searchTitle: ', searchTitle, 'searchGenre: ', searchGenre, 'searchContentType: ', searchContentType);  
    },
    enableReinitialize: true,
  });
  const { errors, touched, values, handleChange, handleSubmit } = formiks;
  const datax = {
    title: searchTitle,
    genre: searchGenre,
    director: "",
    cast: "",
    contentType: searchContentType,
    pageSize: 30,
  };
  const {
    loading,
    error,
    data: gqData,
  } = useQuery(queryMap["searchContent"], { variables: { input: datax } });
  console.log(
    "userData:",
    datax,
    "gqData: ",
    gqData,
    "loading: ",
    loading,
    "error: ",
    error
  );
  const movies = gqData?.searchContent;

  useEffect(() => {
    const allParams = router.query;
    if ((allParams?.title != undefined) && (allParams?.title != null)) {
      setTitle(allParams?.title as string);
      setSearchTitle(allParams?.title as string);
      setSearchKeyWord(allParams?.title as string);
      values.searchTitle = allParams?.title as string;
    }
    if ((allParams?.genre != undefined) && (allParams?.genre != null)) {
      setGenre(allParams?.genre as string);
      setSearchGenre(allParams?.genre as string);
      values.searchGenre = allParams?.genre as string;
    }
    if ((allParams?.contentType != undefined) && (allParams?.contentType != null)) {
      setContentType(allParams?.contentType as string);
      setSearchContentType(allParams?.contentType as string);
      values.searchContentType = allParams?.contentType as string;
    }
  }, [router.query]);
  return (
    <div className={cssBoxBg} style={styleBoxBg}>
      {isMobile ? <Header /> : <Navigation />}
      <div
        className={`px-4 mb-[3vw] min-h-[75vh] container mx-auto`}
        style={{
          marginTop: isMobile ? "70px" : "120px",
        }}>
        <div className="movieSliderInner">
          <div className="w-full mb-4">
            <form onSubmit={handleSubmit} method="POST" className="flex flex-wrap mx-[-7px]">
              <div className="w-full mb-2 px-[7px]">
                <div
                  className={`bg-gray-700 text-white rounded-md flex w-full max-w-full ${
                    errors.searchTitle && touched.searchTitle
                      ? "border-red-800 border shadow  shadow-orange-700"
                      : ""
                  }`}>
                  <input
                    type="text"
                    className="w-full bg-transparent text-white rounded-md px-4 py-2 focus:outline-none focus:border-transparent pr-[55px] h-[50px] lg:h-[60px]"
                    placeholder="Search title here"
                    name='searchTitle'
                    autoFocus={true}
                    value={values.searchTitle}
                    onChange={handleChange}
                  />
                  {!openFilter ? (
                    <button type="submit" className="w-[50px] lg:hidden">
                      <SearchIcon className="text-gray-400 w-6 h-6" />
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="px-[7px] mb-2 flex justify-end w-full">
                <button
                  type="button"
                  onClick={() => setOpenFilter(!openFilter)}
                  className="w-[150px] bg-[#eee] text-[#222] rounded-sm px-4 py-2 focus:outline-none  focus:border-transparent flex justify-between items-center ml-[7px] lg:hidden"
                >
                  Filter <TuneIcon className="text-[#222] w-4 h-4 ml-2" />
                </button>
              </div>
              <div
                className={`w-full flex-wrap ${
                  openFilter ? "flex" : "hidden lg:flex"
                }`}
              >
                <div className="w-1/2 lg:w-1/4 xl:w-1/5 mb-2 px-[7px] ">
                  <div className="bg-gray-700 rounded-md">
                    <select
                      name="searchGenre"
                      value={values.searchGenre}
                      onChange={handleChange}
                      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none outline-none pr-[20px] bg-[url(/images/arrow_drop_down_white.svg)] bg-no-repeat bg-right bg-[length:25px_20px]"
                    >
                      <option value="">Genre</option>
                      {(Array.isArray(GenreList) && GenreList?.length > 0) &&(
                        GenreList.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))                      
                      )}
                    </select>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/4 xl:w-1/5 mb-2 px-[7px]">
                  <div className="bg-gray-700 rounded-md">
                    <select
                      name="searchContentType"
                      value={values.searchContentType}
                      onChange={handleChange}
                      className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none outline-none pr-[20px] bg-[url(/images/arrow_drop_down_white.svg)] bg-no-repeat bg-right bg-[length:25px_20px]"
                    >
                      <option value="">Content Type</option>
                      {(Array.isArray(ContentTypeList) && ContentTypeList?.length > 0) &&(
                        ContentTypeList.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))                      
                      )}
                    </select>
                  </div>
                </div>
                <div className="w-full lg:mt-2 xl:mt-0 mb-2 px-[7px] xl:w-1/5">
                  <button
                    type="submit"
                    className="w-full text-white rounded-md px-4 py-3 xl:py-2 focus:outline-none bg-gradient-to-r from-blue-700 to-blue-500 active:opacity-65">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ReelHeading title={`Result of "${searchKeyWord}"`} />
          <SearchResults
            movies={movies}
            isLoading={loading}
            isError={error}
            isMobile={isMobile}
          />
        </div>
      </div>
      {isMobile ? <BottomNavigation /> : <Footer />}
    </div>
  );
};

export default Search;
const cssBoxBg = `bg-[#050505] text-white overflow-hidden relative bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]`;
const styleBoxBg = {
  // backgroundImage: bgImage,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% auto",
  backgroundPosition: "right " + 30 + "%",
};
