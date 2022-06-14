const fs = require('fs');

const folderNames = ['boys', 'girls'];

for (let folderName of folderNames) {
    moveFile(folderName);
}

function moveFile (folderName){
    fs.readdir(`./${folderName}`, ((err, stats) => {
        if (err){
            console.log(err);
            return ;
        }
        for (let stat of stats) {
            changeFolder(stat, folderName);
        }
    }))
}

function changeFolder(filename, folderName){
    fs.readFile(`${__dirname}/${folderName}/${filename}`, 'utf-8', (err, data) => {
        if (err){
            console.log(err);
            return ;
        }
        const personObj = JSON.parse(data)
        if (folderName === 'boys' && personObj.sex === 'female'){
            fs.rename(`${__dirname}/${folderName}/${filename}`, `${__dirname}/girls/${filename}`, (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
        if (folderName === 'girls' && personObj.sex === 'male'){
            fs.rename(`${__dirname}/${folderName}/${filename}`, `${__dirname}/boys/${filename}`, (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }

    })
}