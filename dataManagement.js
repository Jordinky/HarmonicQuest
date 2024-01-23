const { MongoClient } = require("mongodb");
const info = require('./info');

const url = info.url; //

const dbName = info.dbName;
const colName = info.colName;//collection name

const client = new MongoClient(url);


function insertUser(user){
    async function run (){
        try{
            //connect to de database
            await client.connect();
            const db = client.db(dbName);
            //reference the "users" collection in the especified database
            const col = db.collection(colName)
            //create a new document
            let personDocument = user;
            //insert the document into the speficied collection
            const p = await col.insertOne(personDocument);
            //find and return the document
            /*const filter = {"name.last": "Turing"}; // select * from  users where name.last = "turing"
            const document = await col.findOne(filter);
            console.log("document found: " + JSON.stringify(document));*/
            return p;
        }catch(err){
            console.log(err.stack);
        }finally{
            await client.close()
        }

    }run().catch(console.dir);
}
module.exports = { insertUser }

function isRegistered(user){
    async function run (){
        try{
        //connect to de database
            await client.connect();
            const db = client.db(dbName);
            //reference the "users" collection in the especified database
            const col = db.collection(colName);

            //find and return the document if exists
            const filter = {"username":user.username}; //select * from users where username = user
            const document = await col.findOne(filter);
            console.log("document found" + JSON.stringify(document));
            return document;
        
        }catch{
            console.log(err.stack);
        }finally{
            await client.close();
        }
    }run().catch(console.dir);
}
module.exports = { isRegistered }