const express =require('express');
const cors = require('cors');
const app =express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT || 5000;
// midleware
app.use(cors());
app.use(express.json())
//9oUjsZg1PC29YtxA
//coffeeMaste
// mongo db connnection code start


const uri = "mongodb+srv://coffeeMaste:9oUjsZg1PC29YtxA@cluster0.khyx0yo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const coffeeCollection = client.db('coffeeDB').collection('coffee');
  //post the data from the client sites
  app.post('/coffee',async(req,res)=>{
    const newCoffee = req.body;
    console.log(newCoffee)
    const result = await coffeeCollection.insertOne(newCoffee)
    res.send(result)
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
     res.send('coffee store server is runnig')
})
app.listen(port,()=>{
    console.log(`server is runnig on ${port}`)
})