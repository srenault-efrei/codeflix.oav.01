const fs = require("fs");
const newFileName = require("./helper")

module.exports = function parseIni(content) {

    const lines = content.split("\n")
    const regex = /^([\s]*[\w]+\.*[\w]*\.*[\w]*[\s]*)=([\s]*".+|[\s]+\/.+|[\s]+-[0-9]|[\s]+[\w]+|[\w]+\.[\w]+|(?!.)|[\s]*\/)|^(\[.+\])/g
    const regexException = /^([\w]+\.[\w]+[\s])=[\s]"[\w]=.+/g

    let tabObject = []
    let key = ""
    let value = ""
    let finalObject = {}
    let category = ''


    for (const line of lines) {

        let matchLine = line.match(regex)
        if (matchLine != null) {
            if (matchLine[0].includes('[')) {
                category = matchLine[0].replace(/(^\[|\]$)/g, "")
                tabObject = []
            } else {
                //url_rewriter.tags = "a=href,area=href,frame=src,input=src,form=,fieldset="
                if (matchLine[0].match(regexException)) {
                    key = matchLine[0].slice(0, matchLine[0].indexOf("=")).trim();
                    value = matchLine[0].slice(matchLine[0].indexOf("\""), matchLine[0].length)
                }
                else {
                    let arraySeparator = matchLine[0].split('=')
                    key = arraySeparator[0].trim()
                    value = arraySeparator[1].trim()
                }
                let objectCategory = {}
                objectCategory[key] = value
                tabObject.push(objectCategory)
            }
            finalObject[category] = tabObject
        }
    }
    let newFile = newFileName("php.")
    let data = JSON.stringify(finalObject, null, 2)

    fs.writeFile(newFile, data, (err) => {
        if (err) throw err;
    });

    return 'File `' + newFile + '` has been successfully created'
}