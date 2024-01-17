import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Info } from '@mui/icons-material';
import Footer from '@/components/Footer';
import NavigationHome from '@/modules/elements/NavigationHome';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  return (
    <>
      <NavigationHome />
      <div className="pt-20 lg:pt-28 min-h-[85vh] min-w-full text-white"
      style={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto', 
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className='container mx-auto py-2'>
          <h1 className='text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-6'>
          IWANTTFC TICKETS TERMS & CONDITIONS
          </h1>
          <p className='mt-4'>
          IWANTTFC TICKETS (“IWANTTFC TICKETS”), a website owned and operated by ABS-CBN Corporation (“ABS-CBN” , “us”, “We”, “we”, “Our” or “our”), is an online ticketing and streaming platform which enables its users to avail or purchase digital tickets to watch a musical, theatrical, dramatic, artistic, cultural or other event production, attraction, movie or place (the “Event”) and other content (collectively, the “Content”). The purchase of digital tickets or watching of Content (or the “Service”) may be accessed via - https://tickets.iwanttfc.com/ (the “Website”) and is provided to users for their personal, private, and non-commercial use only.
          </p>
          <p className='mt-4'>
          These Terms and Conditions of Use, the Privacy Notice & Cookie Policy, including any amendment, addendum, modification, annex, supplement or update thereon (the “Terms”) govern the relationship between ABS-CBN  as service provider and you as user of the Service, and/or the Website (“Subscriber”, “User”, “You”, or “you”), of your use of the Service, and/or the Website. By accessing or using the Service, and/or the Website and/or purchasing from the Website, you acknowledge, agree and confirm that you have read, understood and accept the Terms, our Privacy Notice and our Cookie Policy, including any amendment, addendum, modification,  annex, supplement or update thereto. You are therefore highly encouraged to read and review the Terms prior to your usage of IWANTTFC TICKETS.
          </p>
          <p className='mt-4'>
          We may change, amend, modify, supplement, or update the Terms from time to time without prior notice and your continued use of the Service, and/or the Website constitute your acceptance of the Terms, and any amendment, addendum, modification, annex, supplement or updates thereto. Please check the Terms from time to time to keep yourself updated on any changes, amendments, modifications or updates thereto. Unless otherwise specified, any and all new feature/s or functionality of the Service and/or the Website shall be subject to the current Terms. The current version of the Terms, including recent updates, will be available on the Website.
          </p>
          <p className='mt-4'>
          You acknowledge, understand and agree that your use of the Service and/or the Website may be subject to additional and separate terms and conditions and privacy policies of affiliated and/or third-party entities which, as the case may be, own, operate, maintain, manage, host, manufacture, service and/or provide the Website, the Service, or certain components, features or functionalities thereof. By subscribing to or and/or using the Website and/or the Service, you signify your agreement to and acceptance of such terms and conditions and privacy policies.   
          </p>
          <p className='mt-4'>
          The Terms that are applicable to you will depend on the country or territory where you are based on your IP address at the time of your registration to the Service. Additional terms may also apply if you access or use the Service in other country/ies or territory/ies. It is your responsibility to review and to comply with all applicable Terms and additional terms.  
          </p>
          <h2
          className='text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-6 mt-10'
          >A. TICKET PURCHASE</h2>
          <p className='mt-4'>The sale or issuance of digital tickets by IWANTTFC TICKETS through the Website to watch the Content , and/or the showing of a Content are done by ABS-CBN as an agent of the Event organizer (“Seller”). Therefore, tickets sold by or through IWANTTFC TICKETS are subject to the Seller’s conditions of sale (whenever applicable) and to these Terms to the extent that they are not inconsistent with the Seller’s conditions of sale. </p>
          <h3 
          className='text-white text-xl md:text-2xl lg:text-[2rem] font-semibold mb-6 mt-10'
          >I. CONDITIONS ON TICKET PURCHASE</h3>
          <p className='mt-4'>All digital tickets bought, or obtained from or through IWANTTFC TICKETS are non-refundable, non-transferable, and are not available for exchange. The purchase of the digital ticket will allow You to watch the Content on the Website, on a single device at a given time, for the period your digital ticket entitles you to. </p>
          <p className='mt-4'>In case of cancellation or re-scheduling of the Event by the Seller, all refunds or exchange for cancelled or re-scheduled Event shall be done through the Seller.</p>
          <p className='mt-4'>The Seller may require the ticket holders to present proof of identification and reserves the right to refuse entry to ticket holders who failed to provide sufficient proof of identification.</p>
          <p className='mt-4'>Any legally mandated privileges, such as but not limited to senior citizen and person with disability discounts, shall be availed in the Event venue or through the Seller.</p>
          <p className='mt-4'>Digital tickets bought or obtained from or through IWANTTFC TICKETS are not for resale or distribution. In certain instances, You may be allowed to purchase a digital ticket as a gift to a recipient. These Terms shall be applicable to all digital tickets purchased as gifts. You acknowledge that if the recipient does not access the Content within the time the digital ticket entitles him to, no refunds shall be made to You.</p>
          <p className='mt-4'>IWANTTFC TICKETS reserves the right to limit the quantity of digital tickets available for purchase. Digital tickets may be restricted to a maximum number per person, per day, per Event, or per credit or debit card. In relation thereto, IWANTTFC TICKETS likewise reserves the right to cancel any order(s) for tickets in excess of the relevant limits without notice.</p>
          <p className='mt-4'>All ticket holders of free tickets are required to attend the events that they booked. Otherwise, ticket holder’s IWANTTFC TICKETS will be temporarily blocked from booking any ticket for ninety (90) days. In case of a possible non-attendance, ticket holders may request for change of the name indicated in the ticket until one (1) day before the Event. Ticket holder may also rebook the tickets to another date, or request for a cancellation of order.</p>
          <p className='mt-4'></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;