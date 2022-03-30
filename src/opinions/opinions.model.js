import { MongoClient } from "mongodb";

const { DB_PW } = process.env;

const URI = `mongodb+srv://ivsp:${DB_PW}@hellocluster.olzv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(URI);
const DATABASE_NAME = "crossfitweb";
const COLLECTION_NAME = "testimonies";

export const createNewTestimonie = async (email, testimonie) => {
  try {
    const document = {
      userName: email,
      testimonie,
    };
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const opinions = db.collection(COLLECTION_NAME);
    return await opinions.insertOne(document);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const retrieveTestimonieByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const opinions = db.collection(COLLECTION_NAME);
    const query = { userName: email };
    const options = { projection: { _id: 0 } };
    return await opinions.findOne(query, options);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
