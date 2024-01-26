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

    const product = getValue(req.query.product as string);
    const queryString = getValue(req.query.queryString as string);
    if(queryString === '' || queryString === 'NA' || queryString === 'undefined' || queryString === 'null') {
      return res.status(200).json('');
    }

    let url = `${process.env.API_URL}/search/content?${queryString}`;
    if (product !== 'NA') url = `${url}&product=${product}`;

    // console.log(region, product, userID, url)
    const moviesRes = await axios.get(url, {timeout: 10000});
    const movies = moviesRes.data;
    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
