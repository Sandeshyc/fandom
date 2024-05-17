import React, {useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup from "yup";
import {SearchIcon} from '@/utils/CustomSVGs';
import {
  CloseOutlined, 
  Refresh
} from '@mui/icons-material';

const SearchBox = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpened, setIsOpened] = React.useState(false);
    const searchInputRef = useRef(null);
    const searchInput = searchInputRef.current as unknown as HTMLElement;
    const schema = Yup.object().shape({
      title: Yup.string().required("Movie, Event is required")
    });
    const formiks = useFormik({
      initialValues: {
        title: '',
      },
  
      // Pass the Yup schema to validate the form
      validationSchema: schema,
  
      // Handle form submission
      onSubmit: async ({
        title,
        }) => {
          setIsLoading(true);
          router.push(`/search?title=${title}`);
      },
      enableReinitialize: true,
    });
    // Destructure the formik object
    const { errors, touched, values, handleChange, handleSubmit } = formiks;

    useEffect(() => {
      if(isOpened) {
        searchInput.focus();
      }
    }, [isOpened]);
    useEffect(() => {
      setIsOpened(false);
      setIsLoading(false);
    }, [router.query]);

    return(<>
        <div
          className={`max-w-[80vw] w-[700px] py-3 px-4 bg-gray-800 rounded-md absolute top-[100%] right-[-25px] z-50 ${(isOpened)?'block':'hidden'} `}>
          <form onSubmit={handleSubmit} method="POST"
            className={`w-full text-white bg-black rounded-lg focus:outline-none flex border-2 border-white relative`}>
            <input
              ref={searchInputRef}
              type="text" 
              className="w-full bg-transparent text-white  px-4 py-2 focus:outline-none focus:border-transparent pr-[60px] h-16" 
              placeholder="Search Movies, Events..."
              name="title"
              value={values.title}
              onChange={handleChange}
              />
            <button
              type='submit'
              className="h-full flex justify-center items-center w-[50px] absolute
               top-0 right-0">
                {(isLoading)?<Refresh className='animate-spin' />:<SearchIcon />}
              </button>
          </form>
          {(errors.title && touched.title)?<p className='text-red-500 text-sm py-1'>{errors.title}</p>:null}
        </div>
        <div className={`fixed top-0 left-0 z-10 w-full h-full ${(isOpened)?'block':'hidden'}`}
        onClick={() => {
          setIsOpened(false);
        }}
        ></div>
        <span
            className='cursor-pointer'
            onClick={() => {
                setIsOpened(!isOpened);
            }}>
            {(isOpened)?(<CloseOutlined/>):(<SearchIcon/>)}
        </span>
      </>
    );
}

export default SearchBox;