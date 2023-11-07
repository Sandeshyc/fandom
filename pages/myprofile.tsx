import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar'
import ProfileHead from '@/components/ProfileHead'
import ProfileName from './ProfileName';
import ProfileEmail from './ProfileEmail';
import ProfileMobile from './ProfileMobile';
import ProfileGender from './ProfileGender';
import ProfileBirthday from './ProfileBirthday';
const MyProfile = (props) => {
  const [userIdToken, setUserIdToken] = React.useState('');
  const router = useRouter();
  const [isUpdateMode, setIsUpdateMode] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('john.dalwan@email.com');
  const [mobile, setMobile] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [dob, setDob] = React.useState('');

  const updateProfile = () => {
    setIsUpdateMode(!isUpdateMode);  
  }

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo');
    // console.log('userInfo: ', userInfo);
    if (userInfo) {
      const userInfoObj = JSON.parse(userInfo);
      if(userInfoObj.sub) {
        // router.push('/');
        setUserIdToken(userInfoObj.sub);
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
          <div className="movieSliderInner">
            <p className="text-white text-xl md:text-2xl lg:text-4xl font-semibold mb-4 lg:pl-6">My Account</p>
            <div className="lg:pl-6">
              <div className={`text-white max-w-[996px]`}>
                <h4 className="text-white text-[18px] mb-2">Profile</h4>
                <div className={`p-4 border border-[#C6BCC6] rounded-md`}>                
                  <ProfileHead/>
                  <div className="mt-2 flex flex-wrap">
                    <div className="mb-3 md:w-[33%] w-full  md:pr-2">
                      <ProfileName 
                        isUpdateMode={isUpdateMode}
                        name={name}
                        setName={setName}
                      />
                    </div>
                    <div className="mb-3 md:w-[33%] w-full md:pl-2">
                      <ProfileEmail
                        isUpdateMode={isUpdateMode}
                        email={email}
                        setEmail={setEmail}
                      />
                    </div>
                    <div className="mb-3 md:w-[33%] w-full md:pl-4">
                      <ProfileMobile
                        isUpdateMode={isUpdateMode}
                        mobile={mobile}
                        setMobile={setMobile}
                      />
                    </div>
                    <div className="mb-3 w-[50%] md:w-[33%] pr-2">
                      <ProfileGender
                        isUpdateMode={isUpdateMode}
                        gender={gender}
                        setGender={setGender}/>
                    </div>
                    <div className="mb-3 w-[50%] md:w-[33%] pl-2">
                      <ProfileBirthday
                        isUpdateMode={isUpdateMode}
                        birthday={dob}
                        setBirthday={setDob}/>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <button  
                      onClick={updateProfile}
                      className="bg-[#2D45F2] text-white w-full px-4 py-3 rounded-[50px]">{(isUpdateMode?'Update':'Edit')} Profile</button>
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