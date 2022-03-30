import { MongoClient } from "mongodb";

const { DB_PW } = process.env;

const URI = `mongodb+srv://ivsp:${DB_PW}@hellocluster.olzv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(URI);
const DATABASE_NAME = "crossfitweb";
const COLLECTION_NAME = "events";
