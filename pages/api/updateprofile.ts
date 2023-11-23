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
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    let userid = getValue(req?.query?.userid as string);
    let firstname = getValue(req?.query?.firstname as string);
    let lastname = getValue(req?.query?.lastname as string);
    let email = getValue(req?.query?.email as string);
    let phone = getValue(req?.query?.phone as string);
    let gender = getValue(req?.query?.gender as string);
    let birthdate = getValue(req?.query?.birthdate as string);
    
    let url = `${process.env.API_URL}/user/profile/`;
    const data = {
      "userId": userid,
      "email": email,
      "firstName": firstname,
      "lastName": lastname,
      "gender": gender,
      "phone": phone,
      "birthday": birthdate,
    }
    console.log('dataddd', data);
    try {
      await axios.post(
        `${url}`,
          JSON.stringify(data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );
      
      return res.status(200).json({message: 'success'});
    } catch (e) {
      console.log(e)
      return res.status(500).end();
    }
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
