import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    
    await serverAuth(req, res);
    const region = req.query.region;
    console.log(region)
    const playlistRes = await axios.get(`${process.env.API_URL}/page/playlist`);
    console.log('playlistRes.data ', playlistRes.data);
    const playlists = playlistRes.data;

    return res.status(200).json(playlists);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
