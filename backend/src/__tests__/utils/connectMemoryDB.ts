import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function connectDB() {
  const db = await MongoMemoryServer.create();
  const dbURI = db.getUri();
  await mongoose.connect(dbURI);
  return db;
}

export async function clearCollections(db: MongoMemoryServer | null) {
  if (!db) return;

  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (collection) => await collection.deleteMany());
}

export async function dropDB(db: MongoMemoryServer | null) {
  if (!db) return;

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await db.stop();
}
