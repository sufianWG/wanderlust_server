const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express');
const dotenv = require("dotenv");
const {MongoClient} = require("mongodb");
const cors = require("cors");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5260;

const client = new MongoClient(process.env.MONGODB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations");

    app.post("/destination", async(req, res) => {
        const destination = req.body
        console.log(destination);

        const result = await destinationCollection.insertOne(destination);
        res.send(result);
        console.log("This is destination endpoint");
    })

    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB()

app.get('/', (req, res) => {
    console.log("Server runnig fine");
    res.send("Server running Fine at homepage");
})

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
})