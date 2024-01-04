import { type } from "os";
import React, {useEffect} from "react";
import { MobileIcon } from "@/utils/CustomSVGs";
import CountryData from "modules/data/countries.json";
import Select from 'react-select';
type ProfileMobileProps = {
    isUpdateMode: boolean;
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileMobile = (
    {
        isUpdateMode,
        errors,
        touched,
        values,
        handleChange,
    }: ProfileMobileProps
) => {
    return(
        <div className="w-full">
            {(!isUpdateMode)?<label className='w-full text-[14px] text-[#FFFFFFB8]'>Mobile</label>:null}
            {(isUpdateMode)?<>
            <ProfileMobileGroup
                errors={errors}
                touched={touched}
                values={values}
                handleChange={handleChange}
            />
            {(errors.userCountryCode && touched.userCountryCode)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userCountryCode}</p>:null}
            {(errors.userPhone && touched.userPhone)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userPhone}</p>:null}
            </>:<p className='text-[14px] text-[#fff] py-1'>{(values.userPhone)?((values.userCountryCode)?values.userCountryCode+' ':'')+''+values.userPhone:'_'}</p>}
        </div>
    );
}
export default ProfileMobile;

type ProfileMobileGroupProps = {
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileMobileGroup = (
    {
        errors,
        touched,
        values,
        handleChange,
    }: ProfileMobileGroupProps
) => {
    return(
        <div className="w-full">
            <div className="flex flex-wrap w-full items-center text-[14px] px-2 py-1 border rounded-md border-[#767680] h-[48px] bg-[#767680] bg-opacity-[22%]">
                <div className="flex items-center">
                    <MobileIcon/>
                    <ProfileCountryCode
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleChange={handleChange}/>
                </div>
                <div className="mr-2 text-[#CCCCCD]">|</div>
                <div className="grow w-[100px] bg-red">
                    <ProfileMobileField
                    errors={errors}
                    touched={touched}
                    values={values}
                    handleChange={handleChange} />
                </div>
            </div>
        </div>
    );
}

type ProfileCountryCodeProps = {
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileCountryCode = (
    {
        errors,
        touched,
        values,
        handleChange,
    }: ProfileCountryCodeProps
) => {
    const [selectedOptionddd, setSelectedOptionddd] = React.useState(null);
    const handleChangeddd = (selectedOptionddd:any) => {
        setSelectedOptionddd(selectedOptionddd);
        handleChange({
            target: {
              name: 'userCountryCode',
              value: selectedOptionddd.value,
            },
        });
        console.log(`Option selected:`, selectedOptionddd);
    };
    const optionsddd = CountryData.map((country, index) => {
        return{
            value: country?.dialCode,
            label: country?.dialCode,
        }
    });
    return(
        <>
        {(errors.userCountryCode && touched.userCountryCode)?<p className='text-[#FF3636] text-[14px] py-1'>{errors.userCountryCode}</p>:null}
        <Select
            name="userCountryCode"
            id="userCountryCode"
            defaultInputValue={values.userCountryCode}
            value={selectedOptionddd}
            onChange={handleChangeddd}
            options={optionsddd}
            placeholder="+1"
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    padding: '0px',
                    margin: '0px',
                    minHeight: '0px',
                    backgroundColor: 'transparent',
                }),
                menu: (provided, state) => ({
                    ...provided,
                    marginTop: 0,
                }),
                menuList: (provided, state) => ({
                    ...provided,
                    paddingTop: 0,
                    paddingBottom: 0,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: '250px',
                    width: '120px',
                }),
                option: (provided, state) => ({
                    ...provided,
                    padding: '10px',
                    fontSize: '14px',
                    color: '#000',
                    backgroundColor: (state.isSelected) ? '#aaa' : '#fff',
                    '&:hover': {
                        backgroundColor: '#eee',
                    },
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    color: '#ddd',
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    color: '#aaa',
                }),
                input: (provided, state) => ({
                    ...provided,
                    color: '#fff',
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    padding: '0px',
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    padding: '0px',
                }),
                indicatorSeparator: (provided, state) => ({
                    ...provided,
                    display: 'none',
                }),
            }}
        />
        </>
    );
}

type ProfileMobileFieldProps = {
    errors: any; 
    touched: any;
    values: any;
    handleChange: any;
}
const ProfileMobileField = (
    {
        errors,
        touched,
        values,
        handleChange,
    }: ProfileMobileFieldProps
) => {
    return(
        <div className="w-full">
            <input 
            name="userPhone"
            id="userPhone"
            value={values.userPhone}
            onChange={handleChange}
            placeholder="e.g. 012340 56789"
            type="text" 
            className='w-full text-[14px] bg-transparent focus:outline-none'/>
        </div>
    );
}