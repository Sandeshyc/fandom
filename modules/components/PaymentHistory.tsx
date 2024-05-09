import React, { useEffect, useState } from 'react';
import usePaymentHistory from '@/hooks/usePaymentHistory';
import {
    PictureAsPdfOutlined,
    ContentCopyOutlined,
    ContentCopyTwoTone
} from '@mui/icons-material';
import { stableKeys } from '@/utils/stableKeys';
import Title from '@/modules/Identities/Title';
import {
    getDateFormat
} from '@/utils/yearFromDate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PaymentHistory = () => {
    const [isReady, setIsReady] = useState(false);
    const [userId, setUserId] = useState('');
    const [copyText, setCopyText] = useState('');

    // const { data, isLoading, error } = usePaymentHistory('7B6E23C8-6B77-4294-A7A3-66B4748D8D05');
    const { data, isLoading, error } = usePaymentHistory(userId);
    // console.log('data: ', data, isLoading, error);
    const cellClass = `before:mr-4 before:font-medium before:text-gray-900 p-2 lg:py-4 flex flex-wrap justify-between lg:table-cell border-b border-gray-300/50 lg:first:pl-4`;
    const copyTextFunc = (text: string) => {
        navigator?.clipboard?.writeText(text);
        setCopyText(text);
    }
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
    return (
        <div className='py-4'>
            <div className='text-center mb-4 font-medium text-black/80'>
                <Title tag='h2' size='2xl'>Payment History</Title>
            </div>
            <div className='w-full overflow-y-hidden lg:overflow-x-auto'>
                <table className='w-full text-left paymentHistoryTable'>
                    <thead className='hidden lg:table-header-group text-gray-900/70'>
                        <tr className='px-4'>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[120px] pl-4">Date</th>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[200px]">Content title</th>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[120px]">Product Name</th>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[180px]">Order Number</th>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[150px]">Payment Method</th>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[100px]">Transaction Type</th>
                            <th className="p-2 whitespace-nowrap font-semibold min-w-[80px]">Amount</th>
                        </tr>
                    </thead>
                    {(!isLoading && isReady && data)?
                    <tbody className='text-sm'>
                        {
                        (Array.isArray(data) && data.length > 0) ? (
                            <>
                            {
                            data.map((payment, index) => (
                            <tr key={stableKeys[index]} className={`text-gray-900/70 block lg:table-row ${(index % 2 === 0) ? 'bg-white/20' : ''}`}>
                                <td className={cellClass} data-label={'Date'}>
                                    {getDateFormat(payment?.date)}
                                </td>
                                <td className={cellClass} data-label={'Content title'}>
                                    <span className='font-semibold'>
                                        {payment?.contentTitle}
                                    </span>
                                </td>
                                <td className={cellClass} data-label={'Product Name'}>
                                    {payment?.productName}
                                </td>
                                <td className={cellClass} data-label={'Order Number'}>
                                    <span>
                                        {payment?.orderNumber} 
                                        {(copyText === payment?.orderNumber) ? (
                                            <span className='text-black ml-2' title='Copied'>
                                                <ContentCopyTwoTone
                                                    sx={{ fontSize: 20 }}
                                                />
                                            </span>
                                        )
                                        :
                                        (
                                            <span className='text-black/50 ml-2 cursor-copy' title='Copy' onClick={() => copyTextFunc(payment?.orderNumber)}>
                                                <ContentCopyOutlined
                                                    sx={{ fontSize: 20 }}
                                                />
                                            </span>
                                        )}
                                    </span>    
                                </td>
                                <td className={cellClass} data-label={'Payment Method'}>
                                    <div className='flex items-center'>
                                        {/* {(payment.paymentIcon) && (
                                            <img src={payment.paymentIcon} alt='' className='w-8 h-8 object-contain mr-2' />
                                        )} */}
                                        <span>{payment?.paymentMethod?.type} {payment?.paymentMethod?.cardtype} {payment?.paymentMethod?.cardno}</span>
                                    </div>
                                </td>
                                <td className={cellClass} data-label={'Transaction Type'}>{payment?.transactionType}</td>
                                <td className={cellClass} data-label={'Amount'}>{payment?.totalAmount?.currency} {payment?.totalAmount?.amount}</td>
                                <td className={cellClass} data-label={'Receipt'}>
                                    <button className='text-blue-500' title='Download'>
                                        <PictureAsPdfOutlined
                                            sx={{ fontSize: 30, color: 'blue' }}
                                        />
                                    </button>
                                </td>
                            </tr>
                            ))
                            }
                            </>
                        )
                        :
                        (<tr>
                            <td colSpan={6} className='text-center py-4 text-red-800'>
                                No Payment History Found!
                            </td>
                        </tr>)
                        }
                    </tbody>
                    :
                    <tbody>
                        {Array(4).fill(0).map((_, index) => (
                            <tr className={`text-gray-900/70 block lg:table-row`} key={index}>
                                <td className={cellClass} data-label={'Date'}>
                                    <div className="w-[100px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>
                                <td className={cellClass} data-label={'Content Title'}>
                                    <div className="w-[140px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>
                                <td className={cellClass} data-label={'Product Name'}>
                                    <div className="w-[140px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>
                                <td className={cellClass} data-label={'Order Number'}>
                                    <div className="w-[120px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>                            
                                <td className={cellClass} data-label={'Payment Method'}>
                                    <div className="w-[120px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>
                                <td className={cellClass} data-label={'Transaction Type'}>
                                    <div className="w-[130px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>
                                <td className={cellClass} data-label={'Amount'}>
                                    <div className="w-[70px]">
                                        <Skeleton baseColor='#999' highlightColor='#222' className='h-[18px]'/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    );
};
export default PaymentHistory;