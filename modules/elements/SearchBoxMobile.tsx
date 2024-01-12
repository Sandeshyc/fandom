import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup from "yup";
import {SearchIcon} from '@/utils/CustomSVGs';
type Props = {
  isOpened: boolean;
}
const SearchBoxMobile = ({isOpened}:Props) => {
    const router = useRouter();

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
          router.push(`/search?title=${title}&page=1&limit=24&pageSize=24&offset=0`);
      },
      enableReinitialize: true,
    });
    // Destructure the formik object
    const { errors, touched, values, handleChange, handleSubmit } = formiks;

    return(<>
        <div
          className={`w-full bg-gray-800 rounded-md mb-6 ${(isOpened)?'block':'hidden'} `}>
          <form onSubmit={handleSubmit} method="POST"
            className={`w-full text-white bg-black rounded-lg focus:outline-none flex border border-white relative`}>
            <input
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
                <SearchIcon />
              </button>
          </form>
          {(errors.title && touched.title)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.title}</p>:null}
        </div>
      </>
    );
}

export default SearchBoxMobile;