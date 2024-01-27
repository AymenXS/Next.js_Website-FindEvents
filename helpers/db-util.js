import { MongoClient } from 'mongodb';

export const connectDB = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  console.log(process.env.MONGODB_URI);
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (client, collection, sort = { _id: -1 }, filter = {}) => {
  const db = client.db();
  const documents = await db.collection(collection).find(filter).sort(sort).toArray();

  return documents;
};
