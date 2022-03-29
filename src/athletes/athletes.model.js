import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://ivsp:crossfit_web@hellocluster.olzv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(URI);
const DATABASE_NAME = "crossfitweb";
const COLLECTION_NAME = "athletes";

export const retrieveAtheleteByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const atheletes = db.collection(COLLECTION_NAME);
    const query = { athelete: email };
    const options = { projection: { _id: 0 } };
    return await atheletes.findOne(query, options);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const createNewAthleteByEmailAndBody = async (email, body) => {
  try {
    const newAthelete = {
      athelete: email,
      events: [body],
    };
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const atheletes = db.collection(COLLECTION_NAME);
    return await atheletes.insertOne(newAthelete);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const modifyAthleteByEmailAndBody = async (email, body) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const atheletes = db.collection(COLLECTION_NAME);
    const newEvent = body;
    const query = { athelete: email };
    const options = { projection: { _id: 0 } };
    const athelete = await atheletes.findOne(query, options);
    const events = athelete.events.findIndex(
      (e) => e.eventName === newEvent.eventName
    );
    if (events === -1) {
      //quiere decir que el atleta no se ha apuntado al evento y lo incluyo
      const newArr = athelete.events.concat(newEvent);
      // create a document that sets the plot of the movie
      const evObj = {
        events: newArr,
      };
      const updateDoc = {
        $set: evObj,
      };
      return await atheletes.updateOne({ athelete: email }, updateDoc);
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
export const retrievellAthleteEventsByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const atheletes = db.collection(COLLECTION_NAME);
    const query = { athelete: email };
    const options = { projection: { _id: 0 } };
    return await atheletes.findOne(query, options);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
