import DB from 'nedb'
import path from 'path'

const collections = new Map()

export default async (collectionName: string) => {
  if (!collections.has(collectionName)) {
    const coll = new DB({ autoload: true, filename: path.join(process.cwd(), `/lib/nedb/${collectionName}.db`) })
    coll.loadDatabase()
    collections.set(collectionName, coll)
  }
  return collections.get(collectionName)
}