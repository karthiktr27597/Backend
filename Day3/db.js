import { MongoClient } from "mongodb";
import dotevn from "dotenv"
import Obj from "mongodb";

dotevn.config();

const mongoConnectString = process.env.MONGO_URL;

export async function dbConnection() {
    const client = new MongoClient(mongoConnectString);
    await client.connect();
    console.log("Mongo DB Connected successfully")
    return client
}

// export var ObjectId = Obj.ObjectId
export const client = await dbConnection()