const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/dishesDB';
const ObjectID = require('mongodb').ObjectID;

//CONNECT TO DB
const connect = async() => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true}).catch(err => {console.log(err);
    })
    console.log("connected to db");
    return client;
  }


//METHOD TO ADD ONE DISH TO COLLECTION
exports.createDish = async (dish) => {
  client = await connect();
  const result = await client
  .db("dishesDB")
  .collection("dishes")
  .insertOne(dish);
  console.log(`New dish created with the following id: ${result.insertedId}`);
}


//METHOD TO RETRIEVE ONE EXISTING DISH FROM COLLECTION
exports.getDishDetails = async (data) => {
    const client = await connect();
    result = await client
      .db("dishesDB")
      .collection("dishes")
      .findOne({_id: ObjectID(data)});
    if(result) {
      console.log(`The dish - ${data} - has been found in the collection.`)
      return result;
    } else {
      return null
    }
  }


//METHOD TO RETRIEVE ALL EXISTING DISH DATA FROM COLLECTION
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


//METHOD TO DELETE DISH FROM COLLECTION
exports.postDeleteDish = async(data) => {
    const client = await connect();
    result = await client
      .db("dishesDB")
      .collection("dishes")
      // .deleteOne({name: data.name})
      .deleteOne({_id: ObjectID(data._id)})
    console.log(result);
    return result;
}


//METHOD TO UPDATE A DISH IN COLLECTION
exports.updateDish = async(id, editedDish) => {
    const client = await connect();
    console.log(editedDish)
    console.log(editedDish._id)
    result = await client
      .db("dishesDB")
      .collection("dishes")
      .updateOne(
        {_id: ObjectID(id)}, //Filter
        { $set: {             //Update
            'name': editedDish.name,
            'description': editedDish.description,
            'price': editedDish.price,
            'imagen': editedDish.imagen,
            'plato': editedDish.plato,
        }}, //UPDATED
        {upsert: false}
        );
    console.log(`${result.matchedCount} documents which coincide with request.`);
    if (result.upsertedCount > 0) { 
        console.log(`A dish was updated with id: ${result.upsertedId._id}`);
        return result;
      } else {
        console.log(`${result.modifiedCount} could not be modified.`);
    }
  }

//METHOD TO RETRIEVE QR CODE
