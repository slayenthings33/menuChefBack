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


//METHOD TO RETRIEVE ONE EXISTING DISH FROM COLLECTION
exports.getDishDetails = async (data) => {
    const client = await connect();
    result = await client
      .db("dishesDB")
      .collection("dishes")
      .findOne({name: data});
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

//METHOD TO ADD ONE SPECIFIC DISH TO COLLECTION
exports.createDish = async (dish) => {
    client = await connect();
    const result = await client
    .db("dishesDB")
    .collection("dishes")
    .insertOne(dish);
    console.log(`New dish created with the following id: ${result.insertedId}`);
}


//METHOD TO DELETE DISH FROM COLLECTION
exports.deleteDishDoc = async(data) => {
    const client = await connect();
    result = await client
      .db("dishesDB")
      .collection("dishes")
      .deleteOne({name: data.name})
    return result;
  }


//METHOD TO UPDATE A DISH IN COLLECTION
exports.updateDishDoc = async(id, editedDish) => {
    const client = await connect();
    console.log(editedDish)
    console.log(editedDish.name)
    result = await client
      .db("movieDB")
      .collection("movies")
      .updateOne(
        {"id": ObjectID(id) }, // Filtered
        { $set: {
            'id': editedDish.id,
            'name': editedDish.name,
            'description': editedDish.description,
            'price': editedDish.price,
            'imagen': editedDish.imagen.src,
            'plato': editedDish.plato,
        }}, //UPDATED
        {upsert: true}
        );
    console.log(`${result.matchedCount} documents which coincide with request.`);
    if (result.upsertedCount > 0) { 
        console.log(`A dish was created with id: ${result.upsertedId._id}`);
        return result;
      } else {
        console.log(`${result.modifiedCount} could not be modified.`);
    }
  }

//METHOD TO RETRIEVE QR CODE
