import React from 'react';
import LinkRoute from "@/modules/Identities/LinkRoute";
import DisabledButton from "@/modules/elements/Purchase/DisabledButton";
import {
    TrailerIcon
} from '@/utils/CustomSVGs';
import { PlayIcon } from '@heroicons/react/24/solid';
type Props = {
    data?: any;
    itemId?: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
};
const TrailerPlayButton = ({ data, itemId, size='lg' }:Props) => {
    const trailerPageUrl = `/watch/${itemId}?trailer=true`;
    const watchPageUrl = `/watch/${itemId}`;
    return (
        <>
        {(data?.allowed) ? (
            <>
            {(data?.canPlay)?(
                <LinkRoute href={watchPageUrl} type="white" size={size}>
                    <PlayIcon className="w-6 text-black mr-2" />
                    Play Now
                </LinkRoute>
            ):(
                <DisabledButton stage="play" size={size}>
                    <PlayIcon className="w-5 text-black mr-2" />                   
                    Play Now
                </DisabledButton>
            )}
            </>
        )
        :(
            <LinkRoute href={trailerPageUrl} type="white" size={size}>
                <TrailerIcon/>
                <span className='ml-2'>Trailer</span>
            </LinkRoute>
        )}
        </>
    );
};
export default TrailerPlayButton