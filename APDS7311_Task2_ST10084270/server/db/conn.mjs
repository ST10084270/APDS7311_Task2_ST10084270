import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//const Db = process.env.ATLAS_URI;
//const connectionString = process.env.ATLAS_URI || "";

const variable = process.env.Mongo_Conn
console.log(variable);

//CiqiozAHxW4dKSiw
const client = new MongoClient(variable);

let conn;
try {
  conn = await client.connect();
  console.log('mongoDB is CONNECTED!!! :)');
} catch(e) {
  console.error(e);
}

let db = client.db("users");

export default db;