import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from 'models/types';
import db from 'lib/nedb'

export default async (req: NextApiRequest, res: NextApiResponse<IOrder>) => {
  const { query: { id, name }, method, body } = req
  const Orders = await db('orders')

  const target: IOrder | null = await(new Promise((resolve, reject) => {
    Orders.findOne({ _id: id }).exec(function (err: any, doc: IOrder) {
      if (err) resolve(null)
      resolve(doc)
      return
    });
  }))

  if (target === null) {
    res.status(404).end(`Order with id=${id} Not Found`)
    return
  }
  
  switch (method) {
    case 'PUT': {
      Orders.update({ _id: id }, { ...target, ...body }, { returnUpdatedDocs: true }, function (err: any, numAffected: number, doc: IOrder) {
        if (err) res.status(500).end(`opps!! db err: ${err.message}`)
        else res.status(200).json(doc)
        return
      });
      break
    }
    case 'DELETE': {
      Orders.remove({ _id: id }, {}, function (err: any, numRemoved: number) {
        if (err) res.status(500).end(`opps!! db err: ${err.message}`)
        else res.status(200).json(target)
        return
      });
      break
    }
    case 'GET':
      res.status(200).json(target)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}