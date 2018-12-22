const genDB = require('./db');
const Owner = require('./owner');
const Lab = require('./labs');

var db = new genDB().getInstance();

async function startApp() {
    await db.initDB();

    var owner = new Owner();
    await owner.create('avi','avi@dualia.co.il','12345').then((res) => {
        console.log('create user: '+ res);
    }).catch((err) => {
        console.log('create user err: '+ err);
    })
    var lab = new Lab();
    await lab.create('pronto','shira','shira@pronto.com','11111').then((res) => {
        console.log('create user: '+ JSON.stringify(res));
    }).catch((err) => {
        console.log('create user err: '+ err);
    })
    await owner.getById(1);
    await db.closeDB();
}

startApp();
console.log('App - done');
