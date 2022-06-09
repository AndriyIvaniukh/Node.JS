const {hello} = require('./FirstFunction');
const {writeTOFile} = require('./services/fs.service');


console.log(hello());
writeTOFile();