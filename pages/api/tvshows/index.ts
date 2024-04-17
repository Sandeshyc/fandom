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
    let product = getValue(req.query.product as string);
    let sectionName = getValue(req.query.sectionName as string);
    let userID = getValue(req.query.userId as string);
    let region = getValue(req.query.region as string);
    
    if (sectionName === 'NA') sectionName = 'home';
    if (userID === 'NA') userID = '';
    if (region === 'NA') region = 'PH';
    if (product === 'NA') product = 'web';

    let url = `${process.env.API_URL}/page/${sectionName}?product=${product}`;
    if(userID){
      url = `${url}&userId=${userID}`;
    }
    
    // console.log('TV ', region, product, sectionName, url)
    // if( !userID ){
    //   return res.status(200).json([]);
    // }
    // console.log(url)
    const moviesRes = await axios.get(url, {timeout: 30000});
    // const moviesRes = await axios.get(url);
    const movies = moviesRes.data;
    return res.status(200).json(movies);
  } catch (error) {
    // console.log({ error })
    return res.status(500).end();
  }
}
