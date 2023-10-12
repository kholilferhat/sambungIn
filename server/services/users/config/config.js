
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kholilferhat:Inmemoriam1@individual-project.cfkptk4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
let db;

async function mongoConnect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        const database = await client.db('users');
        db = database
        // Send a ping to confirm a successful connection
        console.log("#connected");
    } catch (error) {
        console.log(error);
        await client.close()
    }
}

function getDB(){
    return db
}

module.exports = {mongoConnect, getDB}