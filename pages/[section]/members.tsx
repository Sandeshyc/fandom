import React, {useState, useEffect, use}from 'react';
import { useRouter } from 'next/router';
import useCheckEntitlement from '@/hooks/useCheckEntitlement';
import usePlans from '@/hooks/usePlans';
import useClientLocaion from "@/hooks/useClientLocaion";
import { getAllowedItems } from '@/utils/getData';
const contentId = '6641a3eba9e8e0ae2a7786b8';
const Member = () => {
    const router = useRouter();
    const { section } = router.query;
    const [isCheckEntitlement, setIsCheckEntitlement] = useState(false);
    const [pageDirectory, setPageDirectory] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [userId, setUserId] = useState("");
    const [allowedItemLists, setAllowedItemLists] = useState([] as any[]);
    const [allowedItem, setAllowedItem] = useState({
        content: {
            contentId: '',
            pageDirectory: ''
        }
    } as any);
    const {data: entitlementData, error: entitlementError, isLoading: entitlementLoading} = useCheckEntitlement(userId);
    console.log('Data', entitlementData, 'Error', entitlementError, 'isLoding', entitlementLoading,'isReady', isReady);
    useEffect(() => {
        if(isReady && !entitlementLoading && (entitlementData !== undefined)){
            const allowedIds = getAllowedItems(entitlementData); 
            setAllowedItemLists(allowedIds);
            setIsCheckEntitlement(true);
        }
    }, [isReady, entitlementLoading, entitlementData]);
    

    useEffect(() => {
        console.log('allowedItemLists::', allowedItemLists);
        if (Array.isArray(allowedItemLists) && allowedItemLists.length > 0) {
          const allowedIds = allowedItemLists.map((allowItem: any) => {
            if(allowItem?.content?.contentId === contentId){
              return allowItem;
            }
          });
          console.log('allowItem::', allowedIds);
          if(Array.isArray(allowedIds) && allowedIds.length > 0){
            setAllowedItem(allowedIds[0]);
            console.log('allowItem [0]::', allowedIds[0]);
            }
        }        
    }, [allowedItemLists, contentId]);

    useEffect(() => {
        const userInfo = window.localStorage.getItem('userInfo');
        if (userInfo) {
            const userInfoObj = JSON.parse(userInfo);
            if(userInfoObj.sub) {
                setUserId(userInfoObj.sub);
            }
        }
        setIsReady(true);
    }, []);
    useEffect(() => {
        if(section){
            setPageDirectory(section+'/members');
        }
    }, [section]);
    useEffect(() => {
        if(isCheckEntitlement && (!allowedItem?._id || allowedItem?.content?.contentId !== contentId || pageDirectory !== allowedItem?.content?.pageDirectory)){
            console.log('Incorrect go Bini', contentId, pageDirectory, allowedItem);
        }
    }, [isCheckEntitlement, allowedItem?._id, pageDirectory, contentId]);
    // useEffect(() => {
    //     if(allowedItem){
    //         if((allowedItem?.content?.contentId === contentId) && (pageDirectory === allowedItem?.content?.pageDirectory)){
    //             // setIsReady(true);
    //             console.log('ddd');
    //         }else{
    //             // router.push(`/`+section);
    //             console.log('ddds');
    //         }
    //     }else{
    //         console.log('dddddd');
    //     }
    // }, [pageDirectory, allowedItem]);
    return (
        <div>
            Parent Page: {pageDirectory}
        </div>
    );
};
export default Member;