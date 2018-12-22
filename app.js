const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const genDB = require('./db');
const Owner = require('./models/owner');
const Lab = require('./models/labs');

var db = new genDB().getInstance();

async function startApp() {
    await db.initDB();

    // var owner = new Owner();
    // await owner.create('avi','avi@dualia.co.il','12345').then((res) => {
    //     console.log('create user: '+ res);
    // }).catch((err) => {
    //     console.log('create user err: '+ err);
    // })
    var lab = new Lab();
    await lab.create('pronto','shira','shira@pronto.com','11111').then((res) => {
        console.log('create lab user: ');
    }).catch((err) => {
        console.log('create user err: '+ err);
    })
    await lab.create('lab2','labu2','labu2@lab2.com','11111').then((res) => {
        console.log('create lab user: ');
    }).catch((err) => {
        console.log('create user err: '+ err);
    })
    await lab.addOwner2Lab(1,1).then((res) => {
        console.log('Paired');
    }).catch(err=>console.log(err))
    // await owner.getById(1);
    // await db.closeDB();
}

startApp();
const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/labs', require('./routes/labs'));

const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
