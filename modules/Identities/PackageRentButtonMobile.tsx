import React, {useEffect} from 'react';
import Modal from '@mui/material/Modal';
import ItemShortInfo from '@/modules/elements/ItemShortInfo';
import PlanItemsList from '@/modules/components/PlanItemsList';
type Props = {
    data: any;
    hasMovieList?: boolean;
    className?: string;
    styles?: React.CSSProperties;
}
const PackageRentButtonMobile = ({
    data,
    hasMovieList,
    className,
    styles
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window?.location?.search);
        if(urlParams?.get('viewPlan') === 'true' && (data?.canBuy === true && data?.allowed === false)){
          setTimeout(() => {
            setOpen(true);
          }, 1000);
        }
    }, []);
    return (
        <>{(data?.allowed !== true)?(<button 
            onClick={handleClickOpen}
            className={`bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full py-1 px-3 w-${(hasMovieList)?'[50%]':'full'} text-base transition h-[44px] ${className}`}
            style={styles}
        >Rent</button>):
        (<button
            className={`bg-black/60 border border-blue-600 text-white rounded-full py-1 px-3 w-${(hasMovieList)?'[50%]':'full'} text-base transition h-[44px] cursor-not-allowed`}>
              Purchased           
            </button>)}
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
                    isPackage={true}
                    movieId={data?._id}
                />):
                null}
            </div>
        </Modal>
        </>
    );
}
export default PackageRentButtonMobile;