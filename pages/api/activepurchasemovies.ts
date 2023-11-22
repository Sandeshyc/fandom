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
    let userID = getValue(req.query.userID as string);
    let activeonly = getValue(req.query.activeonly as string);
    // console.log(region, product, userID)
    
    if (userID === 'NA') userID = '0';
    let url = `${process.env.API_URL}/content/user/${userID}/?activeonly=${activeonly}`;
    // let url = `${process.env.API_URL}/content/user/151937500/?`;
    if (region !== 'NA') url = `${url}&region=${region}`;
    if (product !== 'NA') url = `${url}&product=${product}`;
    
    // console.log(region, product, userID, url)
    const moviesRes = await axios.get(url);
    const movies = moviesRes.data;
    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}