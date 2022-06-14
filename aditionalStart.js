const fs = require('fs');

function moveAllFilesToRootDir (dirLocation, dirName) {
    fs.readdir(dirLocation, (err, stats) => {
        if (err){
            console.log(err);
            return;
        }
        for (let stat of stats) {
            if (checkIsFile(`${dirLocation}/${stat}`)){
                fs.rename(`${dirLocation}/${stat}`, `${__dirname}/${dirName}/${stat}`, err1 => {
                    if (err1){
                        console.log(err1);
                        return;
                    }
                })
            }
            if (checkIsDirectory(`${dirLocation}/${stat}`)){
                moveAllFilesToRootDir(`${dirLocation}/${stat}`, dirName);
            }
        }
    });
}
function checkIsFile (way){
    const stats = fs.statSync(way);
    return stats.isFile()
}

function checkIsDirectory (way){
    const stats = fs.statSync(way);
    return stats.isDirectory()
}

module.exports = {
    moveAllFilesToRootDir
}