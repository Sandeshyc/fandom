import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Info } from '@mui/icons-material';
import Link from 'next/link';
import Footer from '@/components/Footer';
import NavigationHome from '@/modules/elements/NavigationHome';
const bgImage = 'url("/images/new-bg.png")';
const Home = (props:any) => {
  return (
    <>
      <NavigationHome />
      <div className="pt-20 lg:pt-28 min-h-[85vh] min-w-full text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
      style={{
        // backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto', 
        backgroundPosition: 'right '+ 30 + '%',
      }}>
        <div className='container mx-auto py-2'>
        <h1 className="text-[20px] md:text-[24px] xl:text-[26px] 2xl:text-[32px] font-bold mb-5">IWANTTFC TICKETS TERMS &amp; CONDITIONS</h1>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          IWANTTFC TICKETS (“IWANTTFC TICKETS”), a website owned and operated by
          ABS-CBN Corporation (“ABS-CBN” , “us”, “We”, “we”, “Our” or “our”), is
          an online ticketing and streaming platform which enables its users to
          avail or purchase digital tickets to watch a musical, theatrical,
          dramatic, artistic, cultural or other event production, attraction,
          movie or place (the “Event”) and other content (collectively, the
          “Content”). The purchase of digital tickets or watching of Content (or
          the “Service”) may be accessed via -&nbsp;
          <Link className="underline" href="https://tickets.iwanttfc.com/">
            https://tickets.iwanttfc.com/
          </Link>
          (the “Website”) and is provided to users for their personal, private,
          and non-commercial use only.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          These Terms and Conditions of Use, the
          <Link
            href="/terms/privacy"
            target="_blank"
            title="Privacy &amp; Cookies Policy"
            className="underline"
          >
            Privacy Notice &amp; Cookie Policy
          </Link>
          , including any amendment, addendum, modification, annex, supplement
          or update thereon (the “Terms”) govern the relationship between
          ABS-CBN &nbsp;as service provider and you as user of the Service,
          and/or the Website (“Subscriber”, “User”, “You”, or “you”), of your
          use of the Service, and/or the Website. By accessing or using the
          Service, and/or the Website and/or purchasing from the Website, you
          acknowledge, agree and confirm that you have read, understood and
          accept the Terms, our Privacy Notice and our Cookie Policy, including
          any amendment, addendum, modification, &nbsp;annex, supplement or
          update thereto. You are therefore highly encouraged to read and review
          the Terms prior to your usage of IWANTTFC TICKETS.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          We may change, amend, modify, supplement, or update the Terms from
          time to time without prior notice and your continued use of the
          Service, and/or the Website constitute your acceptance of the Terms,
          and any amendment, addendum, modification, annex, supplement or
          updates thereto. Please check the Terms from time to time to keep
          yourself updated on any changes, amendments, modifications or updates
          thereto. Unless otherwise specified, any and all new feature/s or
          functionality of the Service and/or the Website shall be subject to
          the current Terms. The current version of the Terms, including recent
          updates, will be available on the Website.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You acknowledge, understand and agree that your use of the Service
          and/or the Website may be subject to additional and separate terms and
          conditions and privacy policies of affiliated and/or third-party
          entities which, as the case may be, own, operate, maintain, manage,
          host, manufacture, service and/or provide the Website, the Service, or
          certain components, features or functionalities thereof. By
          subscribing to or and/or using the Website and/or the Service, you
          signify your agreement to and acceptance of such terms and conditions
          and privacy policies. &nbsp; &nbsp;
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The Terms that are applicable to you will depend on the country or
          territory where you are based on your IP address at the time of your
          registration to the Service. Additional terms may also apply if you
          access or use the Service in other country/ies or territory/ies. It is
          your responsibility to review and to comply with all applicable Terms
          and additional terms. &nbsp;
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">A. TICKET PURCHASE</h2>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The sale or issuance of digital tickets by IWANTTFC TICKETS through
          the Website to watch the Content , and/or the showing of a Content are
          done by ABS-CBN as an agent of the Event organizer (“Seller”).
          Therefore, tickets sold by or through IWANTTFC TICKETS are subject to
          the Seller’s conditions of sale (whenever applicable) and to these
          Terms to the extent that they are not inconsistent with the Seller’s
          conditions of sale.&nbsp;
        </p>

        <h3 className="font-bold text-base md:text-lg xl:text-xl mb-1">I. CONDITIONS ON TICKET PURCHASE</h3>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          All digital tickets bought, or obtained from or through IWANTTFC
          TICKETS are non-refundable, non-transferable, and are not available
          for exchange. The purchase of the digital ticket will allow You to
          watch the Content on the Website, on a single device at a given time,
          for the period your digital ticket entitles you to. &nbsp;
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          In case of cancellation or re-scheduling of the Event by the Seller,
          all refunds or exchange for cancelled or re-scheduled Event shall be
          done through the Seller.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The Seller may require the ticket holders to present proof of
          identification and reserves the right to refuse entry to ticket
          holders who failed to provide sufficient proof of identification.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Any legally mandated privileges, such as but not limited to senior
          citizen and person with disability discounts, shall be availed in the
          Event venue or through the Seller.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Digital tickets bought or obtained from or through IWANTTFC TICKETS
          are not for resale or distribution. In certain instances, You may be
          allowed to purchase a digital ticket as a gift to a recipient. These
          Terms shall be applicable to all digital tickets purchased as gifts.
          You acknowledge that if the recipient does not access the Content
          within the time the digital ticket entitles him to, no refunds shall
          be made to You.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          IWANTTFC TICKETS reserves the right to limit the quantity of digital
          tickets available for purchase. Digital tickets may be restricted to a
          maximum number per person, per day, per Event, or per credit or debit
          card. In relation thereto, IWANTTFC TICKETS likewise reserves the
          right to cancel any order(s) for tickets in excess of the relevant
          limits without notice.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          All ticket holders of free tickets are required to attend the events
          that they booked. Otherwise, ticket holder’s IWANTTFC TICKETS will be
          temporarily blocked from booking any ticket for ninety (90) days. In
          case of a possible non-attendance, ticket holders may request for
          change of the name indicated in the ticket until one (1) day before
          the Event. Ticket holder may also rebook the tickets to another date,
          or request for a cancellation of order.
        </p>

        <h3 className="font-bold text-base md:text-lg xl:text-xl mb-1">II. CANCELLATION AND REBOOKING</h3>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Cancellation and rebooking of tickets shall depend on the policy of
          the Seller of the Event.
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The cancellation and/or rebooking may however be subject to a change
          order fee, the rate of which will depend on the Seller of the Event.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Failure to cancel and/or rebook such tickets shall make the purchase
          final, and not subject to cancellation, rebooking, transfer, or
          refund.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">B. CONTENT</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          By purchasing a digital ticket to watch a Content on the Website, you
          will be able to access and watch the specific Content or title during
          the limited period specified thereon.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You acknowledge, understand and agree that the Seller may withdraw,
          cancel, suspend, modify, discontinue, or change the showing schedule
          of a Content, the ticket price or terms. In such instances, you shall
          not have any recourse against IWANTTFC TICKETS, its parent,
          subsidiaries and affiliated companies (the “Affiliates”), their
          directors, stockholders, employees and/or representatives in
          connection with Seller’s exercise of these rights, and IWANTTFC
          TICKETS’ implementation thereof.. You acknowledge that certain Content
          may not be available in certain countries or territories due to rights
          restrictions, technological limitations, and/or legal or regulatory
          requirements.&nbsp;
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          IWANTTFC TICKETS may insert, serve, show or display advertisements,
          commercials, pre-rolls, mid-rolls, end-rolls, banners, of or for its
          own or its Affiliates’ products or services (“IWANTTFC TICKETS
          Advertisements”) and/or products or services of third-party
          advertisers (“Third Party Advertisements”) on any Content shown on the
          Website, for which IWANTTFC TICKETS may derive advertising or
          sponsorship revenue. &nbsp;You acknowledge, understand and agree that
          IWANTTFC TICKETS is and shall not be liable nor responsible for Third
          Party Advertisements, and that you shall not have any recourse
          against, and shall hold free and harmless, IWANTTFC TICKETS and its
          Affiliates, from and against any and all claims, damages, cost,
          liability or suit arising out of or in connection with any Third Party
          Advertisement on the Service, and/or the Website,, including but not
          limited to claims for infringement, invasion of privacy, defamation,
          libel.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You may access the Content where we have offered the Service and where
          we have the license to air or stream such Content. The Content that
          may be available for you to watch will vary by country, territory, or
          geographic location and will change from time to time.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The streaming and quality of Content on the Service may vary due to
          different factors such as type of device, location, internet
          speed/bandwidth, and the type the Content (high definition, etc.).
          Please check the&nbsp;FAQ Page&nbsp;for the recommended internet
          connection speed. To avail of the Service, you will need internet
          access. The fee that you pay us watch a Content does not include
          internet access. &nbsp;You shall solely be responsible for procuring,
          maintaining, and paying the fees for your internet service to your
          internet service provider.
        </p>
        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">C. CONDITIONS ON WATCHING A CONTENT</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You may only access the Service and view a Content for personal and
          for a non-commercial purpose (“Right to Use”). &nbsp;You further
          acknowledge that the Service is the sole exclusive property of
          ABS-CBN, and that the Content is the sole exclusive property of the
          Seller. The Service and the Content are protected by copyrights,
          trademarks, service marks, patent or other proprietary rights and all
          applicable local and international laws. &nbsp;Your Right to Use does
          not grant, convey or otherwise transfer any license, sublicense or
          ownership of any such Products. You agree not to sell/resell,
          digitally stream, broadcast or disseminate, modify, rent, lease,
          distribute or create derivative works based on the Content or retain
          any copy/duplicate the Content, absent the prior express written
          authorization of ABS-CBN or the Seller. The Right to Use is expressly
          limited to the ticket holders only and may not be assigned or
          transferred to any third party.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          If we engage in a successful intellectual property enforcement action
          due to your unauthorized action resulting to loss, theft, pirating,
          copying, and/or unauthorized duplication of the Content, we will be
          entitled to recover from you the reasonable fees, costs, and expenses
          incurred in so enforcing its intellectual property.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          If you become aware of any infringement of any copyright or trademark
          in the Service or any of the Content shown or ABS-CBN marks, you agree
          to immediately notify ABS-CBN and you shall cooperate with ABS-CBN in
          taking such actions as ABS-CBN may designate in order to stop such
          piracy. &nbsp;&nbsp;
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          If you will be watching a Content with sensitive, graphic, adult
          and/or mature content, language and/or theme (“Adult Content”), you
          represent that you are of legal age or are of age of majority in the
          applicable jurisdiction to access and view such Adult Content. &nbsp;
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">D. PAYMENT</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You may pay for the digital ticket to watch the Content by using any
          of the following payment methods, depending on their availability in
          your country or territory: by your credit card, by using your PayPal
          account, or by other payment methods that may be available in your
          country or territory.&nbsp;
        </p>
        <ol className="list-decimal pl-8 sm:pl-10 mb-5">
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Credit Cards – You may use any major credit card to pay for your
              ticket or selected Content, provided credit card payment is
              available in your country or territory.&nbsp;
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              PayPal Account – By using your PayPal account, your credit card,
              and/or account enrolled with PayPal will be charged for the
              payment of your ticket or chosen Content.
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Other Payment Methods – Other payment methods in which may be
              available your territory.&nbsp;
            </p>
          </li>
        </ol>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          For more information about what payment methods are supported in your
          country or territory, please see our&nbsp;Checkout Page, or visit
          the&nbsp;Help Center Page.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Tickets to enable you to attend the event shall be made through the
          Seller. For more information, please see the Seller’s authorized
          ticketing page.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          We may use the services of third party payment service providers
          authorized and qualified to facilitate and collect payments on behalf
          of IWANTTFCTICKETS. In such instances, you may be subject to the terms
          and conditions and privacy policies/notices of such third party
          payment service providers wherein your personal information will be
          subject to the privacy policies/notices of the third party payment
          service provider. &nbsp;You confirm that you have read, understood and
          agree to be bound by the terms and conditions and privacy policies of
          such authorized third party payment service providers.&nbsp;
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">E.&nbsp;US SANCTIONS AND EXPORT POLICY</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You warrant that you are accessing the Service from a territory that
          is not included in the list of territories sanctioned by US Embargo
          and Sanction Laws. You are not allowed to use the Service if you are
          subject of U.S. sanctions or of sanctions consistent with U.S. law
          imposed by the governments of the country or territory where you are
          using the Service. You must comply with all U.S. or other export and
          re-export restrictions that may apply to goods, software, technology,
          and services.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">F. MARKS AND LOGOS</p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          IWANTTFC TICKETS, the Website, and everything featured on the Website
          are protected by copyrights, trademarks, service marks, patent or
          other proprietary rights and all applicable local and international
          laws. Your Right to Use the Website does not grant you the right to
          use any of the marks of IWANTTFC TICKETS, the Website, the Event
          and/or the Content, nor does it give, convey or otherwise transfer any
          license, sublicense or ownership over the Website, any products or
          services featured in the Website.&nbsp;
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">G.&nbsp;ADVERTISEMENTS AND LINKS</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The Service may provide links to the sites of affiliated companies and
          certain other businesses. We are not responsible for examining or
          evaluating, and we do not review, endorse nor warrant the offerings or
          any of these businesses. We are not responsible for examining or
          evaluating, to the extent permitted by law, and we do not endorse nor
          warrant, the offerings of any of these businesses or individuals
          (including the content of their Websites). You agree and acknowledge
          that IWANTTFC TICKETS is not responsible and does not assume any
          responsibility or liability for the actions, product, and content of
          all these and any other third parties, and that you will pay for any
          damages, losses and costs (including attorney’s fees) awarded against
          or suffered by IWANTTFC TICKETS or its Affiliates, in connection with
          your correspondence or dealings with third parties. You should
          carefully review their privacy statements and other conditions of use.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">H. USER COMMENTS AND REVIEWS</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          We may provide users with interactivity tools on the Service where you
          may publish, transmit, submit or post (collectively, "Post") your own
          content, reviews, and comments directly relevant to IWANTTFC TICKETS.
          If we provide such tools, you hereby grant IWANTTFC TICKETS, and its
          Affiliates, an absolute, irrevocable, royalty-free and non-exclusive,
          perpetual, and worldwide right to use any such Posts, in whole or in
          part, in any and all media worldwide to market, promote and advertise
          the Website and its other products and services. You also grant
          IWANTTFC TICKETS the right to attribute to you the Posts you
          published, transmitted, submitted, or posted.
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Posts will be deemed user-contributed materials and shall be subject
          to the policies regarding User-Posted Material detailed herein.&nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          IWANTTFC TICKETS reserves the right to remove, delete, deactivate,
          suspend or discontinue the interactivity tools, features or facilities
          on the Service where users can post. &nbsp;Further, IWANTTFC TICKETS
          also has the sole and full discretion to restrict, edit, remove,
          exclude, limit, or delete any Post, such as but not limited to those
          that contain content or language that is objectionable, offensive,
          discriminatory, abusive, or violative of any laws, rules and
          regulations, such as, but not limited to: a.) harsh, profane indecent,
          offensive or discriminatory language; b.) illegal, obscene, defamatory
          or objectionable materials; c.) personal information, URLs, phone
          numbers, contact information, home, office, mailing or e-mail
          addresses; d.) personal attacks on another person or entity; e.)
          unauthorized advertising or promotional materials or any form of
          solicitation; and f.) software viruses or any other computer code,
          files or programs designed to interrupt, destroy or limit the
          functionality of any computer software or computer hardware or
          telecommunication equipment. Violation of the foregoing may also
          result in the immediate suspension or termination of your account.
          Additionally, in the event of any injury or damage to either IWANTTFC
          TICKETS, its Affiliates or any user of the Website, arising out of or
          in connection with your violation of any of the foregoing, you may be
          liable for any and all applicable civil and/or criminal penalties.
          &nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You further agree not to collect, share or store personal data about
          other users. You also agree not to claim the identity of or
          misrepresent to be another person.&nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You understand and agree that IWANTTFC TICKETS will store the
          materials or communication subject of your Posts on its servers. Such
          materials will be subject to the Privacy Notice detailed hereinabove
          or as posted on the Website/s.&nbsp;
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">I. USER-POSTED MATERIALS</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You understand and agree that all information, data files, content,
          still photos, audio, video and/or audio visual materials, written
          text, comments, Post(s) or other images (collectively “Material”),
          which are made submitted, shared or otherwise made available by any
          user, past and present, through, or related to the Service are the
          sole responsibility of the person who submitted, shared or made
          available such Material.&nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          IWANTTFC TICKETS does not endorse any Material posted by the
          subscribers and/or users and such Material does not reflect the
          opinion or policies of IWANTTFC TICKETS and its Affiliates, nor of
          their employees, directors, shareholders, officers, agents, or
          representatives. You agree to waive any legal or equitable right or
          remedy you may have against IWANTTFC TICKETS and its Affiliates, their
          employees, directors, shareholders, officers, agents, or
          representatives with respect to any Material posted by a user on the
          Service.&nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          By Posting a Material, if such facility is provided by the Service,
          you represent and warrant that you own the Material posted or
          submitted or that you have obtained permission from the rightful owner
          of the Material to post, use or display it on the Service, including
          but not limited to person/s whose faces, names and/or images appear
          therein or mentioned thereon, or the persons who own or have the right
          in and to any and all elements of the Materials. You also hereby grant
          IWANTTFC TICKETS, and its Affiliates, an absolute, unencumbered,
          perpetual, irrevocable, worldwide, royalty-free and non-exclusive
          license to use the Material in whole or in part, in any and all media
          or platform now existing or hereinafter developed. You also represent
          and warrant that the Posting of the Material does not violate the
          right of any party or entity, including but not limited to invasion of
          privacy or infringement of intellectual property rights.&nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You agree to indemnify and hold IWANTTFC TICKETS, its Affiliates,
          their employees, directors, shareholders, officers, agents, or
          representatives, free and harmless from and against any claim, suit,
          liability or damages which may arise out of or in connection with any
          Material which you submitted to or Posted on the Service. You also
          grant IWANTTFC TICKETS and its Affiliates a perpetual, irrevocable,
          worldwide, royalty-free, and non-exclusive license to use, reproduce,
          adapt, modify, translate, publish and distribute the Material, in
          whole or in part, you Post or make the same available on the Service
          &nbsp;or any platforms or channels of IWANTTFC TICKETS and &nbsp;its
          Affiliates. You further agree not to exercise moral rights against
          ABS-CBN or any other person who succeeds to the same rights from
          ABS-CBN or a licensee thereof.
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          We reserve the right, but shall have no obligation, to pre-screen,
          review, edit, modify, flag, refuse, or remove any Material you make
          available in the Service upon our reasonable belief that such Material
          is offensive, indecent, objectionable, infringes the right of a person
          or entity, or for any reason whatsoever at any time.&nbsp;
        </p>
        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You may be exposed to Material made available or Posted by other users
          on the Service, if such facility is provided or allowed, that you may
          find offensive, indecent or objectionable. In such case, please advise
          us of such Material by going to the Help Center Page. &nbsp;However,
          you hereby expressly acknowledge and accept that certain Material may
          be posted or contained on the Website/s or Application/s that may be
          in opposition to your personal beliefs, opinions or taste, but shall
          nonetheless be lawfully permitted.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">J. PROMOTIONS</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          From time to time, we may conduct promotions and contests on or
          through the Service, which you may access (“Promotion”). Each
          Promotion may have additional terms and/or rules of participation
          (“Promotion Rules”) which will be posted or otherwise made available
          to you. The Promotion Rules for each Promotion in which you
          participate in will be deemed incorporated into and form a part of
          these Terms for the Promotion(s). It is your responsibility to read
          the Promotion Rules to determine whether or not your participation,
          registration or entry will be valid or restricted, and to determine
          your participation requirements.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">K. NO WARRANTIES AND LIMITATION OF LIABILITY</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          ABS-CBN makes no warranties or representations of any kind, whether
          express or implied, (a) with respect to the Website, the Service or
          the digital tickets sold on it, (b) with respect to the
          merchantability or fitness for purpose of the digital tickets sold in
          or through the Website, (c) with respect to the Event, (d) the Content
          shown on IWANTTFC TICKETS and/or (e) that the use of Website or the
          provision of Service through the Website will be uninterrupted,
          timely, secure, error free or that the outcome derived from the use of
          the Website will fully meet your requirements. ABS-CBN, or any of its
          Affiliates, directors, officers and employees shall, under no
          circumstances, be held liable for any loss or damage resulting from
          the use of the Website.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Further, in no event shall ABS-CBN or any of its Affiliates,
          directors, officers and employees be held liable for any damages
          whatsoever, including any direct, indirect, consequential or exemplary
          damages, and any damages due to loss of profits, goodwill or other
          intangible losses arising out of or in connection with the Event
          itself, or the use, inability to use the Website, or any other matter
          relating to IWANTTFC TICKETS or any of the digital tickets sold by or
          through IWANTTFCTICKETS. However, if for any reason, any part its
          limitation of liability is declared invalid or unconstitutional,
          ABS-CBN’s liability shall, under no circumstances, exceed the price
          paid for the digital ticket purchased for the Content.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">L. PERSONAL INFORMATION</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The availment of the Services, sale or purchase of digital tickets
          through the Website may require the provision of your name and email
          address, and the names of the ticket recipients for the purpose of
          identifying the ticket holders. By purchasing or obtaining tickets
          through IWANTTFC, you confirm your understanding of this requirement,
          and that you give your consent in the collection and processing of the
          said personal information. You likewise warrant that you have obtained
          the consent of the ticket recipients in the disclosure of their
          personal information as well as in the collection and/or processing of
          said personal information. For further information on ABS-CBN policies
          on the processing of your personal information, please click on
          this&nbsp;<Link className="underline" href="https://www.ktx.ph/terms/privacy">link</Link> to read
          our Privacy Notice.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">M. UNAUTHORIZED USE OF THE SITE</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Illegal, unauthorized or fraudulent use of IWANTTFC TICKETS shall be
          construed as a violation of these Terms. We may cancel or dishonor the
          ticket obtained through illegal, unauthorized or fraudulent use of the
          Website, and deny access to the person holding said ticket.&nbsp;
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Further, illegal, unauthorized or fraudulent use of IWANTTFC TICKETS
          includes, but is not limited to:
        </p>
        <ul className="list-disc pl-8 sm:pl-10 mb-5">
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Using IWANTTFC TICKETS or the digital tickets purchased or
              obtained for the Website to conduct illegal ticket sale or resale
              through any means, medium, or channel (“scalping”);
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Using any unauthorized automated processes such as robots,
              spiders, or crawlers on IWANTTFC TICKETS;
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Using any process that may alter or circumvent any maximum or
              minimum quantity of digital tickets purchasable per transaction
              and/or per user (“hoarding”);
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Creating several accounts to buy several digital tickets to
              circumvent the limits imposed;
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Using any passcode, promo code, discount code, or password to
              participate in any pre-sale, sale, or any other offer on IWANTTFC
              TICKETS if you are not the intended recipient of the codes or
              passwords used in purchasing digital tickets in IWANTTFC TICKETS;
              and
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Requesting for more than 5,000 pages of IWANTTFC TICKETS within
              any twenty-four hour period or take any action that may require an
              excessive or disproportionately large load on IWANTTFC TICKETS
              (“Abusive Use”); and
            </p>
          </li>
          <li>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Using IWANTTFC TICKETS for piracy, infringement, and for
              unauthorized commercial purposes
            </p>
          </li>
        </ul>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">N. BREACH OF THESE TERMS</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          It is a breach of these Terms to: (i) engage in an unauthorized use of
          the Website; (ii) act in any fraudulent manner or in any way which is
          likely to be detrimental to ABS-CBN or the Seller; (iii) make any
          misrepresentation to ABS-CBN such as supplying incorrect or misleading
          information; or (iv) act in any way, which in ABS-CBN’s reasonable
          opinion breaches or is likely to breach these Terms. ABS-CBN decision
          as to what constitutes a breach shall be final and conclusive.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          In case of breach of these Terms, whether intentional or otherwise,
          ABS-CBN may adopt such measures necessary to stop the breach which
          include but will not be limited to blacklisting you from all the
          Events for a period of three (3) months or banning you from using
          IWANTTFC TICKETS. This shall not preclude ABS-CBN from resorting to
          its rights and remedies under law and/or equity.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">O. INDEMNITY</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You agree to indemnify and hold ABS-CBN, its Affiliates, their
          directors, officers, agents, or other partners, and employees, free
          and harmless from and against and all claims, damages, liabilities,
          costs and expenses, including attorney’s fees, made by any third party
          due to or arising out of your use of the Service and/or the Website,
          your connection to the Service, your use of the facilities of the
          Service and/or the Website, your violation of the Terms, your
          violation of the rights of any person or entity, or your violation of
          any applicable laws.
        </p>

        <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">P. MISCELLANEOUS</h2>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The Laws of the Philippines shall govern these Terms and our
          relationship as service provider and user without regard to conflict
          of law provisions. The venue of any action between the parties to
          arising out of or in connection with these Terms and Conditions shall
          be solely and exclusively in the proper courts of Quezon City,
          Philippines.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You agree not to sell, resell, reproduce, duplicate, copy or use for
          any commercial purposes any portion of the Service, or use of or
          access to the Service.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          Our failure to exercise or enforce any right or provision of the Terms
          shall not constitute a waiver of such right or provision.&nbsp;
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          If any provision/s of the Terms is found by any court or
          administrative body of competent jurisdiction to be invalid or
          unenforceable, the invalidity or unenforceability of such provision/s
          shall not affect the other provisions of the Terms and Conditions. The
          parties nevertheless agree that the court should endeavor to give
          effect to the parties’ intentions as reflected in the provision/s. All
          the other provisions of the Terms not affected by such invalidity or
          unenforceability shall remain in full force and effect.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          You agree that regardless of any statute or law to the contrary, any
          claim or cause of action arising out of or related to use of the
          Service or the Terms must be filed within one (1) year after such
          claim or cause of action arose or be forever barred.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          The section titles in the Terms are for convenience and have no legal
          or contractual effect.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          For more information on the system requirements of IWANTTFC TICKETS,
          please visit the&nbsp;Help Center Page.
        </p>

        <p className="font-normal text-[15px] xl:text-base mb-[10px]">
          If you have any questions or comments, please go to the Help Center
          page
        </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;