import React from 'react';
import LinkRoute from "@/modules/Identities/LinkRoute";
import {
    TrailerIcon
} from '@/utils/CustomSVGs';
import { RestartAlt } from '@mui/icons-material';
type Props = {
    data?: any;
    itemId?: string;
    currentTime?: number;
};
const TrailerRestartButton = (inputProps: Props) => {
    const { data, itemId, currentTime } = inputProps;
    const trailerPageUrl = `/watch/${itemId}?trailer=true`;
    const restartPageUrl = `/watch/${itemId}?t=restart`;
    return (
        <>
        {(data?.allowed && data?.canPlay && currentTime) ? (
            <LinkRoute href={restartPageUrl} type="white" size={'lg'}>
                <RestartAlt className="w-6 text-black mr-2" />
                Restart
            </LinkRoute>
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
export default TrailerRestartButton