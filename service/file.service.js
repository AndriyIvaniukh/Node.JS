const fs = require('fs/promises');
const path = require("path");


module.exports = {
    reader: async ()=>{
        const  data = await fs.readFile(path.join(process.cwd(), 'dataBase', 'users.json'));
        return data.toString() ? JSON.parse(data.toString()) : [];
    },
    writer: async (data)=>{
        await fs.writeFile(path.join(process.cwd(), 'dataBase', 'users.json'), JSON.stringify(data));
    }
}