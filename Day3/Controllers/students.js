import { ObjectId } from "bson";
import { client } from "../db.js";


export function getAllStudent(req) {
    return client
        .db("b42")
        .collection("students")
        .find(req.query)
        .toArray();
}

export function getStudentById(id) {
    return client
        .db("b42")
        .collection("students")
        .findOne({ _id: new ObjectId(id) })
}

export function postNewStudent(data) {
    return client
        .db("b42")
        .collection("students")
        .insertOne(data)
}

export function editStudent(id, data) {
    return client
        .db("b42")
        .collection("students")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data })
}

export function deleteStudent(id) {
    return client
        .db("b42")
        .collection("students")
        .deleteOne({ _id: new ObjectId(id) })
}

