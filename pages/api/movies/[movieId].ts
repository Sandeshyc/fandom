import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // await serverAuth(req, res);

    // const moviesRes = await axios.get(`${process.env.API_URL}/content/item/${req.query.movieId}/?userId=${req.query.userID}`);
    const moviesRes = await axios.get(`${process.env.API_URL}/content/item/${req.query.movieId}/?userId=151937500`);
    const movies = moviesRes.data;

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
