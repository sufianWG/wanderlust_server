const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require('express');
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
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
    const bookingCollection = db.collection("bookings");

    app.post("/destination", async (req, res) => {
      const destination = req.body
      console.log(destination);

      const result = await destinationCollection.insertOne(destination);
      res.send(result);
      console.log("This is destination endpoint");
    })

    app.get("/booking/:userId", async (req, res) => {
      const {userId} = req.params

      const result = await bookingCollection.find({userId: userId}).toArray()
      res.send(result)
    })
    app.post("/booking", async (req, res) => {
      const booking = req.body
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
      // console.log("This is destination endpoint");
    })
    app.patch("/destination/:id", async (req, res) => {
      const { id } = req.params
      const updatedDestination = req.body

      const query = {
        _id: new ObjectId(id)
      }

      const result = await destinationCollection.updateOne(
        query,
        { $set: updatedDestination }
      )
      res.send(result)
    })

    app.delete("/destination/:id", async (req, res) => {
      const { id } = req.params
      const query = {
        _id: new ObjectId(id)
      }
      const result = await destinationCollection.deleteOne(query)
      res.send(result)
    })

    app.get("/api/destinations", async (req, res) => {
      const allDestinationData = await destinationCollection.find().toArray();
      console.log(allDestinationData);
      res.send(allDestinationData);
    })

    app.get("/api/destinations/:id", async (req, res) => {
      const { id } = req.params;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await destinationCollection.findOne(query);
      console.log(result);
      res.send(result);
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

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
})