
const MongoClient = require('mongodb').MongoClient;

module.exports = {
  find: async (query) => {
    let db, client;
    const url = 'mongodb+srv://kelvin:sotco2000@cluster0.adtt0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
      db = client.db('b_4');
      return await db.collection('b_vehicles').find(query).toArray();
    } finally {
      client.close();
    }
  },
  findOne: async (query) => {
    let db, client;
    const url = 'mongodb+srv://kelvin:sotco2000@cluster0.adtt0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
      db = client.db('b_4');
      return await db.collection('b_vehicles').findOne(query);
    } finally {
      client.close();
    }
  },
}