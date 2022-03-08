import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from 'models/types';
import { omit } from 'lodash'
import db from 'lib/nedb'

export default async (req: NextApiRequest, res: NextApiResponse<IOrder[] | IOrder>) => {
  const { method, body } = req
  const Orders = await db('orders')
  
  switch (method) {
    case 'POST': {
      Orders.insert(omit(body, '_id'), function (err: any, newDoc: IOrder) {
        if (err) res.status(500).end(`opps!! db err: ${err.message}`)
        res.status(200).json(newDoc)
        return
      });
      break
    }
    case 'GET': {
      Orders.find({}).exec(function (err: any, docs: IOrder[]) {
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