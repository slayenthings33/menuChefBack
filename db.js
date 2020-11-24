const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/dishes   DB';
const ObjectID = require('mongodb').ObjectID;

//Connect to DB
const connect = async() => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true}).catch(err => {console.log(err);
    })
    console.log("connected to db");
    return client;
  }

// CREATE COLLECTION 

//Method to create dish documents in DB from FormSection
exports.createDish = async (dish) => {
    client = await connect();
    const result = await client
    .db("dishesDB")
    .collection("dishes")
    .insertOne(dish);
    console.log(`New dish created with the following id: ${result.insertedId}`);
}

//Method to retrieve existing dish data from DB
exports.getAllDishes = async () => {
    const client = await connect();
    result = await client
       .db("dishesDB")
       .collection("dishes")
       .find()
       .toArray();
    if (result) {
      return result;
    } else {
       return null
    }
};