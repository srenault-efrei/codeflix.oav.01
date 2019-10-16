const fs = require("fs");
const nameFile = require("./helper")

module.exports = function parseYml(content) {
    let finalObject = {}

    let value = ''
    let key = ''
    let tabObject = []
    let global

    const lines = content.split("\n")
    const regex = /^([\s]*[\w]+):([\s]'*[\w]*\\*[\w]*'*|^[\s]+|(?!.))/g
    const regexOption = /^([\s]+[\w]+)/g

    for (const line of lines) {
        let matchLine = line.match(regex)
        if (matchLine != null) {
            matchLine = matchLine[0].trim();
            matchline = matchLine.split(':')
            key = matchline[0]
            value = matchline[1].trim()

            //  console.log(value)

            if (value === '') {
                tabObject = []
                global = key
            }
           
            else {
                let object = {}
                object[key] = value
                tabObject.push(object)     
            }
            finalObject[global] = tabObject
        }
    }

    let newFile = nameFile("yml.")
    let data = JSON.stringify(finalObject, null, 4)


    fs.writeFile(newFile, data, (err) => {
        if (err) throw err;
    });

    return 'File `' + newFile + '` has been successfully created'



}