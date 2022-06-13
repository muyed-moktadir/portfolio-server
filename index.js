const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

//TODO: add middleware
app.use(cors());
app.use(express.json());


// TODO:mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.rkyae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// TODO:CRUD Operation:
async function run() {
    try {
      await client.connect();
      const portfolio = client.db("my-portfolio").collection("projects");
  
      
      // TODO:get projects
      app.get("/project", async (req, res) => {
        const query = {};
        const cursor = portfolio.find(query);
        const projects = await cursor.toArray();
        res.send(projects);
        console.log(projects);
      });
  
  
      // TODO: get a project:
      app.get("/project/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await portfolio.findOne(query);
        res.send(result);
      });


    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  app.get("/", (req, res) => {
    res.send("running My portfolio");
  });
  
  app.listen(port, () => {
    console.log("My portfolio-server-side is running :", port);
  });
  