const fs = require("fs");
const nameFile = require("./helper")

module.exports = function parseEnv(content) {

    let object = {}
    let regex = /^([\w]+)=(.+)/g
    const lines = content.split("\n")


    for (const line of lines) {
        let matchLine = line.match(regex);
        if (matchLine != null) {
            let arraySeparator = matchLine[0].split('=')
            object[arraySeparator[0]] = arraySeparator[1]
        }
    }

   let newFile = nameFile("env.")

    let data = JSON.stringify(object, null, 4)

    fs.writeFile(newFile, data, (err) => {
        if (err) throw err;
    });

    return 'File ' + newFile + ' has been successfully created'
}