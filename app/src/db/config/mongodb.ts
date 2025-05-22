import { MongoClient, Db } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client: MongoClient = new MongoClient(uri as string);

let db: Db;

function connect() {
  db = client.db("DatabaseGC02");
  return db;
}

export function getDB() {
  if (!db) return connect();

  return db;
}
