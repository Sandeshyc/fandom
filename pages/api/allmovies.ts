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
    let itemcode = getValue(req.query.itemcode as string);
    if (itemcode === 'NA') itemcode = '';
    let userId = getValue(req.query.userId as string);
    if (userId === 'NA') userId = '';

    let url = `${process.env.API_URL}/page/exploreAll?itemCode=${itemcode}`;
    if (userId !== '') {
      url += `&userId=${userId}`;
    }
    const moviesRes = await axios.get(url, {timeout: 10000});
    const movies = moviesRes.data;
    return res.status(200).json(movies);
  } catch (error) {
    // console.log({ error })
    return res.status(500).end();
  }
}
