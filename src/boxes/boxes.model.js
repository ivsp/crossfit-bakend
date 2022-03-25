import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://ivsp:crossfit_web@hellocluster.olzv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(URI);
const DATABASE_NAME = "crossfitweb";
const COLLECTION_NAME = "events";
