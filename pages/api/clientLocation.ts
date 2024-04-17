import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

type Data = {
  ip: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    let ip = req.headers['x-real-ip'] as string;
  
    const forwardedFor = req.headers['x-forwarded-for'] as string
    if(!ip && forwardedFor){
      ip = forwardedFor?.split(",").at(0) ?? '';
    }

    if(!ip){
      ip = req.socket.remoteAddress ?? "Unknown"
    }

    console.log('client Location :: ip = ', ip);
    console.log('client Location :: req.headers = ', req.headers);
   
    // await serverAuth(req, res);
    // const region = req.query.region;
    // console.log(region)

    let ipaddress = ip;
    if(ip === "Unknown" || ip === "::1" || ip === " ::ffff:" || ip.length < 7){
      ipaddress = 'get';
    }
    
    const response = await axios.get(`https://geoip.kapamilya.com/api/location/${ipaddress}?api-version=1.0`);

    console.log('client Location :: locationAPI = ',response.data.data);

    return res.status(200).json(response.data?.data || {});
  } catch (error) {
    console.log('error in clientLocation: ', { error })
    return res.status(500).end();
  }
}
