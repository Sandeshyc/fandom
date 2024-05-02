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
    
    if(region === 'NA'){
      return res.status(204).end();
    }
    if(userId === 'NA'){
      return res.status(204).end();
    }
    let url = `${process.env.API_URL}/page/list?region=${region}`;
    if(userId){
      url = `${url}&userId=${userId}`;
    }
    if(product){
      url = `${url}&product=${product}`;
    }
    
    console.log('URL:', url)
    const moviesRes = await axios.get(url, { timeout: 10000 })
    const movies = moviesRes.data;

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
