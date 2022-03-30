import { MongoClient } from "mongodb";

const { DB_PW } = process.env;

const URI = `mongodb+srv://ivsp:${DB_PW}@hellocluster.olzv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(URI);
const DATABASE_NAME = "crossfitweb";
const COLLECTION_NAME = "events";

export const retrieveEventInfoByName = async (name) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const query = { eventName: name };
    const options = { projection: { _id: 0 } };
    return await events.findOne(query, options);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const createEventByEmailAndBody = async (email, event) => {
  try {
    const newEvent = {
      ...event,
      email,
    };
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    return await events.insertOne(newEvent);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const modifyEventDataByNameAndBody = async (name, body) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: body,
    };
    return await events.updateOne({ eventName: name }, updateDoc);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const retrieveAllEventsByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const query = { email };
    const options = { projection: { _id: 0 } };
    return await events.find(query, options).toArray();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const retrieveAllCurrentsEventsByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const query = { eventEndDate: { $gte: new Date().getTime() }, email };
    const options = { projection: { _id: 0 } };
    return await events.find(query, options).toArray();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const retrieveAllPastsEventsByEmail = async (email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const query = { eventEndDate: { $lte: new Date().getTime() }, email };
    const options = { projection: { _id: 0 } };
    return await events.find(query, options).toArray();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const deletePastsEventsInfoByEmailAndName = async (email, eventName) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const query = { eventName, email };
    const options = { projection: { _id: 0 } };
    return await events.deleteOne(query);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const retrieveAllCurrentsEvents = async () => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const query = { eventEndDate: { $gte: new Date().getTime() } };
    const options = { projection: { _id: 0 } };
    return await events.find(query, options).toArray();
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

export const addUserToaEventByNameAndEmail = async (evName, email) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const events = db.collection(COLLECTION_NAME);
    const newPerson = [email];
    const query = { eventName: evName };
    const options = { projection: { _id: 0 } };
    const event = await events.findOne(query, options);
    const user = event.eventJoinPerson.findIndex((p) => p === email);
    if (user === -1) {
      const newArr = event.eventJoinPerson.concat(newPerson);
      // create a document that sets the plot of the movie
      const body = {
        eventJoinPerson: newArr,
      };
      const updateDoc = {
        $set: body,
      };
      return await events.updateOne({ eventName: evName }, updateDoc);
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
