const express = require("express")
const fs = require("fs")
const path = require("path")
const dirPath = path.join(__dirname, "timestamps");
const app = express()
app.use(express.json())

console.log('path', dirPath);

app.get("/timestamp", (req, res) => {
    const date = new Date();
    const timeStampDate = `Last updated: ${date.toUTCString().slice(0, -3)}`
    fs.writeFileSync(`${dirPath}/current-date-time.txt`, timeStampDate, (err) => {
        if (err) {
            res.send({ Message: "error in time stamp" })
        }
    })
    res.sendFile(path.join(dirPath, "current-date-time.txt"))
    // res.send({ message: "working properly" })
})


// oru sample operations

let carData = [
    {
        name: "slavia",
        country: "german",
        company: "vokswagon",
        fuel: 'petrol',
        type: "manual"
    },
    {
        name: "virtus",
        country: "german",
        company: "vokswagon",
        fuel: 'petrol',
        type: "DSC"
    },
    {
        name: "verna",
        country: "korea",
        company: "Hyndai",
        fuel: 'diesel',
        type: "manual"
    },
    {
        name: "city",
        country: "Japan",
        company: "honda",
        fuel: 'petrol',
        type: "DCT"
    }

]

//Car data api end point server

app.get('/car/all', (req, res) => {

    const { type, fuel } = req.query
    console.log(type, fuel);
    let returnData = carData;
    if (req.query) {
        if (type) {
            returnData = returnData.filter((val) => val.type === type)
        }
        if (fuel) {
            returnData = returnData.filter(val => val.fuel === fuel)
        }
    }
    res.json({ data: returnData });
})



// get data using params

app.get('/car/:name', (req, res) => {
    const { name } = req.params;
    console.log(req.params);
    selectedData = carData.find(data => data.name === name)
    res.status(200).json({ selectedData })
})

app.get('/car/all/spec', (req, res) => {
    //const selectedData = carData;
    // console.log(selectedData);
    const seletedInfo = carData.map((val) => ({ n: val.name, c: val.company }))
    res.status(200).json({ data: seletedInfo })
})

// add car

app.post("/car/add", (req, res) => {
    // const addCar = {
    //     name: "Audi",
    //     country: "India",
    //     company: "Audi compay",
    //     fuel: 'petrol',
    //     type: "Auto"
    // }

    const newCar = req.body;

    //console.log(req.body)

    carData.push(newCar);
    res.status(201).json({ data: carData })
})

// edit data (car)

app.put("/car/edit/:name", (req, res) => {

    const { name } = req.params;
    const selectedCar = carData.find((val) => val.name === name)
    selectedCar.type = req.body.type
    res.status(200).send(selectedCar)
})

// Delete 

app.delete("/car/remove/:name", (req, res) => {
    const { name } = req.params;
    let newCarList = carData.filter(val => val.name !== name)
    carData = newCarList
    res.status(200).send({ message: `${name} is deleted successfully` })
})


// app.get("/sample", (req, res) => {
//     res.send({ message: "working properly" })
// })

// app.get("/timestamp", (req, res) => {
//     const date = new Date();
//     const timeStampDate = date.toUTCString().slice(0, -3)
//     fs.writeFileSync('./current date-time.txt', timeStampDate, (err) => {
//         if (err)
//             res.send({ message: "Error in writing timestamp" })
//     })
//     res.send({ timeStamp: timeStampDate })
// })

// http://localhost:9000




// listen and start a http server in local host
app.listen(9000, () => console.log(`Server started in localhost:9000`))




// //"type": "module",