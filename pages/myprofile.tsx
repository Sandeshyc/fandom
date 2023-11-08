import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import ProfileHead from '@/components/ProfileHead'
import ProfileName from '@/components/ProfileName';
import ProfileEmail from '@/components//ProfileEmail';
import ProfileMobile from '@/components/ProfileMobile';
import ProfileGender from '@/components/ProfileGender';
import ProfileBirthday from '@/components/ProfileBirthday';
const MyProfile = () => {
  const [userIdToken, setUserIdToken] = React.useState('');
  const router = useRouter();
  const [isUpdateMode, setIsUpdateMode] = React.useState(false);
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+91');
  const [gender, setGender] = React.useState('');
  const [birthday, setBirthday] = React.useState(new Date())
  const [profileExpanded, setProfileExpanded] = React.useState(true);

  const updateProfile = () => {
    setIsUpdateMode(!isUpdateMode);  
  }

  const toggleProfile = () => {
    setProfileExpanded(!profileExpanded);
  }

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      // console.log('userInfoObj: ', userInfoObj);
      if(userInfoObj.sub) {
        // router.push('/');
        setUserIdToken(userInfoObj.sub);
        setEmail(userInfoObj.email);
      }else{
        router.push('/auth');
      }
    }else{
      router.push('/auth');
    }
  }, []);

  return (
    <>
      <SideBar />
      <div className="py-16 bg-gradient-to-r from-[#210424] from-10% via-[#4B0F5A] via-30% to-[#271055] to-85% min-h-full">
        <div className={`px-4 md:px-12 mb-[3vw]`}>
          <div className="container mx-auto max-w-[996px]">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">My Account</p>
            <div className="lg:pl-6">
              <div className={`text-white max-w-[996px]`}>
                <h4 className="text-white text-[18px] mb-2">Profile</h4>
                <div className={`p-4 border border-[#C6BCC6] rounded-md bg-[#767680] bg-opacity-[22%]`}>                
                  <ProfileHead
                    profileExpanded={profileExpanded}
                    toggleProfile={toggleProfile}
                  />
                  <div className={`mt-2 flex flex-wrap ${(!profileExpanded)?'hidden':'flex'}`}>
                    <div className={`${(isUpdateMode)?'md:w-[100%] lg:w-[66%]':'md:w-[33%]'} w-full  md:pr-2`}>
                      <ProfileName 
                        isUpdateMode={isUpdateMode}
                        name={name}
                        lastName={lastName}
                        setName={setName}
                        setLastName={setLastName}
                      />
                    </div>
                    <div className={`mb-3 ${(isUpdateMode)?'md:w-[50%] md:pr-3 lg:w-[33%] lg:pr-0':'md:w-[33%] md:pl-2'} w-full`}>
                      <ProfileEmail
                        isUpdateMode={isUpdateMode}
                        email={email}
                        setEmail={setEmail}
                      />
                    </div>
                    <div className={`mb-3 w-full ${(isUpdateMode)?'md:w-[50%] md:pr-2 md:pl-1 lg:w-[33%] lg:pr-3':'md:w-[33%] md:pr-4'}`}>
                      <ProfileMobile
                        isUpdateMode={isUpdateMode}
                        mobile={mobile}
                        countryCode={countryCode}
                        setMobile={setMobile}
                        setCountryCode={setCountryCode}
                      />
                    </div>
                    <div className={`mb-3 ${(isUpdateMode)?'w-[50%] pl-1 pr-2 lg:w-[33%] lg:pr-2':'w-[50%] pr-2 md:w-[33%] md:pr-4'}`}>
                      <ProfileGender
                        isUpdateMode={isUpdateMode}
                        gender={gender}
                        setGender={setGender}/>
                    </div>
                    <div className={`mb-3 ${(isUpdateMode)?'w-[50%] pl-1 pr-0 md:pr-2 lg:w-[33%] lg:pl-0 lg:pr-0':'w-[50%] pl-2 md:w-[33%] md:pr-4'}`}>
                      <ProfileBirthday
                        isUpdateMode={isUpdateMode}/>
                    </div>
                    <div className={`mt-4 w-full flex flex-wrap ${(isUpdateMode)?'justify-end':null}`}>
                      {(isUpdateMode)?<button  
                        onClick={updateProfile}
                        className="bg-transparent border text-white w-[48%] sm:w-auto min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px] mr-[2%] sm:mr-[10px]">Cancel</button>:null}
                      <button 
                        onClick={updateProfile} 
                        className={`bg-[#2D45F2] text-white ${(isUpdateMode?'w-[48%] ml-[2%] sl:ml-[0px]':'w-full')} sm:w-auto min-w-[150px] px-8 py-2 sm:py-3 rounded-[50px]`}>{(isUpdateMode?'Save':'Edit Profile')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile;