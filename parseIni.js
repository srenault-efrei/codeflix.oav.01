const fs = require("fs");
const createNewFile = require("./helper")

module.exports = function parseIni(content) {

    const lines = content.split("\n")
    const regexContent = /^([\w]+[\s]*|[\w]+\.[\w]+[\s]*|[\s]+[\w]+\.[\w]+|[\w]+\.[\w]+\.+[\w]+[\s]+)=([\s]*".+|[\s]+\/.+|[\s]+-[0-9]|[\s]+[\w]+|([\s]$)+|[\w]+\.[\w]+|(?!.)|[\s]*\/)|^(\[.+\])/g

    let tabObject = []
    let key = ""
    let value = ""
    let finalArray = {}
    let category = ''


    for (const line of lines) {

        let matchLine = line.match(regexContent)
        if (matchLine != null) {
            if (matchLine[0].includes('[')) {
                category = matchLine[0].replace(/(^\[|\]$)/g, "")
                tabObject = []
            } else {
                let exceptionObject = "url_rewriter.tags = \"a=href,area=href,frame=src,input=src,form=,fieldset=\""
                if (matchLine[0] == exceptionObject) {
                    key = exceptionObject.slice(0, 17)
                    value = exceptionObject.slice(20)
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
            finalArray[category] = tabObject
        }
    }
    let newFile = createNewFile("php.")
    let data = JSON.stringify(finalArray, null, 2)
    

    fs.writeFile(newFile, data, (err) => {
        if (err) throw err;
    });

    return 'File ' + newFile + ' has been successfully created'
}