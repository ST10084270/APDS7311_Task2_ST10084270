import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CheckAuth from "../check-auth.mjs";

const router = express.Router();


//this section will help retrieve a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//this section will help retrieve a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);});


//this section will help update a record by id.
router.patch("/:id", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
      }
    };

    let collection = db.collection("records");
    let result = collection.updateOne(query, updates);

    res.send(result).status(200);
  });
checkAuth.checkToken();

});


//this section will help delete a record
router.delete("/:id", (req, res) => {
  const checkAuth = new CheckAuth(req, res, () => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = collection.deleteOne(query);

    res.send(result).status(200);
  });

  checkAuth.checkToken();
});
  

//this section will help create a new record.
router.post("/", async (req, res) => {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });


  router.post('/create', (req, res) => {
    const checkAuth = new CheckAuth(req, res, () => {
     let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
     };
     let collection = db.collection("records");
     let result = collection.insertOne(newDocument);
     res.send(result).status(204);
    });
   
    checkAuth.checkToken();
   });

  export default router;