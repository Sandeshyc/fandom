import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import BillboardBanner from '@/modules/elements/BilboardBanner';
import LinkRoute from '@/modules/Identities/LinkRoute';
import Title from '@/modules/Identities/Title';
import Text from '@/modules/Identities/Text';
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
query GetLocations {
  playlist (input: {id: "66069190656b5733db0a786b"}) {
    assetId
    items {
      assetId
      offAirDate
      onAirDate
      images {
        thumbnailLandscapeURL
        trailerURL
      }
      video {
        title
        description
      contentProvider
        playbackURLs {
          hls {
            url
          }
        }
      }
    }
  }
  }
}
`;
type Props = {
  data: any;
};
const Billboard = ({data}:Props) => {
  console.log('Billboard********************* ')
  const { loading, error, data: gqlData } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log('GQL D********** ', gqlData)

  data = data?.[(Math.floor(Math.random() * data?.length))] ?? {}
  const itemId = data?._id;
  const title = data?.title;
  const description = data?.description;
  const trailerUrl = data?.trailerUrl;
  const thumbnailUrl = data?.thumbnailBannerUrl;
  const detailUrl = `/details/${itemId}`;
  const watchUrl = `/watch/${itemId}`;
  return (
      <div className={`relative billboardSec`}>   
        <BillboardBanner
          thumbnailUrl={thumbnailUrl}
          trailerUrl={trailerUrl}
        />
        <div className={`absolute bottom-[0%] pb-6 sm:pb-10 lg:pb-16 xl:pb-25 pl-4 md:pl-16 transition`}>
          <div className='mb-8 w-[90%] md:w-[80%] lg:w-[50%] text-contentColor'>
            {(title) && <Title tag="h1" size="6xl" className='mb-2'>{title}</Title>}
            {(description) && <Text size="lg" clamp={4}>{description}</Text>}
          </div>  
          {(itemId) && (
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              {(data?.allowed)?
                <LinkRoute href={watchUrl} type="white">
                  <PlayIcon className="w-5 text-black mr-2" /> 
                  Play Now
                </LinkRoute>
              :
                <LinkRoute href={`${detailUrl}/?viewPlan=true`} type="primary">Rent</LinkRoute>
              }

              <LinkRoute href={`${detailUrl}`} type="hoverOutline">
                Know More 
                <ChevronRightIcon className="w-5 h-5 ml-2 text-contentColor/80" />
              </LinkRoute>
            </div>
          )}
        </div>
      </div>
  )
}
export default Billboard;