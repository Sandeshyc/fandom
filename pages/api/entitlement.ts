import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

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
    let voucher = getValue(req.query.voucher as string);
    
    if(userId === 'NA'){
      return res.status(204).end();
    }
    let url = `${process.env.NEXT_PUBLIC_DATA_API}/entitlement/user/${userId}`;
    if(voucher !== 'NA'){
      url = `${process.env.NEXT_PUBLIC_DATA_API}/entitlement/user/${userId}?voucher=true`;
    }
    // console.log('URL:', url);
    const entitlementRes = await axios.get(url, { timeout: 10000 })
    const entitlements = entitlementRes.data || {};
    return res.status(200).json(entitlements);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
