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
};
const TrailerPlayButton = (inputProps: Props) => {
    const { data, itemId } = inputProps;
    const trailerPageUrl = `/watch/${itemId}?trailer=true`;
    const watchPageUrl = `/watch/${itemId}`;
    return (
        <>
        {(data?.allowed) ? (
            <>
            {(data?.canPlay)?(
                <LinkRoute href={watchPageUrl} type="white" size={'lg'}>
                    <PlayIcon className="w-6 text-black mr-2" />
                    Play Now
                </LinkRoute>
            ):(
                <DisabledButton stage="play" size={'lg'}>
                    <PlayIcon className="w-5 text-black mr-2" />                   
                    Play Now
                </DisabledButton>
            )}
            </>
        )
        :(
            <LinkRoute href={trailerPageUrl} type="white" size={'lg'}>
                <TrailerIcon/>
                <span className='ml-2'>Trailer</span>
            </LinkRoute>
        )}
        </>
    );
};
export default TrailerPlayButton