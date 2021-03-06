const express = require("express")
const app = express()
const port = 3000;
const dish = require("./dish")
const bodyParser = require('body-parser');



//***********SETTINGS************//
app.set('port', process.env.PORT || 3000);


//***********MIDDLEWARE************//

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/", express.static('public'));
// app.use(express.json()); <-- necessary?


//***********ROUTES************//

//route for login page
//route for create account page

// ----------> GET ROUTES
//HOME PAGE
app.get('/', dish.getHome);

//CREATE ACCOUNT
// app.get('/createAccount', dish.getCreateAccount);

//LOGIN PAGE
// app.get('/login', dish.getLogin);

//QR CODE PAGE
// app.get('/qrcode', dish.getQRcode);

//VIEW MENU PAGE
app.get('/menu', dish.getMenu);

//EDIT DISH
app.get('/getDish/:id', dish.getDish)


// ----------> POST ROUTES

//SAVE DISH TO DB
app.post('/dish/save', dish.saveDish);

//CREATE USER ACCOUNT AND SAVE TO DB
app.post('/postCreateAccount/save', dish.postCreateAccount);

//CREATE QR CODE
// app.post('/user/qrCode', dish.showQRcode)

//EDIT DISH
app.post('/dish/editDish', dish.editDish);

//DELETE DISH
app.post('/dish/deleteDish', dish.postDeleteDish);


app.listen(port, () => {
    console.log(`You are connected to: ${port}`)
})