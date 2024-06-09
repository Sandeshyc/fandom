import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

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
    let token = getValue(req?.query?.token as string);
    
    if(token === 'NA') {
        return res.status(400).end();
    }
    let url = `https://www.google.com/recaptcha/api/siteverify`;
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    };
    const response = await axios.post(url, headers, {
        params: {
            secret: process.env.NEXT_PUBLIC_RECAPTHA_SECRET_KEY,
            response: token,
        },
    });
    return res.status(200).json(response);
  } catch (error) {
    // console.log({ error })
    return res.status(500).end();
  }
}
