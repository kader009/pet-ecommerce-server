import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
const port = process.env.PORT || 5000
const app = express();
dotenv.config()

// middleware
app.use(express())
app.use(cors())

app.get('/', (req, res) =>{
  res.send('pet ecommerce site is active')
})

app.listen(port,() =>{
  console.log(`pet ecommerce is on ${port}`);
})