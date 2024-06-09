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
    
    // await serverAuth(req, res);

    let region = getValue(req.query.region as string);
    let contentId = getValue(req.query.contentId as string);
    
    if(region === 'NA'){
      return res.status(204).end();
    }else{
      region = region.replace(/[^a-zA-Z0-9]/g, '');
    }
    if(contentId !== 'NA'){
      contentId = contentId.replace(/[^a-zA-Z0-9]/g, '');
    }
    let url = `${process.env.NEXT_PUBLIC_DATA_API}/priceplan/info?countryCode=${region}&contentId=${contentId}`;
    const plansRes = await axios.get(url, { timeout: 10000 })
    const plans = plansRes.data;
    // console.log('plans', plans);
    return res.status(200).json(plans);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
