import React from 'react';
import Modal from '@mui/material/Modal';
import {
    CloseOutlined, 
    FacebookOutlined,
    Twitter,
    MailOutlined,
    Reddit,
} from '@mui/icons-material';
import {
    EmailShareButton,
    FacebookShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
  } from "react-share";
type Props = {
    open: boolean;
    setOpen: any;
    url: string;
    title: string;
};
const SocialShare = ({url, title, open, setOpen}:Props) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setIsCopied(false);
    };
    return (        
        <Modal
        open={open}
        aria-labelledby="Social Share Modal"
        aria-describedby="Socail Share Modal"
        onClose={handleClose}
        className='flex justify-center items-center'>
          <div className='rounded-md w-[90%] max-w-[720px] bg-[#262626] relative text-white'>
            <p className='pr-[50px] font-semibold text-xl pt-3 pl-4'>
                Share
            </p>
            <button
            onClick={handleClose}
            className='absolute top-0 right-2 text-white text-4xl font-semibold'>
              <CloseOutlined/>
            </button>
            <div className="flex items-center flex-wrap p-4 pt-8">
                <EmailShareButton 
                    url={url}
                    title={title}
                    className="cursor-pointer flex flex-col justify-center items-center transition px-2 w-[25%]">
                    <MailOutlined
                        sx={{
                            fontSize: '32px',
                            marginBottom: '10px',
                        }}
                    />
                    <span className='text-xs lg:text-base'>Email</span>
                </EmailShareButton>
                <FacebookShareButton 
                    url={url}
                    title={title}
                    className="cursor-pointer flex flex-col justify-center items-center transition px-2 w-[25%]">
                    <FacebookOutlined
                        sx={{
                            fontSize: '32px',
                            marginBottom: '10px',
                        }}
                    />
                    <span className='text-xs lg:text-base'>Facebook</span>
                </FacebookShareButton>
                <TwitterShareButton 
                    url={url}
                    title={title}
                    className="cursor-pointer flex flex-col justify-center items-center transition px-2 w-[25%]">
                    <Twitter
                        sx={{
                            fontSize: '32px',
                            marginBottom: '10px',
                        }}
                    />
                    <span className='text-xs lg:text-base'>Twitter</span>
                </TwitterShareButton>
                <RedditShareButton 
                    url={url}
                    title={title}
                    className="cursor-pointer flex flex-col justify-center items-center transition px-2 w-[25%]">
                    <Reddit
                        sx={{
                            fontSize: '32px',
                            marginBottom: '10px',
                        }}
                    />
                    <span className='text-xs lg:text-base'>Reddit</span>
                </RedditShareButton>
                <button className='mt-8 h-[44px] lg:h-[60px] bg-white text-black rounded-md font-medium cursor-pointer flex flex-col justify-center items-center transition px-2 w-[100%] hover:scale-105'
                onClick={() => {
                    navigator.clipboard.writeText(url);
                    setIsCopied(true);
                }}>
                    {(isCopied)?(<span>Copied!</span>):(<span>Copy Link</span>)}
                </button>
            </div>
        </div>
      </Modal>
    );
};
export default SocialShare;