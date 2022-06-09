const fs = require('fs');

function writeTOFile() {
    fs.appendFile("./testFile", 'My first writing to file', err => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    writeTOFile
}