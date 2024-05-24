import React, {useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup from "yup";
import {SearchIcon} from '@/utils/CustomSVGs';
import {
  Refresh
} from '@mui/icons-material';
type Props = {
  isOpened: boolean;
}
const SearchBoxMobile = ({isOpened}:Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchInputRef = useRef(null);
    const schema = Yup.object().shape({
      title: Yup.string().required("Type something...")
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
        const searchInput = searchInputRef.current as unknown as HTMLElement;
        searchInput.focus();
      }
    }, [isOpened]);
    return(<>
        <div
          className={`w-full bg-gray-800 rounded-md mb-6 ${(isOpened)?'block':'hidden'} `}>
          <form onSubmit={handleSubmit} method="POST"
            className={`w-full text-white bg-black rounded-lg focus:outline-none flex border border-white relative`}>
            <input
              ref={searchInputRef}
              type="text" 
              className="w-full bg-transparent text-white  px-4 py-2 focus:outline-none focus:border-transparent pr-[60px] h-12" 
              placeholder="Search Movies, Events..."
              name="title"
              value={values.title}
              onChange={handleChange}
              />
            <button
              type='submit'
              className="h-full flex justify-center items-center w-[50px] absolute
               top-0 right-0">
                {(isLoading)?<Refresh 
                className='animate-spin'
                />:<SearchIcon />}                
              </button>
          </form>
          {(errors.title && touched.title)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.title}</p>:null}
        </div>
      </>
    );
}

export default SearchBoxMobile;