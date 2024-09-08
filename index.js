import { MongoClient, ServerApiVersion } from 'mongodb';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

// middleware
app.use(express());
app.use(cors());

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
