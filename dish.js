const e = require('express');
const fetch = require('node-fetch');
const db = require('./db')

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
    res
    .status(200)
    .render('menu', {
        
    })
  }







// MODULE TO UPLOAD DISH TO DB FROM FORM 
exports.saveDish = (req,res) => {
    let dish= req.body;
    console.log("Saving dish")
    db.createDish(dish)
    .then(()=>{
        res
        .status(200)
        .redirect("/")
    })
    .catch((e)=> {
        console.log("An error has occurred "+e)
    })
}


exports.getCreateAccount = (req,res) => {
    
}