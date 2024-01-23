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

    const region = getValue(req.query.region as string);
    const product = getValue(req.query.product as string);
    let userId = getValue(req.query.userId as string);
    // console.log(region, product, userID)
    
    if (userId === 'NA') userId = '0';
    let url = `${process.env.API_URL}/page/list?userId=${userId}`;
    // let url = `${process.env.API_URL}/user/151937500/watchlist/?`;
    if (region !== 'NA') url = `${url}&region=${region}`;
    if (product !== 'NA') url = `${url}&product=${product}`;
    
    // console.log(region, product, userID, url)
    const moviesRes = await axios.get(url, { timeout: 5000 })
    const movies = moviesRes.data;

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
