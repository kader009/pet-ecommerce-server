import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

// middleware
app.use(express());
app.use(
  cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  })
);

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db('PetHouse');
    const petCollection = database.collection('petList');
    const orderCollection = database.collection('order');
    const userCollection = database.collection('user');

    // get all data route
    app.get('/petlist', async (req, res) => {
      const result = await petCollection.find().toArray();
      res.send(result);
    });

    // get single id route
    app.get('/petlist/:id', async (req, res) => {
      const id = req.params.id;
      const result = await petCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // update route for single pet
    app.patch('/petlist/:id', async (req, res) => {
      const id = req.params.id;
      const update = req.body;

      const result = await petCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        { $set: update }
      );
      res.send(result);
    });

    // post order
    app.post('/order', async (req, res) => {
      const order = req.body;
      console.log('order:', order);
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('pet ecommerce site is active');
});

app.listen(port, () => {
  console.log(`pet ecommerce is on ${port}`);
});
