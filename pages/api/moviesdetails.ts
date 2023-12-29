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
    
    let userID = getValue(req.query.userId as string);
    let movieID = getValue(req.query.movieId as string);
    
    let url = `${process.env.API_URL}/page/details?userId=${userID}&itemCode=${movieID}`;
    if( !userID ){
      return res.status(200).json([]);
    }
    const moviesRes = await axios.get(url);
    const movies = moviesRes.data;
    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
