import express from "express";

import { getAllStudent, getStudentById, postNewStudent, editStudent, deleteStudent } from "../Controllers/students.js";

// Initializing the routs

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        console.log(req.query)
        const students = await getAllStudent(req)

        if (students.length == 0) {
            return res.status(400).
                json({ message: "No data available" })
        }
        res.status(200).json({ data: students })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
});

router.get("/all/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await getStudentById(id);
        if (!student) {
            return res.status(400).json({ message: "No data available" })
        }
        return res.status(200).json({ data: student })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
})

// adding new student

router.post("/add", async (req, res) => {
    try {
        const newStudent = req.body
        console.log(newStudent);
        if (!newStudent) {
            return res.status(400).json({ message: "No data provided" })
        }
        const result = await postNewStudent(newStudent);
        if (!result) {
            return res.status(400).json({ message: "Error posting data" })
        }
        return res.status(201).json({ message: result })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
})



// Put request

router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updateStudent = req.body
        console.log(updateStudent);
        if (!id || !updateStudent) {
            return res.status(400).json({ message: "Error in given id or request" })
        }
        const result = await editStudent(id, updateStudent)
        console.log(result)
        if (!result.lastErrorObject.updatedExisting) {
            return res.status(400).json({ message: "Error in editing data" })
        }
        return res.status(200).json({ data: updateStudent, status: result })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
})

// Delete request

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Error in given id or wrong request" })
        }
        const result = await deleteStudent(id)
        console.log(result);
        if (result.deletedCount <= 0) {
            return res.status(400).json({ message: "Error in deleting data" })
        }
        return res.status(200).json({ data: result })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
})


export const studentRouter = router;