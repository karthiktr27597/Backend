const fs = require("fs");
const os = require('os');

console.log(process.argv);

// get value from command line

const [, , name2, name3] = process.argv;
console.log('command line value is', name2, name3);

fs.readFile("./readfile.text", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

const content = "this is new file"

// write file

fs.writeFile("./newfile.txt", content, (err) => {

    if (err)
        console.log(err);
    else
        console.log("file writted done");
});

// append file

const content2 = "\nI'm writing new file 2"

fs.appendFile("./newfile.txt", content2, (err) => {

    if (err) {
        console.log(err);
    } else {
        console.log("file updated done");
    }

});

// fs.unlink("./newfile.txt", (err) => {

//     if (err) {
//         console.log(err);
//     } else {
//         console.log("file deleted successfully");
//     }

// });

// file using directory

console.log('Current working directory name', __dirname);
console.log('Current working file name', __filename);


// OS information

console.log('free memory', os.freemem());
console.log('version', os.version());
console.log('Total memory', os.totalmem());
//console.log("Cpu----", os.cpus());

let time = Date.now();
const date = new Date();
console.log('time---', time);
console.log('date---', date);

console.log('Date-----', date.getDate());
console.log('Yearonly-----', date.getYear());
console.log('Year-----', date.getFullYear());
console.log('UTC-----', date.toUTCString().slice(0, 17));

