import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

const getValue = (sourceVal: string) => {
  if (sourceVal && sourceVal !== '' && sourceVal !== null && sourceVal !== 'null' 
    && sourceVal !== undefined && sourceVal !== 'undefined') {
      return sourceVal
    }
    return 'NA';
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    let userId = getValue(req.query.userId as string);
    if (userId === 'NA') userId = '';

    if( !userId ){
      return res.status(200).json([]);
    }

    let url = `${process.env.NEXT_PUBLIC_PAYMENT_BILL_URI}/transactions/history/user/${userId}`;
    const payHistoryRes = await axios.get(url, {timeout: 30000});
    const payHistory = payHistoryRes?.data;
    if(payHistory?.message === 'success'){
      return res.status(200).json(payHistory?.data?.data);
    }
    return res.status(200).json(payHistory);
  } catch (error) {
    // console.log({ error })
    return res.status(500).end();
  }
}
