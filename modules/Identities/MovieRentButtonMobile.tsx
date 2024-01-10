import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import ItemShortInfo from '@/modules/elements/ItemShortInfo';
import PlanItemsList from '@/modules/components/PlanItemsList';
import { PlayIcon } from '@heroicons/react/24/solid';
import Buttons from '@/components/identites/Buttons';
type Props = {
    data: any;
    className?: string;
    styles?: React.CSSProperties;
}
const MovieRentButtonMobile = ({
    data,
    className,
    styles
}: Props) => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        if(data?.canBuy === true){
            setOpen(true);
        }
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window?.location?.search);
        if(urlParams?.get('viewPlan') === 'true' && (data?.canBuy === true && data?.allowed === false)){
          setTimeout(() => {
            if(data?.canBuy === true){
                setOpen(true);
            }
          }, 1000);
        }
    }, []);


    return (
        <>{(data?.allowed === true)?(<Buttons
            onClick={() => router.push(`/watch/${data?._id}`)}
            type='white'
            styles={{width: '50%'}}
            ><PlayIcon className="w-6 text-black mr-2" /> {(data?.currentTime)?'Resume':'Play'}</Buttons>):
        (<button 
            onClick={handleClickOpen}
            className={`bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full py-1 px-3 w-[50%] text-base transition h-[44px] ${(data?.canBuy === true)?'':'opacity-75 cursor-not-allowed'} ${className}`}
            style={styles}
        >Rent</button>)}
        <Modal
            open={open}
            onClose={handleClickClose}
            className='flex justify-center jkBuyModal'>
                <div className='border-[3px] border-[#262626] rounded-md  bg-opacity-[100%] w-[90%] max-w-[1200px] bg-[#1A1A1A]  px-[20px] py-[30px] relative '>
                <button
                    type="button"
                    onClick={handleClickClose}
                    className='absolute top-0 right-0 text-white text-4xl px-2 py-1'>
                    &times;
                </button>
                <div className='text-white mb-2 w-full'>
                    <h3 className='text-xl md:text-2xl font-semibold'>Choose Your Plan</h3>
                </div>
                <ItemShortInfo data={data}/>
                {(data?.canBuy === true)?(<PlanItemsList 
                    allowedPlans={data?.allowedPlans}
                    isPackage={false}
                    movieId={data?._id}
                />):
                null}
            </div>
        </Modal>
        </>
    );
}
export default MovieRentButtonMobile;