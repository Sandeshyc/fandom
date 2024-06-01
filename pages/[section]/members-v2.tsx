import React, {useState, useEffect}from 'react';
import { useRouter } from 'next/router';
import {
    getEntitlementList
} from '@/services/api';
import useIsMobile from '@/hooks/useIsMobile';
import { getAllowedItems } from '@/utils/getData';
import Navigation from "@/modules/components/Navigation";
import Footer from '@/components/Footer';
import Preloader from '@/modules/skeletons/Preloader';
const exclusive = '/images/exclusive.png';
const contentId = '6641a3eba9e8e0ae2a7786b8x';
const Member = () => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { section } = router.query;
    const [isReady, setIsReady] = useState(false);
    const [userId, setUserId] = useState("");
    const [pageDirectory, setPageDirectory] = useState('');

    useEffect(() => {
        if(pageDirectory){
            const userInfo = window.localStorage.getItem('userInfo');
            if (userInfo) {
                const userInfoObj = JSON.parse(userInfo);
                if(userInfoObj.sub) {
                    setUserId(userInfoObj.sub);
                    const _getEntitlementList = async() => {
                        const resEntitlement = await getEntitlementList(userInfoObj.sub);
                        console.log('Response::::', resEntitlement);
                        if(resEntitlement.status === 'success'){
                            const allowedIds = getAllowedItems(resEntitlement?.data);
                            if(Array.isArray(allowedIds) && allowedIds.length > 0){
                                allowedIds.map((allowItem: any) => {
                                    if((allowItem?.content?.contentId === contentId) && (allowItem?.content?.pageDirectory === pageDirectory)){
                                        setIsReady(true);
                                    }else{
                                        console.log('Entitlement Not found!');
                                        router.push(`/`+section);
                                    }
                                });
                            }else{
                                console.log('Entitlement Not found!');
                                router.push(`/`+section);
                            }
                        }else{
                            console.log('Entitlement API found');
                            router.push(`/`+section);
                        }
                    };
                    _getEntitlementList();
                }else{
                    console.log('User not found::', userInfoObj);
                    router.push(`/`+section);
                }
            }else{
                console.log('User not found:', userInfo);   
                router.push(`/`+section);     
            }
        }
    }, [pageDirectory]);
    useEffect(() => {
        if(section){
            setPageDirectory(section+'/members');
        }
    }, [section]);
    return (
        <>
        {(isReady)?(
            <>
            <Navigation/>        
            <div className='w-full h-full min-h-screen bg-gradient-to-t to-[#EFF3F6] to-[75%] from-[#FFE5F1] text-[#93767A]'
            style={{
                paddingTop: isMobile ? "90px" : "140px",
                paddingBottom: isMobile ? "70px" : "90px",
            }}>
                <div className='my-8'>
                    <div className='container mx-auto max-w-[1024px] px-4'>
                        <div className='w-full aspect-video'>
                            <iframe src="https://www.youtube.com/embed/QNV2DmBxChQ?si=4zy0Uv2mY7L30UMz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='w-full h-full'></iframe>
                        </div>
                    </div>
                </div>
                <div className='my-8'>
                    <div className="container mx-auto">
                        <div className="text-center mx-auto max-w-[600px]">
                            <h1 className="text-3xl font-bold">Exclusive Merch</h1>
                            <p className="text-lg">Lorem ipsum dolor sit amet consectetur. Erat amet mauris lobortis et orci laoreet. Accumsan egestas elit id lacus sagittis mattis.</p>
                        </div>
                        <div className='my-8 text-center'>
                            <img src={exclusive} alt="Exclusive" className='max-w-full w-auto mx-auto'/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        ):(
            <Preloader/>
        )}
        </>
    );
};
export default Member;