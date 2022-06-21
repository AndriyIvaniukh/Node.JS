const fs = require('fs/promises');
const path = require("path");

const wayToFile = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    reader: async ()=>{
        console.log('__________')
        console.log(wayToFile);
        const  data = await fs.readFile(wayToFile);
        return data.toString() ? JSON.parse(data.toString()).sort((a,b)=> a.id - b.id) : [];
    },
    writer: async (data)=>{
        await fs.writeFile(wayToFile, JSON.stringify(data));
    }
}