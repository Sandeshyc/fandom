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
    let userid = getValue(req?.query?.userid as string);
    
    
    let url = `${process.env.API_URL}/user/${userid}/profile/`;
    
    // console.log('Home', region, product, sectionName, url)
    if( userid === 'NA' ){
      return res.status(200).json({});
    }
    const profileRes = await axios.get(url);
    const profile = profileRes?.data;
    return res.status(200).json(profile);
  } catch (error) {
    // console.log({ error })
    return res.status(500).end();
  }
}
