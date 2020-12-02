const fetch = require('node-fetch');
const db = require('./db')

// ---------> GET MODULES

//RENDER HOMEPAGE WITH DISH DATA
exports.getHome = (req,res) => {
    db
    .getAllDishes()
    .then((data)=>{
        res
        .status(200)
        .render('home', {
            dishes: data
        })
    }).catch((e)=>console.log("An error has occurred in getHome:" +e));
}

//RENDERS CREATE ACCOUNT PAGE
exports.getCreateAccount = (req,res) => {
  res
  .status(200)
  .render('createAccount', {})
}

//RENDERS LOGIN PAGE
exports.getLogin = (req,res) => {
    res
    .status(200)
    .render('login', {})
}

//RENDERS QR CODE PAGE
exports.getQRcode = (req,res) => {
    res
    .status(200)
    .render('qrcode', {
        image: dishes.id.qrcode,
    })
}

//RENDERS MENU PREVIEW PAGE
exports.getMenu = (req,res) => {
    db
    .getAllDishes()
    .then((data)=>{
        res
        .status(200)
        .render('menu', {
        _id: data._id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        plato: data.plato,
        })
    }).catch((e)=>console.log("An error has occurred in getMenu:" +e));
}
    
//LOADS DESIRED DISH TO EDIT IN FORM
exports.getDish = (req,res) => {
    db
    .getDishDetails(req.params.id)
    .then((data)=> {
        console.log("getDish module")
        console.log(data)
        res.render("home", {
            route: "/dish/editDish",
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            plato: data.plato,
        })
    }).catch((e)=>console.log(`And error occurred ${e}`))
}


// ---------> POST MODULES

// POST METHOD TO UPLOAD DISH TO DB FROM FORM 
exports.saveDish = (req,res) => {
    console.log(req);
    console.log(req.body);
    let dish= req.body;
    console.log("Saving dish")
    db
    .createDish(dish)
    .then(()=>{
        res
        .status(200)
    })
    .catch((e)=> {
        console.log("An error has occurred " + e)
    })
}

//POST METHOD TO CREATE AN ACCOUNT
exports.postCreateAccount = (req,res) => {
    console.log(req);
    console.log(req.body);
    let user= req.body;
    console.log("Saving dish")
    db
    .createUser(user)
    .then(()=>{
        res
        .status(200)
        .redirect("/login")
    })
    .catch((e)=> {
        console.log("An error has occurred " + e)
    })
}

//POST METHOD TO UPDATE DISH
exports.editDish = (req,res) => {
    console.log('dish.editDish')
    let _id = req.body._id;
    console.log(req.body);
    console.log(_id);
    console.log('++++++++++++++++++++++++++');
    db
    .updateDish(_id, req.body)
    .then(()=> {
        res
        .status(200)
    }).catch((e)=> console.log("An unexpected error has occurred:"+e))
}

//POST METHOD TO DELETE DISH
exports.postDeleteDish = (req,res) => {
    console.log(req.body);
    db
    .postDeleteDish(req.body)
    .then(() => {
        res
        .status(200)
    }).catch((e)=> console.log("An error has occurred "+e))
}