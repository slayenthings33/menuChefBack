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
    }).catch((e)=>console.log("An error has occurred:" +e));
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
            id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image.src,
        plato: data.plato,
        })
    }).catch((e)=>console.log("An error has occurred:" +e));
}
    
//LOADS DESIRED DISH TO EDIT IN FORM
exports.getEditDish = (req,res) => {
    db
    .getDishDetails(req.params.id)
    .then((data)=> {
        console.log("getEditDish module")
        console.log(data)
        res.render("home", {
            route: "/dish/postEditDish",
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image.src,
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
        .redirect("/")
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

//POST METHOD TO EDIT DISH
exports.postEditDish = (req,res) => {
    console.log(req.body)
    let name = req.body.id;
    console.log(id);
    db
    .updateDishDoc(id, req.body)
    .then(()=> {
        res
        .status(200)
        .redirect("/");
    }).catch((e)=> console.log("An unexpected error has occurred:"+e))
}

//POST METHOD TO DELETE DISH
exports.postDeleteDish = (req,res) => {
    db
    .deleteDishDoc(req.body)
    .then(() => {
        res
        .status(200)
        .redirect("/")
    }).catch((e)=> console.log("An error has occurred "+e))
}