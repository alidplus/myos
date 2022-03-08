import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from 'models/types';
import { omit } from 'lodash'
import db from 'lib/nedb'

export default async (req: NextApiRequest, res: NextApiResponse<IProduct[] | IProduct>) => {
  const { method, body } = req
  const Products = await db('products')
  
  switch (method) {
    case 'POST': {
      Products.insert(omit(body, '_id'), function (err: any, newDoc: IProduct) {
        if (err) res.status(500).end(`opps!! db err: ${err.message}`)
        res.status(200).json(newDoc)
        return
      });
      break
    }
    case 'GET': {
      Products.find({}).exec(function (err: any, docs: IProduct[]) {
        if (err) throw new Error(err)
        res.status(200).json(docs);
        return
      });
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
};