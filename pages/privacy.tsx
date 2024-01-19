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
          <h1 className="text-[24px] md:text-[26px] xl:text-3xl 2xl:text-[42px] font-bold mb-5 md:mb-7 xl:mb-10">
            PRIVACY NOTICE
          </h1>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">INTRODUCTION </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Welcome to the ABS-CBN’s privacy notice.</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              ABS-CBN respects your privacy and is committed to protecting your
              personal data. This privacy notice will inform you as to how we look
              after your personal data when you visit our website or click on our
              app (regardless of where you visit it from) and tell you about your
              privacy rights and how the law protects you.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              This privacy notice is provided in a layered format so you can click
              through to the specific areas set out below. Please also use the
              Glossary to understand the meaning of some of the terms used in this
              privacy notice.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">1. IMPORTANT INFORMATION AND WHO WE ARE</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">2. THE DATA WE COLLECT ABOUT YOU</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">3. HOW IS YOUR PERSONAL DATA COLLECTED</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">4. HOW WE USE YOUR PERSONAL DATA</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">5. DISCLOSURES OF YOUR PERSONAL DATA</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">6. INTERNATIONAL TRANSFERS</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">7. DATA SECURITY</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">8.DATA RETENTION</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">9. YOUR LEGAL RIGHTS</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">10. GLOSSARY</p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">1. IMPORTANT INFORMATION AND WHO WE ARE </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Purpose of this Privacy Notice</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              This privacy notice aims to give you information on how ABS-CBN
              collects and processes your personal data when you download our app,
              when you visit or use this website/app, including any data you may
              provide when you fill up our forms, when you use, purchase or avail of
              our products or services or when you attend one of our events.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              This website is not intended for children and we do not knowingly
              collect data relating to children. If you are of an age that is below
              the threshold for giving valid consent in your country or territory,
              you must get the consent of your parents or guardian prior to
              registration or use of our website. It is important that you read this
              privacy notice together with any other privacy notice or fair
              processing notice we may provide on specific occasions when we are
              collecting or processing personal data about you so that you are fully
              aware of how and why we are using your data. This privacy notice
              supplements the other notices and is not intended to override them.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Controller&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              ABS-CBN is made up of different legal entities, details of which can
              be found in the Glossary portion under “Internal Third Parties”
              hereafter referred to as “ABS-CBN Group.” This privacy notice is
              issued on behalf of ABS-CBN Group so when we mention “Company”, “we”,
              “us” or “our” in this privacy notice, we are referring to the relevant
              company in ABS-CBN Group responsible for processing your data.&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We have appointed a data protection officer (DPO) who is responsible
              for overseeing questions in relation to this privacy notice, including
              requests for access to your personal data. If you are in the
              Philippines and you have any questions about this privacy notice, such
              as access to your data, please contact the DPO by email
              at&nbsp;dpo@abs-cbn.com, or if you are in a country other than the
              Philippines, please email us at&nbsp;dpo_global@abs-cbn.com, or by
              post at the address of the appropriate data controller which are
              provided in this Privacy Notice. You can also find out more and
              contact us about the exercise of your privacy rights by email
              at&nbsp;dpo_global@abs-cbn.com.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              If you are in Australia and would like to make a complaint about an
              alleged breach of the Privacy Act, we ask that you send us your
              complaint in writing to the following email
              address&nbsp;dpo_global@abs-cbn.com. We endeavour to respond to
              complaints within a reasonable period (usually 30 days). If you are
              not satisfied with our response, you may make a complaint to the
              Office of the Australian Information Commissioner by phoning 1300 363
              992 or by email at&nbsp;enquiries@oaic.gov.au
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              You have the right to make a complaint at the appropriate data
              protection supervisory authority in your location. We would, however,
              appreciate the chance to deal with your concerns before you approach
              the regulatory body so please contact us in the first instance.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Changes to the Privacy Notice and Your Duty to Inform us of
              Change&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              This version was last updated on September 1, 2020 and historic
              versions can be obtained by contacting our customer service.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              It is important that the personal data we hold about you is accurate
              and current. Please keep us informed if your personal data changes
              during your relationship with us.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Third-Party Links</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              This website may include links to third-party websites, plug-ins and
              applications. Clicking on those links or enabling those connections
              may allow third parties to collect or share data about you. We do not
              control these third-party websites and are not responsible for their
              privacy statements. When you leave our website, we encourage you to
              read the privacy notice of every website you visit.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">2. THE DATA WE COLLECT ABOUT YOU </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Personal data, or personal information, means any information about an
              individual from which that person can be identified. It does not
              include data where the identity has been removed (anonymous data).
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We may collect, use, store and transfer different kinds of personal
              data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Identity Data&nbsp;includes first name, middle name, last name,
                  username or similar identifier, marital status, title, date of
                  birth and gender.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Contact Data&nbsp;includes billing address, delivery address,
                  email address and telephone numbers.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Financial Data&nbsp;includes bank account and payment card
                  details.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Transaction Data&nbsp;includes details about payments to and from
                  you and other details of products and services you have purchased
                  from us.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Technical Data&nbsp;includes internet protocol (IP) address, your
                  login data, browser type and version, time zone setting and
                  location, browser plug-in types and versions, operating system and
                  platform and other technology on the devices you use to access
                  this website.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Profile Data&nbsp;includes your username and password, purchases
                  or orders made by you, your interests, preferences, feedback and
                  survey responses.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Usage Data&nbsp;includes information about how you use our
                  website, products and services.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Marketing and Communications Data&nbsp;includes your preferences
                  in receiving marketing from us and our third parties and your
                  communication preferences.
                </p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We also collect, use and share&nbsp;Aggregated Data&nbsp;such as
              statistical or demographic data for any purpose. Aggregated Data may
              be derived from your personal data but is not considered personal data
              in law as this data does&nbsp;not&nbsp;directly or indirectly reveal
              your identity. For example, we may aggregate your Usage Data to
              calculate the percentage of users accessing a specific website
              feature. However, if we combine or connect Aggregated Data with your
              personal data so that it can directly or indirectly identify you, we
              treat the combined data as personal data which will be used in
              accordance with this privacy notice.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We do not collect any Special Categories of Personal Data about you
              (this includes details about your race or ethnicity, religious or
              philosophical beliefs, sex life, sexual orientation, political
              opinions, trade union membership, information about your health and
              genetic and biometric data), unless with your explicit consent. Nor do
              we collect any information about criminal convictions and offences.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">If You Fail to Provide Personal Data</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              There are limited circumstances where an individual can deal with us
              anonymously or by pseudonym. Where we need to collect personal data by
              law, or under the terms of a contract we have with you and you fail to
              provide that data when requested, we may not be able to perform the
              contract we have or are trying to enter into with you (for example, to
              provide you with goods or services). In this case, we may have to
              cancel a product or service you have with us but we will notify you if
              this is the case at the time.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">3. HOW IS YOUR PERSONAL DATA COLLECTED? </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We use different methods to collect data from and about you including
              through:
            </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Direct interactions. You may give us your Identity, Contact and
                  Financial Data by filling in forms or by corresponding with us
                  personally or by post, phone, email, chat or otherwise. This
                  includes personal data you provide when you:
                </p>
                <ul className="pl-8 sm:pl-10 mb-5" style={{listStyle: 'circle'}}>
                  <li>
                    <p className="font-normal text-[15px] xl:text-base mb-[10px]">apply for our products or services;</p>
                  </li>
                  <li>
                    <p className="font-normal text-[15px] xl:text-base mb-[10px]">create an account on our website;</p>
                  </li>
                  <li>
                    <p className="font-normal text-[15px] xl:text-base mb-[10px]">subscribe to our service or publications;</p>
                  </li>
                  <li>
                    <p className="font-normal text-[15px] xl:text-base mb-[10px]">request marketing to be sent to you;</p>
                  </li>
                  <li>
                    <p className="font-normal text-[15px] xl:text-base mb-[10px]">enter a competition, promotion or survey; or</p>
                  </li>
                  <li>
                    <p className="font-normal text-[15px] xl:text-base mb-[10px]">give us some feedback.</p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Automated technologies or interactions. As you download our app,
                  or visit, use or interact with our website, we may automatically
                  collect Technical Data about your equipment, browsing actions and
                  patterns. We collect this personal data by using cookies, server
                  logs and other similar technologies. Please see the Cookie Policy
                  of our website.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Third parties or publicly available sources. We may receive
                  personal data about you from various third parties and public
                  sources as set out below:
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Technical Data from the following parties:</p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]"> </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">&nbsp;(a) analytics providers;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) advertising networks; and</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) search information providers.</p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Contact, Financial and Transaction Data from providers of
                  technical, payment and delivery services.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Identity and Contact Data from data brokers or aggregators based
                  internationally.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Identity and Contact Data from publicly availably sources based
                  internationally.
                </p>
              </li>
            </ul>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">4. HOW WE USE YOUR PERSONAL DATA </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We will only use your personal data when the law allows us to. Most
              commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  For the purpose for which it was collected and for related
                  purposes which we consider fall within your reasonable
                  expectations, for example where we need to perform the contract we
                  are about to enter into or have entered into with you.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Where it is necessary for our legitimate interests (or those of a
                  third party) and your interests and fundamental rights do not
                  override those interests.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Where we need to comply with a legal or regulatory obligation.
                </p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Click&nbsp;here&nbsp;to find out more about the types of lawful basis
              that we will rely on to process, use and disclose your personal data.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Generally, we are not required to rely on consent as a legal basis for
              processing, using and disclosing your personal data. However, we do
              seek your consent in relation to sending third party direct marketing
              communications to you via different means including email, phone call,
              website notification or text message. You have the right to withdraw
              consent to marketing communications at any time by contacting our
              customer service.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Purposes For Which We Will Use and Disclose Your Personal Data&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We have set out below, in a table format, a description of some or all
              the ways we plan to use and disclose your personal data, and which of
              the legal bases we rely on to do so. We have also identified what our
              legitimate interests are where appropriate. You expressly authorize
              us, our affiliates and our authorized service providers to use your
              personal information for the uses we provided in the table below. We
              may contact you and communicate with you on how plan to use or
              disclose your personal data.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Note that we may process your personal data for more than one lawful
              ground depending on the specific purpose for which we are using and
              disclosing your data. Please contact our customer service if you need
              details about the specific legal ground we are relying on to process
              your personal data where more than one ground has been set out in the
              table below.
            </p>
            <div className="overflow-x-auto mb-5">
              <table className="min-w-full text-white border border-gray-400">
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">Purpose/Activity</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">Type of data</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        Examples of lawful basis for processing, using and
                        disclosing including basis of legitimate interest
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">To register you as a new customer</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Financial</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">Performance of a contract with you</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To provide you with the service, including fulfillment or
                        renewal thereof, and/or maintenance or administration
                        related thereto;
                      </p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        to fulfill your requests for the services, and our
                        affiliates’ products and services;
                      </p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">to process and deliver your order including:</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Manage payments, fees and charges</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Collect and recover money owed to us</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Financial</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Transaction</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Performance of a contract with you</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        (b) Necessary for our legitimate interests (e.g. to recover
                        debts due to us)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">To manage our relationship with you which will include:</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        (a) Notifying you about changes to our terms or privacy
                        policy
                      </p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Asking you to leave a review or take a survey</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Marketing and Communications</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Performance of a contract with you</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Necessary to comply with a legal obligation</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        (c) Necessary for our legitimate interests (e.g. to keep our
                        records updated and to study how customers use our
                        products/services)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To enable you to partake in a prize draw, competition or
                        complete a survey
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Performance of a contract with you</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        (b) Necessary for our legitimate interests (e.g. including
                        to study how customers use our products/services, to develop
                        them and grow our business)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To administer and protect our business and this website/app
                        (including troubleshooting, data analysis, testing, system
                        maintenance, support, reporting and hosting of data)
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Technical</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        (a) Necessary for our legitimate interests (e.g. for running
                        our business, provision of administration and IT services,
                        network security, to prevent fraud and in the context of a
                        business reorganisation or group restructuring exercise)
                      </p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Necessary to comply with a legal obligation</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To customize our and our affiliates’ advertising,
                        promotional and marketing activities; to inform our
                        advertisers or sponsors or their respective representatives
                        how many have responded to an advertisement or
                        promotion;&nbsp;
                      </p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        to deliver relevant website content and advertisements to
                        you and measure or understand the effectiveness of the
                        advertising we serve to you; To use as a basis for us to
                        display targeted advertisements in the service, the website
                        and/or the application/s;
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(f) Technical</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        Necessary for our legitimate interests (e.g. to study how
                        customers use our products/services, to develop them, to
                        grow our business and to inform our marketing strategy)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To conduct research, survey and perform statistical analyses
                        of user behavior in order to measure relative consumer
                        interest on our and our affiliate’s services, products, and
                        activities; to use data analytics to improve our website,
                        products/services, marketing, customer relationships and
                        experiences
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Technical</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Usage</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        Necessary for our legitimate interests (e.g. to define types
                        of customers for our products and services, to keep our
                        website updated and relevant, to develop our business and to
                        inform our marketing strategy)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To market, promote and advertise our and our affiliate’s
                        service, website/s, application/s, and/or products,
                        services, events, initiatives and activities; to make
                        suggestions and recommendations to you about goods or
                        services that may be of interest to you
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Technical</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Profile</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        Necessary for our legitimate interests (e.g. to develop our
                        products/services and grow our business)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To promote and manage our and our affiliates’ customer
                        loyalty program/s, or any loyalty program that we may
                        participate in; to promote and manage our customer loyalty
                        programs
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(f) Technical</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">Necessary for our legitimate interests</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        (e.g. to develop our products/services and grow our
                        business)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To pass on information to the relevant government agency or
                        institution for fraud information
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(f) Technical</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(g) others</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">Necessary for us to comply with our legal obligation.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To investigate, prevent or take action regarding illegal
                        activities, suspected fraud, situations involving potential
                        threats to the physical safety of any person, violation of
                        the terms of our service, or as otherwise required by law
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(f) Technical</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(g) others</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        Necessary for our legitimate interests (e.g. to protect our
                        business) and for us to comply with our legal obligation.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To transfer information if our service is acquired by
                        another company
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(f) Technical</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(g) others</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        Necessary for our legitimate business interests and the
                        performance of the contract with you.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                        To respond to subpoenas, court orders or legal processes, or
                        to establish or exercise our rights or defend legal claims
                        against us&nbsp;
                      </p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">As may be requested, which may include:</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(a) Identity</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(b) Contact</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(c) Profile</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(d) Usage</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(e) Marketing and Communications</p>
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">(f) Technical</p>
                    </td>
                    <td className="border border-gray-400 p-3">
                      <p className="font-normal text-[15px] xl:text-base mb-[10px]">Necessary for us to comply with legal obligation.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Marketing </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We strive to provide you with choices regarding certain personal data
              uses, particularly around marketing and advertising. When you register
              with us we will ask if you would like to receive marketing
              communications, and you can change your marketing choices online, over
              the phone or in writing at any time.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Promotional Offers From Us </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We may use your Identity, Contact, Technical, Usage and Profile Data
              to form a view on what we think you may want or need, or what may be
              of interest to you. This is how we decide which products, services and
              offers may be relevant for you (we call this marketing).
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              You will receive marketing communications from us if you have
              requested information from us or have provided your consent to receive
              marketing emails from us and purchased goods or services from us or if
              you provided us with your details when you entered a competition or
              registered for a promotion and, in each case, you have not opted out
              of receiving marketing emails.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Third-Party Marketing </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We will get your express opt-in consent before we share your personal
              data with any company outside ABS-CBN group of companies for marketing
              purposes.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Opting Out </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              You can ask us or third parties to stop sending you marketing messages
              at any time by clicking the unsubscribe link found in each of the
              marketing emails you receive from us or by contacting our customer
              service.&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Where you opt out of receiving these marketing messages, you are not
              prohibiting us from using your personal data for other purposes,
              including personal data provided to us as a result of a
              product/service purchase, warranty registration, product/service
              experience or other transactions.&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Cookies </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              If you disable or refuse cookies, please note that some parts of this
              website/apps may become inaccessible or not function properly. For
              more information about the cookies we use, please see our&nbsp;Cookie
              Policy.&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Change Of Purpose </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Unless otherwise required or permitted by law, we will only use your
              personal data for the purposes for which we collected it, unless we
              reasonably consider that we need to use it for another reason and that
              reason is compatible with the original purpose. If you wish to get an
              explanation as to how the processing for the new purpose is compatible
              with the original purpose, please contact our customer service. If we
              need to use your personal data for an unrelated purpose, we will
              notify you and we will explain the legal basis which allows us to do
              so.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Please note that we may process your personal data without your
              knowledge or consent, in compliance with the above rules, where this
              is required or permitted by law.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">5. DISCLOSURES OF YOUR PERSONAL DATA </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We may have to share your personal data with the parties set out below
              for the purposes set out in the table in paragraph 4 above.
            </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Internal Third Parties within the ABS-CBN Group as set out in the
                  Glossary.
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">External Third Parties as set out in the Glossary.</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Specific third parties as set out in the Glossary.&nbsp;</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Third parties to whom we may choose to sell, transfer, or merge
                  parts of our business or our assets. Alternatively, we may seek to
                  acquire other businesses or merge with them. If a change happens
                  to our business, then the new owners may use your personal data in
                  the same way as set out in this privacy notice.
                </p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We require all third parties to respect the security of your personal
              data and to treat it in accordance with the law. We do not allow our
              third-party service providers to use your personal data for their own
              purposes and only permit them to process your personal data for
              specified purposes and in accordance with our instructions.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">6. INTERNATIONAL TRANSFERS </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We share your personal data within the ABS-CBN Group to internal third
              parties located in the countries specified in the definition of
              “Internal third parties” in the Glossary. This will involve
              transferring your data outside your current location.&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Many of our external third parties are based internationally so their
              processing of your personal data will involve a transfer of data
              outside your location. These parties may be located overseas, but it
              is not practical to list the countries in which they are located.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Whenever we transfer your personal data internationally, we ensure a
              similar degree of protection is afforded to it by ensuring at least
              one of the following safeguards is implemented:&nbsp;
            </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  We will only transfer your personal data to countries that have
                  been deemed to provide an adequate level of protection for
                  personal data by the appropriate government agency.&nbsp;
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Where we use certain service providers, we may use specific
                  contracts approved by the appropriate government agency which give
                  personal data the same protection it has under the law applicable
                  to you.&nbsp;
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Where we use providers based in the US, we may transfer data to
                  them if they are part of the Privacy Shield which requires them to
                  provide similar protection to personal data shared between the
                  Europe and the US.&nbsp;
                </p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Please contact our DPO or customer service if you want further
              information on the specific mechanism used by us when transferring
              your personal data internationally.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              For those in Australia, by agreeing to this privacy notice you consent
              to this offshore disclosure, and you understand that we may not be
              able to, and are not required to take steps to, monitor, control ,
              prevent or determine whether the entities mentioned, as located in
              various countries, are able to handle your personal information in
              accordance with the Australian Privacy Principles in the Privacy Act
              1988 (Cth) (Privacy Act) and that you will not be able to seek any
              redress under the Privacy Act for any mishandling of your personal
              information by said entities located outside of Australia.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">7. DATA SECURITY </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We have put in place appropriate administrative, organisational and
              technical security measures to prevent your personal data from being
              accidentally lost, used, modified or accessed in an unauthorised way,
              altered or disclosed. This includes the use of technologies and
              processes such as network firewalls, encryption and physical security
              to protect the privacy of your personal information. In addition, we
              limit access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to know.
              They are only permitted to process your personal data on our
              instruction and they are subject to a duty of confidentiality.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We have put in place procedures to deal with any suspected personal
              data breach and will notify you and any applicable regulator of a
              breach where we are legally required to do so.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">8. DATA RETENTION </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">How Long Will You Use My Personal Data For? </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We will only retain your personal data for as long as necessary to
              fulfil the purposes we collected it for, including for the purposes of
              satisfying any legal, accounting, regulatory or reporting
              requirements.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              To determine the appropriate retention period for personal data, we
              consider the amount, nature, and sensitivity of the personal data, the
              potential risk of harm from unauthorised use or disclosure of your
              personal data, the purposes for which we process your personal data
              and whether we can achieve those purposes through other means, and the
              applicable legal requirements.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              In some circumstances, you can ask us to delete your data. Please
              see&nbsp;Request Erasure.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              In some circumstances, we may anonymise your personal data (so that it
              can no longer be associated with you) for research or statistical
              purposes in which case we may use this information indefinitely
              without further notice to you.
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">9. YOUR LEGAL RIGHTS </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data. Please click on the links
              below to know more about the following rights:
            </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Request access to your personal data</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Request correction of your personal data</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Request erasure of your personal data</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Object to processing of your personal data</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Request restriction of processing your personal data</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Request transfer of your personal data</p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">Right to withdraw consent.</p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              If you wish to exercise any of the rights set out above, please
              contact our customer service.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">No Fee Usually Required </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              You will not have to pay a fee to access your personal data (or to
              exercise any of the other rights). However, we may charge a reasonable
              fee if your request is clearly unfounded, repetitive or excessive.
              Alternatively, we may refuse to comply with your request in these
              circumstances where we are permitted to do so by law.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">What We May Need From You </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We may need to request specific information from you to help us
              confirm your identity and ensure your right to access your personal
              data (or to exercise any of your other rights). This is a security
              measure to ensure that personal data is not disclosed to any person
              who has no right to receive it. We may also contact you to ask you for
              further information in relation to your request to speed up our
              response.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Time Limit To Respond </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              We try to respond to all legitimate requests within one month.
              Occasionally it may take us longer than a month if your request is
              particularly complex or you have made a number of requests. In this
              case, we will notify you and keep you updated.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              If you are a resident of countries that provide other particular
              rights that are not included in the above list, you can find out more
              and contact us about how to exercise them by emailing us at [customer
              service email, as above].
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              If you are a resident of California (USA) and you wish to know more
              and exercise your rights under the California Consumer Protection Act
              (CCPA), please go to “Do Not Sell My Personal Information” page.&nbsp;
            </p>
            <h2 className="text-[20px] md:text-2xl 2xl:text-3xl font-bold mb-3 xl:mb-4 mt-10 md:mt-12 xl:mt-16">10. GLOSSARY </h2>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Lawful Basis </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Legitimate Interest&nbsp;means the interest of our business in
              conducting and managing our business to enable us to provide you the
              service and/or product. We make sure we consider and balance any
              potential impact on you (both positive and negative) and your rights
              before we process your personal data for our legitimate interests. We
              do not use your personal data for activities where our interests are
              overridden by the impact on you (unless we have your consent or are
              otherwise required or permitted to by law). You can obtain further
              information about how we assess our legitimate interests against any
              potential impact on you in respect of specific activities by
              contacting our customer service.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Performance of Contract&nbsp;means processing your data where it is
              necessary for the performance of a contract to which you are a party
              or to take steps at your request before entering into such a contract.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Comply with a legal or regulatory obligation&nbsp;means processing
              your personal data where it is necessary for compliance with a legal
              or regulatory obligation that we are subject to, such as the Data
              Privacy Act of the Philippines, as may be applicable.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Third Parties </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Internal third parties </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              The companies in the ABS-CBN Group acting as controllers and/or
              processors and that are based in the following countries:&nbsp;
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Europe Ltd.&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">1st Floor, Office 344, 239 Kensington High Street&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">London, Greater London W8 6SN,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">United Kingdom</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Spain S.L.U.</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Paseo de la Castellana 200</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">28046 Madrid&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Spain</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Foundation Europe CIO:</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">1st Floor, Office 344, 239 Kensington High Street&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">London, Greater London W8 6SN,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">United Kingdom</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Middle East FZ-LLC&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Office 211-216 Building No. 7, P.O. Box 502087&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Dubai Media City, Dubai, United Arab Emirates</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN International&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">432 N Canal St., Unit 21&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">South San Francisco CA&nbsp;94080</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Foundation International&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">432 N Canal St., Unit 21&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">South San Francisco CA&nbsp;94080</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Canada ULC&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">300 Consilium Place, Suite 105,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Scarborough, Ontario M1H 3G2,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Ontario, Canada</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Australia Pty. Ltd.&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Level 5, Nexus Norwest, 4 Columbia Court&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Norwest, NSW 2153AU</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Japan Inc.&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Level 8, Tri-Seven, Roppongi, 7-7-7 Roppongi, Minato-ku</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Tokyo, Japan, 106-0032&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Global Ltd. (Philippine Branch)&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">9th&nbsp;Floor, ELJ Communications Center,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Eugenio Lopez Drive, 1103 Quezon City,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Philippines</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">ABS-CBN Corporation&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Sgt. Esguerra Avenue corner&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Mother Ignacia St.,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Quezon City, Philippines</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">iConnect Convergence, Inc.</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">26th&nbsp;Floor, IBM Plaza, Eastwood City,&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Bagumbayan, Metro Manila&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">External third parties </p>
            <ul className="list-disc pl-8 sm:pl-10 mb-5">
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Service providers acting as processors based in and outside of
                  your location who provide IT, data hosting, marketing, research,
                  payment, customer services and system administration services;
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Professional advisers acting as processors or joint controllers
                  including lawyers, bankers, auditors and insurers based in and
                  outside of your location who provide consultancy, banking, legal,
                  insurance and accounting services;
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Tax and customs agencies, regulators and other authorities acting
                  as processors or joint controllers who require reporting of
                  processing activities in certain circumstances;
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Entities that are business partners such as broadcasting
                  distribution undertakings, licensees or distributors of our
                  services, products and/or content, or businesses/entities that
                  work with us in connection with special events;
                </p>
              </li>
              <li>
                <p className="font-normal text-[15px] xl:text-base mb-[10px]">
                  Authorized resellers who facilitate payment and collect payments
                  on our behalf. Your personal data will also be subject to the
                  privacy policy of such authorized resellers, which you should also
                  review.
                </p>
              </li>
            </ul>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Your Legal Rights </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">You have the right to:</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              Request access&nbsp;to your personal data (commonly known as a “data
              subject access request”). This enables you to receive a copy of the
              personal data we hold about you and to check that we are lawfully
              processing it.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">          
              Request correction&nbsp;of the personal data that we hold about you.
              This enables you to have any incomplete or inaccurate data we hold
              about you corrected, though we may need to verify the accuracy of the
              new data you provide to us.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              
              Request erasure&nbsp;of your personal data. This enables you to ask us
              to delete or remove personal data where there is no good reason for us
              continuing to process it. You also have the right to ask us to delete
              or remove your personal data where you have successfully exercised
              your right to object to processing (see below), where we may have
              processed your information unlawfully or where we are required to
              erase your personal data to comply with local law. Note, however, that
              we may not always be able to comply with your request of erasure for
              specific legal reasons which will be notified to you, if applicable,
              at the time of your request.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              
              Object to processing&nbsp;of your personal data where we are relying
              on a legitimate interest (or those of a third party) and there is
              something about your particular situation which makes you want to
              object to processing on this ground as you feel it impacts on your
              fundamental rights and freedoms. You also have the right to object
              where we are processing your personal data for direct marketing
              purposes. In some cases, we may demonstrate that we have compelling
              legitimate grounds to process your information which override your
              rights and freedoms.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              
              Request restriction of processing&nbsp;of your personal data. This
              enables you to ask us to suspend the processing of your personal data
              in the following scenarios: (a) if you want us to establish the data’s
              accuracy; (b) where our use of the data is unlawful but you do not
              want us to erase it; (c) where you need us to hold the data even if we
              no longer require it as you need it to establish, exercise or defend
              legal claims; or (d) you have objected to our use of your data but we
              need to verify whether we have overriding legitimate grounds to use
              it.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              
              Request the transfer&nbsp;of your personal data to you or to a third
              party. We will provide to you, or a third party you have chosen, your
              personal data in a structured, commonly used, machine-readable format.
              Note that this right only applies to automated information which you
              initially provided consent for us to use or where we used the
              information to perform a contract with you.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              
              Withdraw consent at any time&nbsp;where we are relying on and need
              your consent to process your personal data. However, this will not
              affect the lawfulness of any processing carried out before you
              withdraw your consent. If you withdraw your consent, we may not be
              able to provide certain products or services to you. We will advise
              you if this is the case at the time you withdraw your consent.
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">Your California Privacy Rights&nbsp;</p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              ABS-CBN does not “sell”, as defined under CCPA, and has not sold, your
              personal data to Third Parties. California Civil Code Section 1798.83
              permits customers of Company who are California residents to request
              certain information regarding its disclosure of their personal
              information to third parties for their direct marketing purposes. To
              make such a request, please send an e-mail
              to&nbsp;privacy_tfc@abs-cbn.com, or all us at 1 877 884 6832
            </p>
            <p className="font-normal text-[15px] xl:text-base mb-[10px]">
              If you are a resident of California (USA), please go to “Do Not Sell
              My Personal Information” page.&nbsp;
            </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;